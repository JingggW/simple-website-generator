import fs from "fs";
import path from "path";

/**
 * SCHEMA UTILITIES
 * 
 * Surgically extracts tagged sections from lib/schema.ts using regex.
 */

export function getSchemaSection(tags: string | string[]): string {
  const schemaPath = path.join(process.cwd(), "lib/schema.ts");
  const content = fs.readFileSync(schemaPath, "utf-8");
  
  const tagList = Array.isArray(tags) ? tags : [tags];
  let extracted = "";

  for (const tag of tagList) {
    // Escape backslashes for the RegExp constructor
    const regex = new RegExp(`// --- START ${tag} ---[\\s\\S]*?// --- END ${tag} ---`, "g");
    const matches = content.match(regex);
    if (matches) {
      extracted += matches.join("\n\n") + "\n";
    }
  }

  return extracted || "// No schema section found for tags: " + tagList.join(", ");
}
