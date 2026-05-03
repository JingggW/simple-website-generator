import fs from "fs";
import path from "path";

/**
 * CONTEXT SWAPPER
 * 
 * Usage:
 * npx tsx scripts/load-site.ts --id=serene-cuts-styling
 */

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      acc[key.replace("--", "")] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { id } = args;

  if (!id) {
    console.error("❌ Usage: npx tsx scripts/load-site.ts --id=business-id");
    process.exit(1);
  }

  const generatedDir = path.join(process.cwd(), "generated", id);
  const configDir = path.join(process.cwd(), "config");

  if (!fs.existsSync(generatedDir)) {
    console.error(`❌ Source folder not found: ${generatedDir}`);
    console.log("Existing business IDs in /generated:");
    const dirs = fs.readdirSync(path.join(process.cwd(), "generated"))
                   .filter(f => fs.statSync(path.join(process.cwd(), "generated", f)).isDirectory());
    console.log(dirs.map(d => ` - ${d}`).join("\n"));
    process.exit(1);
  }

  const sourceFile = path.join(generatedDir, "site_full.json");
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ site_full.json not found in ${generatedDir}`);
    process.exit(1);
  }

  // 1. Copy site_full.json to config/site.json
  const siteJson = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));
  fs.writeFileSync(path.join(configDir, "site.json"), JSON.stringify(siteJson, null, 2));

  // 2. Regenerate config/site.ts
  const siteTsContent = `import { WebsiteConfig } from "@/lib/schema";\n\nexport const siteConfig: WebsiteConfig = ${JSON.stringify(siteJson, null, 2)};`;
  fs.writeFileSync(path.join(configDir, "site.ts"), siteTsContent);

  // 3. Update site_structure.ts (Minimal version)
  const pagesStructure: Record<string, string[]> = {};
  for (const [path, page] of Object.entries((siteJson.pages || {}) as any)) {
    pagesStructure[path] = (page as any).sectionOrder;
  }
  const structure = {
    pages: pagesStructure,
    navigation: {
      header: (siteJson.header?.links || []).map((l: any) => l.href),
      footer: (siteJson.footer?.columns || []).flatMap((c: any) =>
        c.links?.map((l: any) => l.href),
      ),
    },
  };
  fs.writeFileSync(
    path.join(configDir, "site_structure.ts"),
    `export const siteStructure = ${JSON.stringify(structure, null, 2)};`,
  );

  console.log(`\n✨ Successfully loaded context for: ${id}`);
  console.log("Run 'npm run dev' to preview.");
}

main().catch(console.error);
