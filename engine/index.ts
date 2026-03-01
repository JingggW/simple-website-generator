import fs from "fs";
import path from "path";
import 'dotenv/config';

// Generators
import { generate_sitemap } from "./generators/site_architect";
import { generate_theme } from "./generators/theme_designer";
import { generate_navigation } from "./generators/nav_designer";
import { generate_single_page } from "./generators/page_generator";
import { generate_and_inject_node } from "./generators/node_generator";

// Storage
import { inject_page_to_config } from "./storage/page_injector";
import { inject_node_to_config } from "./storage/node_injector";
import { sync_blueprint_to_file } from "./storage/structure_sync";

/**
 * PROPSITE ENGINE: ORCHESTRATOR (Mission Control)
 */

export class PropSiteEngine {
  /**
   * FULL WEBSITE GENERATOR
   */
  async generateFullWebsite(businessName: string, description: string) {
    console.log(`\n🏗️  Starting Full Site Construction: ${businessName}`);

    // 1. Blueprint Phase
    const sitemap = await generate_sitemap(description);
    const theme = await generate_theme(description);
    const navigation = await generate_navigation(description, sitemap);

    // 2. Storage: Initialize (Save Global Data)
    this.saveGlobalConfig(businessName, theme, navigation.header, navigation.footer);

    // 3. Production Loop
    for (const pagePath of sitemap) {
      await this.createFullPage(businessName, description, pagePath);
    }

    console.log(`\n🎉 FULL WEBSITE CONSTRUCTED!`);
  }

  /**
   * Saves raw AI-generated JSON to the 'generated/' folder for debugging/history.
   */
  private saveToGeneratedFolder(businessName: string, pathSegment: string, data: any) {
    const sanitize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const dir = path.join(process.cwd(), "generated", sanitize(businessName));
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = pathSegment === "/" ? "home.json" : `${sanitize(pathSegment)}.json`;
    fs.writeFileSync(path.join(dir, fileName), JSON.stringify(data, null, 2));
    console.log(`💾 Saved raw JSON to: generated/${sanitize(businessName)}/${fileName}`);
  }

  private saveGlobalConfig(businessName: string, theme: any, header: any, footer: any) {
    const configPath = path.join(process.cwd(), "config/site.ts");
    const globalContent = `import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  theme: ${JSON.stringify(theme, null, 2)},
  header: ${JSON.stringify(header, null, 2)},
  footer: ${JSON.stringify(footer, null, 2)},
  pages: {}
};
`;
    fs.writeFileSync(configPath, globalContent);
    // Also save global parts to generated folder
    this.saveToGeneratedFolder(businessName, "global-theme", theme);
    this.saveToGeneratedFolder(businessName, "global-nav", { header, footer });
    console.log(`✅ Global site configuration initialized.`);
  }

  async createFullPage(
    businessName: string, 
    description: string, 
    path: string,
    useImageGen: boolean = false
  ) {
    console.log(`\n--- 🏗️  Building Full Page: ${path} ---`);
    const pageConfig = await generate_single_page(description, businessName, path, useImageGen);
    
    // 1. Save to Debug Folder
    this.saveToGeneratedFolder(businessName, path, pageConfig);

    // 2. Inject to Site Config
    inject_page_to_config(path, pageConfig);

    // 3. Sync Structure
    sync_blueprint_to_file(path, pageConfig.sectionOrder);
    
    return pageConfig;
  }

  async updatePageNode(
    pagePath: string, 
    nodeId: string, 
    nodeConfig: any, 
    insertAt?: { before?: string; after?: string }
  ) {
    const newOrder = inject_node_to_config(pagePath, nodeId, nodeConfig, insertAt);
    sync_blueprint_to_file(pagePath, newOrder);
  }

  async createAndInjectNode(
    pagePath: string,
    businessDescription: string,
    nodeId: string,
    designBrief: string,
    insertAt?: { before?: string; after?: string },
    useImageGen: boolean = false
  ) {
    return await generate_and_inject_node(
      pagePath,
      businessDescription,
      nodeId,
      designBrief,
      insertAt,
      useImageGen
    );
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
