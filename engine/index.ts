import fs from "fs";
import path from "path";
import 'dotenv/config';

// Generators
import { generate_sitemap } from "./generators/site_architect";
import { generate_theme } from "./generators/theme_designer";
import { generate_navigation } from "./generators/nav_designer";
import { generate_single_page } from "./generators/page_generator";
import { generate_node } from "./generators/node_generator";

// Types
import { WebsiteConfig } from "../lib/schema";

/**
 * PROPSITE ENGINE: ORCHESTRATOR
 */
export class PropSiteEngine {
  private config: WebsiteConfig;
  private configPath = path.join(process.cwd(), "config/site.ts");
  private structurePath = path.join(process.cwd(), "config/site_structure.ts");

  constructor() {
    this.config = this.loadConfigFromDisk();
  }

  private loadConfigFromDisk(): WebsiteConfig {
    if (!fs.existsSync(this.configPath)) {
      return { theme: {} as any, header: {} as any, footer: {} as any, pages: {} };
    }
    const content = fs.readFileSync(this.configPath, "utf-8");
    const jsonMatch = content.match(/siteConfig: WebsiteConfig = ([\s\S]*?);/);
    if (!jsonMatch) return { theme: {} as any, header: {} as any, footer: {} as any, pages: {} };
    
    try {
      const cleanJson = jsonMatch[1].trim();
      return eval(`(${cleanJson})`);
    } catch (e) {
      console.error("❌ Failed to parse existing site.ts.");
      return { theme: {} as any, header: {} as any, footer: {} as any, pages: {} };
    }
  }

  private persist(businessName: string = "default") {
    const siteContent = `import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = ${JSON.stringify(this.config, null, 2)};
`;
    fs.writeFileSync(this.configPath, siteContent);

    const structure: Record<string, string[]> = {};
    for (const [path, page] of Object.entries(this.config.pages)) {
      structure[path] = page.sectionOrder;
    }
    const structureContent = `/**
 * SITE STRUCTURE (Layout Map)
 */
export const siteStructure = ${JSON.stringify(structure, null, 2)};
`;
    fs.writeFileSync(this.structurePath, structureContent);

    const sanitize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const dir = path.join(process.cwd(), "generated", sanitize(businessName));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const [pagePath, pageData] of Object.entries(this.config.pages)) {
      const fileName = pagePath === "/" ? "home.json" : `${sanitize(pagePath)}.json`;
      fs.writeFileSync(path.join(dir, fileName), JSON.stringify(pageData, null, 2));
    }

    console.log(`\n💾 Persisted state to site.ts and generated/ folder.`);
  }

  async generateFullWebsite(businessName: string, description: string) {
    console.log(`\n🏗️  CONSTRUCTING SITE: ${businessName}`);

    // 1. Sitemap
    const sitemap = await generate_sitemap(description);
    console.log(`📍 Sitemap: ${sitemap.join(", ")}`);

    // 2. Theme
    this.config.theme = await generate_theme(description);
    console.log(`🎨 Theme Color (Primary): ${this.config.theme.colors.primary}`);

    // 3. Navigation
    const nav = await generate_navigation(description, sitemap);
    this.config.header = nav.header;
    this.config.footer = nav.footer;
    console.log(`🧭 Navigation Header: ${nav.header.title}`);

    this.config.pages = {}; 

    // 4. Production Loop
    for (const pagePath of sitemap) {
      await this.createFullPage(businessName, description, pagePath, false);
    }

    console.log(`\n🎉 FULL WEBSITE READY: http://localhost:3000`);
  }

  async createFullPage(bizName: string, desc: string, pagePath: string, useImages: boolean = false) {
    console.log(`\n--- 🏗️  Building Page: ${pagePath} ---`);
    const pageConfig = await generate_single_page(desc, bizName, pagePath, useImages);
    
    // Log a preview of the sections generated
    console.log(`✅ Page Generated! SEO Title: "${pageConfig.seo.title}"`);
    console.log(`📊 Sections: [${pageConfig.sectionOrder.join(", ")}]`);

    this.config.pages[pagePath] = pageConfig;
    this.persist(bizName);
    return pageConfig;
  }

  async createAndInjectNode(pagePath: string, bizName: string, nodeId: string, brief: string, insertAt?: { before?: string; after?: string }, useImages: boolean = false) {
    console.log(`\n--- 🪄  AI-Generating Node: ${nodeId} ---`);
    const nodeConfig = await generate_node(pagePath, brief, nodeId, brief, useImages);
    
    console.log(`✅ Node JSON received for: ${nodeId} (${nodeConfig.type})`);

    if (!this.config.pages[pagePath]) {
      this.config.pages[pagePath] = { seo: { title: "Untitled" }, sectionOrder: [], sections: {} };
    }

    const page = this.config.pages[pagePath];
    page.sections[nodeId] = nodeConfig;

    if (!page.sectionOrder.includes(nodeId)) {
      if (insertAt?.before) {
        const idx = page.sectionOrder.indexOf(insertAt.before);
        page.sectionOrder.splice(idx === -1 ? page.sectionOrder.length : idx, 0, nodeId);
      } else if (insertAt?.after) {
        const idx = page.sectionOrder.indexOf(insertAt.after);
        page.sectionOrder.splice(idx === -1 ? page.sectionOrder.length : idx + 1, 0, nodeId);
      } else {
        page.sectionOrder.push(nodeId);
      }
    }

    this.persist(bizName);
    return nodeConfig;
  }
}

/**
 * PoC EXECUTION
 */
async function runPoC() {
  const engine = new PropSiteEngine();
  const business = "Chris Dog Washing";
  const desc = "Premium professional dog grooming and washing in Point Cook, Melbourne.";

  await engine.generateFullWebsite(business, desc);
}

if (require.main === module) {
  runPoC().catch(console.error);
}
