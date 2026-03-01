import fs from "fs";
import path from "path";

/**
 * BLUEPRINT UTILITIES
 * 
 * Synchronizes the 'Engine Brain' (site_structure.ts) with 
 * the 'Final Build' (site.ts).
 */

export function sync_blueprint_to_file(pagePath: string, newOrder: string[]) {
  const structurePath = path.join(process.cwd(), "config/site_structure.ts");
  
  if (!fs.existsSync(structurePath)) {
    throw new Error(`Structure file not found at: ${structurePath}`);
  }

  const content = fs.readFileSync(structurePath, "utf-8");
  
  // prepare the entry: "/path": ["id1", "id2"],
  const newEntry = `  "${pagePath}": ${JSON.stringify(newOrder)},`;

  let newContent: string;
  const existingPathRegex = new RegExp(`"${pagePath}":\\s*\\[[\\s\\S]*?\\],`, "m");

  if (existingPathRegex.test(content)) {
    console.log(`♻️  Updating blueprint for path: ${pagePath}`);
    newContent = content.replace(existingPathRegex, newEntry);
  } else {
    console.log(`➕ Adding new path to blueprint: ${pagePath}`);
    // Insert before the last closing brace
    const lastBraceIndex = content.lastIndexOf("};");
    newContent = 
      content.slice(0, lastBraceIndex) + 
      newEntry + "\n" +
      content.slice(lastBraceIndex);
  }

  fs.writeFileSync(structurePath, newContent);
  console.log(`✅ config/site_structure.ts synchronized.`);
}
