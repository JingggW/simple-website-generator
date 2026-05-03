import fs from "fs";
import path from "path";
import { PropSiteEngine } from "../engine";
import { Theme } from "../lib/schema";

/**
 * THEME REGISTRAR & APPLIER
 * 
 * Usage:
 * npx tsx scripts/register-theme.ts --id=growing-money-minds
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
    console.error("❌ Usage: npx tsx scripts/register-theme.ts --id=business-folder-name");
    process.exit(1);
  }

  const themePath = path.join(process.cwd(), "branding", id, "theme.json");
  const presetsFile = path.join(process.cwd(), "lib/theme-presets.ts");

  if (!fs.existsSync(themePath)) {
    console.error(`❌ theme.json not found in branding/${id}`);
    process.exit(1);
  }

  const themeData = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  const themeId = themeData.name;

  if (!themeId) {
    console.error("❌ theme.json must have a 'name' field to use as ID.");
    process.exit(1);
  }

  console.log(`🎨 Registering theme '${themeId}' for ${id}...`);

  let content = fs.readFileSync(presetsFile, "utf-8");

  // Check if theme already registered
  if (content.includes(`${themeId}:`)) {
    console.log(`ℹ️ Theme '${themeId}' is already registered. Overwriting values...`);
    // Remove the existing entry to prevent duplicates
    const regex = new RegExp(`\\s*${themeId}: \\{[\\s\\S]*?\\},`, "g");
    content = content.replace(regex, "");
  }

  // 1. Prepare the new entry string
  const newEntry = `
  ${themeId}: {
    mode: "${themeData.mode || "light"}",
    preset: "${themeData.preset || "modern"}",
    colors: ${JSON.stringify(themeData.colors, null, 6).replace(/}/g, '    }')},
    fontStyle: "${themeData.fontStyle || "sans"}",
    typographyScale: "${themeData.typographyScale || "standard"}",
    borderRadius: "${themeData.borderRadius || "md"}",
    containerStyle: "${themeData.containerStyle || "default"}",
    dividerStyle: "${themeData.dividerStyle || "none"}",
  },`;

  // 2. Inject before the closing brace of THEME_PRESETS
  // Find the position where THEME_PRESETS ends
  const presetsMatch = content.match(/export const THEME_PRESETS: Record<string, Theme> = \{([\s\S]*?)\};/);
  if (presetsMatch) {
      const oldPresetsContent = presetsMatch[1];
      const newPresetsContent = `\n  ${oldPresetsContent.trim()}\n${newEntry}\n`;
      content = content.replace(oldPresetsContent, newPresetsContent);
  } else {
      console.error("❌ Could not find THEME_PRESETS object in lib/theme-presets.ts");
      process.exit(1);
  }

  fs.writeFileSync(presetsFile, content);
  console.log(`✅ Theme '${themeId}' successfully injected into THEME_PRESETS.`);

  // 3. Immediately apply to site.ts
  console.log(`🚀 Applying theme '${themeId}' to the active site config...`);
  const engine = new PropSiteEngine();
  const siteConfig = engine.getSiteConfig();

  // Strip 'name' before applying to the actual config schema
  const { name, ...restOfTheme } = themeData;

  // Update theme properties
  siteConfig.theme = {
    ...restOfTheme,
    preset: themeId as any // Force cast to match our dynamically added ID
  };

  engine.setSiteConfig(siteConfig);
  engine.saveConfig();

  console.log(`✨ Site successfully updated with theme '${themeId}'.`);
  console.log("Run 'npm run dev' to see the changes!");
}

main().catch(console.error);
