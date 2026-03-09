import fs from "fs";
import path from "path";
import 'dotenv/config';

// Generators
import { generate_sitemap } from "./generators/site_architect";
import { generate_theme } from "./generators/theme_designer";
import { generate_navigation } from "./generators/nav_designer";
import { generate_single_page } from "./generators/page_generator";
import { generate_node } from "./generators/node_generator";
import { callLLM } from "./llmClient"; // Added for UIUX design

// Operations
import { run_integrity_check } from "./operations/integrity_check";
import { run_visual_check } from "./operations/visual_check";

// Types
import { WebsiteConfig } from "../lib/schema";

/**
 * PROPSITE ENGINE: ORCHESTRATOR
 */
export class PropSiteEngine {
  private config: WebsiteConfig;
  private jsonPath = path.join(process.cwd(), "config/site.json");
  private tsPath = path.join(process.cwd(), "config/site.ts");
  private structurePath = path.join(process.cwd(), "config/site_structure.ts");
  private failures: { path: string; error: string; timestamp: string }[] = [];

  constructor() {
    this.config = this.loadConfigFromDisk();
  }

  private loadConfigFromDisk(): WebsiteConfig {
    if (fs.existsSync(this.jsonPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.jsonPath, "utf-8"));
      } catch (e) {
        console.warn("⚠️ site.json invalid.");
      }
    }
    if (fs.existsSync(this.tsPath)) {
      try {
        const content = fs.readFileSync(this.tsPath, "utf-8");
        const jsonMatch = content.match(/siteConfig: WebsiteConfig = ([\s\S]*?);/);
        if (jsonMatch) return eval(`(${jsonMatch[1]})`);
      } catch (e) {}
    }
    return { theme: {} as any, header: {} as any, footer: {} as any, pages: {} };
  }

  private recordFailure(pagePath: string, error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`\n❌ [FAILURE] Page: ${pagePath} | Error: ${errorMsg}`);
    this.failures.push({ path: pagePath, error: errorMsg, timestamp: new Date().toISOString() });
  }

  private persist(businessName: string = "default") {
    const jsonContent = JSON.stringify(this.config, null, 2);
    fs.writeFileSync(this.jsonPath, jsonContent);
    fs.writeFileSync(this.tsPath, `import { WebsiteConfig } from "@/lib/schema";\n\nexport const siteConfig: WebsiteConfig = ${jsonContent};`);

    const pagesStructure: Record<string, string[]> = {};
    for (const [path, page] of Object.entries(this.config.pages)) {
      pagesStructure[path] = page.sectionOrder;
    }
    const structure = {
      pages: pagesStructure,
      navigation: {
        header: (this.config.header?.links || []).map((l: any) => l.href),
        footer: (this.config.footer?.columns || []).flatMap((c: any) => c.links?.map((l: any) => l.href))
      }
    };
    fs.writeFileSync(this.structurePath, `export const siteStructure = ${JSON.stringify(structure, null, 2)};`);

    const sanitize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const dir = path.join(process.cwd(), "generated", sanitize(businessName));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(path.join(dir, "site_full.json"), jsonContent);
    fs.writeFileSync(path.join(dir, "failures.json"), JSON.stringify(this.failures, null, 2));

    for (const [pagePath, pageData] of Object.entries(this.config.pages)) {
      const fileName = pagePath === "/" ? "home.json" : `${sanitize(pagePath)}.json`;
      fs.writeFileSync(path.join(dir, fileName), JSON.stringify(pageData, null, 2));
    }
  }

  async generateFullWebsite(businessName: string, description: string) {
    console.log(`\n🏗️  CONSTRUCTING SITE: ${businessName}`);
    this.failures = [];

    // 1. Blueprint Phase (Site-wide decisions)
    const sitemap = await generate_sitemap(description);
    this.config.theme = await generate_theme(description);
    const nav = await generate_navigation(description, sitemap);
    this.config.header = nav.header;
    this.config.footer = nav.footer;
    this.config.pages = {}; 

    // --- REFACTOR: Global UI/UX Design (Do once, apply everywhere) ---
    console.log("🎨 Stage 4: Defining Global UI/UX Design Brief...");
    const uiPrompt = fs.readFileSync(path.join(process.cwd(), "engine/prompts/ui-ux-designer.md"), "utf-8");
    const globalDesignBrief = await callLLM(`
### BUSINESS
${businessName}: ${description}
### THEME COLORS
${JSON.stringify(this.config.theme.colors, null, 2)}
### TASK: UI/UX DESIGN
${uiPrompt}
    `, "You are a senior UI/UX designer. Define the global visual style guide.");
    console.log("✅ Global Design Brief established.");

    this.persist(businessName);

    // 2. Production Phase
    for (const pagePath of sitemap) {
      try {
        await this.createFullPage(businessName, description, pagePath, false, globalDesignBrief);
      } catch (e: any) {
        this.recordFailure(pagePath, e);
        this.persist(businessName);
      }
    }

    // 3. Auto-Repair Loop
    for (let i = 0; i < 2; i++) {
      const audit = run_integrity_check(this.config);
      const missing = audit.deadLinks.filter(l => !l.includes('#') && l.startsWith('/'));
      if (missing.length === 0) break;
      for (const p of missing) {
        try {
          await this.createFullPage(businessName, description, p, false, globalDesignBrief);
        } catch (e: any) {
          this.recordFailure(p, e);
        }
      }
    }

    this.validateSite();
    this.persist(businessName);
    console.log(`\n🎉 SITE CONSTRUCTION FINISHED!`);
  }

  async createFullPage(bizName: string, desc: string, pagePath: string, useImages: boolean = false, designBrief?: string) {
    console.log(`\n--- 🏗️  Building Page: ${pagePath} ---`);
    const structureContext = fs.existsSync(this.structurePath) 
      ? fs.readFileSync(this.structurePath, "utf-8")
      : "No pages generated yet.";
    
    // Pass the designBrief if provided, otherwise it will generate one (fallback)
    const pageConfig = await generate_single_page(desc, bizName, pagePath, useImages, [structureContext], designBrief);
    this.config.pages[pagePath] = pageConfig;
    this.persist(bizName);
    return pageConfig;
  }

  validateSite() {
    console.log("\n🔍 RUNNING SITE AUDIT...");
    const integrity = run_integrity_check(this.config);
    const visual = run_visual_check(this.config);

    if (integrity.orphans.length > 0) console.warn(`🔗 Orphans: ${integrity.orphans.join(", ")}`);
    if (integrity.deadLinks.length > 0) console.warn(`❌ Dead Nav Links: ${integrity.deadLinks.join(", ")}`);
    if (integrity.brokenCTAs.length > 0) console.warn(`❌ Broken CTAs: ${integrity.brokenCTAs.length}`);
    if (visual.themeOverrides.length > 0) console.warn(`🎨 Visual Overrides: ${visual.themeOverrides.length}`);

    if (integrity.isValid && visual.themeOverrides.length === 0) console.log("✅ Audit Passed.");
  }
}

async function runPoC() {
  const engine = new PropSiteEngine();
  await engine.generateFullWebsite("Chris Gardening & Mowing", "Premium lawn care in Melbourne.");
}

if (require.main === module) {
  runPoC().catch(console.error);
}
