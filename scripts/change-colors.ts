import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/**
 * CHANGE COLORS SCRIPT
 * 
 * Usage:
 * npx tsx scripts/change-colors.ts --primary="#4A70A9" --secondary="#8FABD4" --background="#EFECE3" --text="#000000"
 */

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      if (key && value) {
        acc[key.replace("--", "")] = value.replace(/['"]/g, ""); // Strip any quotes
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const themePath = path.join(process.cwd(), "config/theme.json");

  if (!fs.existsSync(themePath)) {
    console.error("❌ config/theme.json not found.");
    process.exit(1);
  }

  try {
    const themeData = JSON.parse(fs.readFileSync(themePath, "utf-8"));
    
    let updated = false;
    const allowedColors = ["primary", "secondary", "background", "surface", "muted", "accent", "text"];
    
    for (const [key, value] of Object.entries(args)) {
      if (allowedColors.includes(key)) {
        if (!themeData.colors) themeData.colors = {};
        console.log(`🎨 Updating ${key} to ${value}`);
        themeData.colors[key] = value;
        updated = true;
      } else {
        console.warn(`⚠️ Warning: Unknown color variable '${key}' ignored.`);
      }
    }

    if (!updated) {
      console.error("❌ No valid colors specified.");
      console.log("Usage: npx tsx scripts/change-colors.ts --primary=\"#HEX\" --secondary=\"#HEX\" --background=\"#HEX\" --text=\"#HEX\"");
      process.exit(1);
    }

    // Save updated theme.json
    fs.writeFileSync(themePath, JSON.stringify(themeData, null, 2));
    console.log("✅ config/theme.json updated successfully.");

    // Run assemble
    console.log("🏗️ Assembling site configuration with new colors...");
    execSync("npm run assemble", { stdio: "inherit" });
    
    console.log("✨ All done! Theme colors changed and site assembled successfully.");
  } catch (error) {
    console.error("❌ Failed to update theme colors:", error);
  }
}

main().catch(console.error);
