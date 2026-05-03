import fs from "fs";
import path from "path";
import { WebsiteConfig } from "../lib/schema";

/**
 * SITE ASSEMBLER
 * 
 * Combines modular config files into the production site.ts and site.json.
 * 
 * Sources:
 * - config/theme.json
 * - config/header.json
 * - config/footer.json
 * - config/crm.json
 * - config/pages/*.json
 */

async function main() {
  const configDir = path.join(process.cwd(), "config");
  const pagesDir = path.join(configDir, "pages");
  const productionJsonPath = path.join(configDir, "site.json");
  const productionTsPath = path.join(configDir, "site.ts");
  const structurePath = path.join(configDir, "site_structure.ts");

  console.log("🏗️  Assembling site configuration...");

  // 1. Load Core Components
  const theme = JSON.parse(fs.readFileSync(path.join(configDir, "theme.json"), "utf-8"));
  const header = JSON.parse(fs.readFileSync(path.join(configDir, "header.json"), "utf-8"));
  const footer = JSON.parse(fs.readFileSync(path.join(configDir, "footer.json"), "utf-8"));
  const crm = fs.existsSync(path.join(configDir, "crm.json")) 
              ? JSON.parse(fs.readFileSync(path.join(configDir, "crm.json"), "utf-8"))
              : {};

  // 2. Load Pages
  const pages: Record<string, any> = {};
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith(".json"));

  for (const file of pageFiles) {
    const pageData = JSON.parse(fs.readFileSync(path.join(pagesDir, file), "utf-8"));
    // Map filename back to route
    let route = file.replace(".json", "");
    if (route === "home") route = "/";
    else route = `/${route.replace(/-/g, "/")}`;
    
    pages[route] = pageData;
    console.log(` 📄 Included page: ${route}`);
  }

  // 3. Construct Full Config
  const fullConfig: WebsiteConfig = {
    theme,
    header,
    footer,
    pages,
    ...crm
  };

  // 4. Persist to Production Files
  const jsonContent = JSON.stringify(fullConfig, null, 2);
  fs.writeFileSync(productionJsonPath, jsonContent);
  fs.writeFileSync(
    productionTsPath,
    `import { WebsiteConfig } from "@/lib/schema";\n\nexport const siteConfig: WebsiteConfig = ${jsonContent};`
  );

  // 5. Generate Structure (for AI context)
  const pagesStructure: Record<string, string[]> = {};
  for (const [route, page] of Object.entries(fullConfig.pages)) {
    pagesStructure[route] = (page as any).sectionOrder;
  }
  const structure = {
    pages: pagesStructure,
    navigation: {
      header: (fullConfig.header?.links || []).map((l: any) => l.href),
      footer: (fullConfig.footer?.columns || []).flatMap((c: any) =>
        c.links?.map((l: any) => l.href),
      ),
    },
  };
  fs.writeFileSync(
    structurePath,
    `export const siteStructure = ${JSON.stringify(structure, null, 2)};`,
  );

  console.log("\n✨ Site Assembled Successfully!");
  console.log(`✅ ${productionJsonPath} updated.`);
  console.log(`✅ ${productionTsPath} updated.`);
  console.log(`✅ ${structurePath} updated.`);
}

main().catch(console.error);
