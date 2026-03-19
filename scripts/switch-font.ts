import fs from "fs";
import path from "path";

// Curated pairings from FONT_PAIRINGS
const fontChoices = ["sans", "serif", "mono", "display", "bold"];

async function main() {
  const chosenFont = process.argv[2];

  if (!chosenFont || !fontChoices.includes(chosenFont)) {
    console.log("❌ Invalid font choice.");
    console.log(`Available choices: ${fontChoices.join(", ")}`);
    process.exit(1);
  }

  const sitePath = path.join(process.cwd(), "config/site.json");
  const siteTsPath = path.join(process.cwd(), "config/site.ts");

  if (!fs.existsSync(sitePath)) {
    console.log("❌ config/site.json not found.");
    process.exit(1);
  }

  try {
    const siteConfig = JSON.parse(fs.readFileSync(sitePath, "utf-8"));
    
    // Update fontStyle
    siteConfig.theme.fontStyle = chosenFont;

    // Save JSON
    const jsonContent = JSON.stringify(siteConfig, null, 2);
    fs.writeFileSync(sitePath, jsonContent);

    // Save TS
    fs.writeFileSync(
      siteTsPath,
      `import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = ${jsonContent};`
    );

    console.log(`✅ Font switched to: "${chosenFont}"`);
    console.log("Run 'npm run dev' to see the changes!");
  } catch (error) {
    console.error("❌ Failed to update font:", error);
  }
}

main();
