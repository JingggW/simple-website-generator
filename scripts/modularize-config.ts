import fs from "fs";
import path from "path";

/**
 * CONFIG MODULARIZER
 * 
 * Splits the monolithic site.json into modular components:
 * - theme.json
 * - header.json
 * - footer.json
 * - pages/*.json
 */

async function main() {
  const configDir = path.join(process.cwd(), "config");
  const pagesDir = path.join(configDir, "pages");
  const siteJsonPath = path.join(configDir, "site.json");

  if (!fs.existsSync(siteJsonPath)) {
    console.error("❌ config/site.json not found. Nothing to split.");
    process.exit(1);
  }

  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  const siteConfig = JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));

  // 1. Split Theme
  if (siteConfig.theme) {
    fs.writeFileSync(
      path.join(configDir, "theme.json"),
      JSON.stringify(siteConfig.theme, null, 2)
    );
    console.log("✅ Created config/theme.json");
  }

  // 2. Split Header
  if (siteConfig.header) {
    fs.writeFileSync(
      path.join(configDir, "header.json"),
      JSON.stringify(siteConfig.header, null, 2)
    );
    console.log("✅ Created config/header.json");
  }

  // 3. Split Footer
  if (siteConfig.footer) {
    fs.writeFileSync(
      path.join(configDir, "footer.json"),
      JSON.stringify(siteConfig.footer, null, 2)
    );
    console.log("✅ Created config/footer.json");
  }

  // 4. Split Pages
  if (siteConfig.pages) {
    for (const [route, pageData] of Object.entries(siteConfig.pages)) {
      const fileName = route === "/" ? "home.json" : `${route.replace(/^\//, "").replace(/\//g, "__")}.json`;
      fs.writeFileSync(
        path.join(pagesDir, fileName),
        JSON.stringify(pageData, null, 2)
      );
      console.log(`✅ Created config/pages/${fileName}`);
    }
  }

  // 5. CRM Config (Optional but good to keep)
  const crmConfig = {
    crmUrl: siteConfig.crmUrl,
    crmSecret: siteConfig.crmSecret
  };
  fs.writeFileSync(
    path.join(configDir, "crm.json"),
    JSON.stringify(crmConfig, null, 2)
  );
  console.log("✅ Created config/crm.json");

  console.log("\n✨ Migration to Modular Config complete!");
  console.log("Note: Original site.json still exists as a backup.");
}

main().catch(console.error);
