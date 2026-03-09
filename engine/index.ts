import fs from "fs";
import path from "path";
import 'dotenv/config';

// Generators
import { generate_sitemap } from "./generators/site_architect";
import { generate_theme } from "./generators/theme_designer";
import { generate_navigation } from "./generators/nav_designer";
import { generate_single_page } from "./generators/page_generator";
import { generate_node } from "./generators/node_generator";

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

  constructor() {
    this.config = this.loadConfigFromDisk();
  }

  /**
   * LOAD: Smart recovery. Tries JSON first, then TS.
   */
  private loadConfigFromDisk(): WebsiteConfig {
    if (fs.existsSync(this.jsonPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.jsonPath, "utf-8"));
      } catch (e) {
        console.warn("⚠️  site.json found but invalid. Falling back to site.ts.");
      }
    }

    if (fs.existsSync(this.tsPath)) {
      try {
        const content = fs.readFileSync(this.tsPath, "utf-8");
        const jsonMatch = content.match(/siteConfig: WebsiteConfig = ([\s\S]*?);/);
        if (jsonMatch) {
          return eval(`(${jsonMatch[1]})`);
        }
      } catch (e) {
        console.error("❌ Failed to recover state from site.ts.");
      }
    }

    return { theme: {} as any, header: {} as any, footer: {} as any, pages: {} };
  }

  private persist(businessName: string = "default") {
    const jsonContent = JSON.stringify(this.config, null, 2);
    fs.writeFileSync(this.jsonPath, jsonContent);

    const tsContent = `import { WebsiteConfig } from "@/lib/schema";\n\nexport const siteConfig: WebsiteConfig = ${jsonContent};`;
    fs.writeFileSync(this.tsPath, tsContent);

    // Sync Brain
    const pagesStructure: Record<string, string[]> = {};
    for (const [path, page] of Object.entries(this.config.pages)) {
      pagesStructure[path] = page.sectionOrder;
    }
    const structure = {
      pages: pagesStructure,
      navigation: {
        header: (this.config.header.links || []).map((l: any) => l.href),
        footer: (this.config.footer.columns || []).flatMap((c: any) => c.links.map((l: any) => l.href))
      }
    };
    fs.writeFileSync(this.structurePath, `export const siteStructure = ${JSON.stringify(structure, null, 2)};`);
  }

  async generateFullWebsite(businessName: string, description: string) {
    console.log(`\n🏗️  CONSTRUCTING SITE: ${businessName}`);
    const sitemap = await generate_sitemap(description);
    this.config.theme = await generate_theme(description);
    const nav = await generate_navigation(description, sitemap);
    this.config.header = nav.header;
    this.config.footer = nav.footer;
    this.config.pages = {}; 

    for (const pagePath of sitemap) {
      await this.createFullPage(businessName, description, pagePath, false);
    }
    this.validateSite();
  }

  async createFullPage(bizName: string, desc: string, pagePath: string, useImages: boolean = false) {
    console.log(`\n--- 🏗️  Building Page: ${pagePath} ---`);
    const pageConfig = await generate_single_page(desc, bizName, pagePath, useImages, Object.keys(this.config.pages));
    this.config.pages[pagePath] = pageConfig;
    this.persist(bizName);
    return pageConfig;
  }

  async createAndInjectNode(pagePath: string, bizName: string, nodeId: string, brief: string, insertAt?: { before?: string; after?: string }, useImages: boolean = false) {
    console.log(`\n--- 🪄  AI-Generating Node: ${nodeId} ---`);
    const nodeConfig = await generate_node(pagePath, brief, nodeId, brief, useImages);
    
    if (!this.config.pages[pagePath]) {
      this.config.pages[pagePath] = { seo: { title: "Untitled", description: "Default" }, sectionOrder: [], sections: {} };
    }

    const page = this.config.pages[pagePath];
    page.sections[nodeId] = nodeConfig;

    if (!page.sectionOrder.includes(nodeId)) {
      const order = page.sectionOrder;
      if (insertAt?.before) {
        const idx = order.indexOf(insertAt.before);
        order.splice(idx === -1 ? order.length : idx, 0, nodeId);
      } else if (insertAt?.after) {
        const idx = order.indexOf(insertAt.after);
        order.splice(idx === -1 ? order.length : idx + 1, 0, nodeId);
      } else {
        order.push(nodeId);
      }
    }

    this.persist(bizName);
    return nodeConfig;
  }

  validateSite() {
    console.log("\n🔍 RUNNING SITE AUDIT...");
    const integrity = run_integrity_check(this.config);
    const visual = run_visual_check(this.config);

    if (integrity.orphans.length > 0) {
      console.warn(`🔗 Integrity: Found ${integrity.orphans.length} orphaned pages: ${integrity.orphans.join(", ")}`);
    }
    if (integrity.deadLinks.length > 0) {
      console.warn(`❌ Integrity: Found ${integrity.deadLinks.length} dead links in nav: ${integrity.deadLinks.join(", ")}`);
    }
    if (integrity.brokenCTAs.length > 0) {
      console.warn(`❌ Integrity: Found ${integrity.brokenCTAs.length} broken CTA buttons:`);
      integrity.brokenCTAs.forEach(cta => console.warn(`   -> ${cta}`));
    }
    
    if (visual.themeOverrides.length > 0) {
      console.warn(`🎨 Visual: Found ${visual.themeOverrides.length} theme overrides.`);
    }

    if (integrity.isValid && visual.themeOverrides.length === 0) {
      console.log("✅ Audit Passed: Site is healthy.");
    }
  }
}

async function runPoC() {
  const engine = new PropSiteEngine();
  await engine.generateFullWebsite("Chris Gardening & Mowing", "Premium lawn care in Point Cook.");
}

if (require.main === module) {
  runPoC().catch(console.error);
}
