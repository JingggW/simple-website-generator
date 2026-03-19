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

/**
 * UI CAPABILITY EXTRACTOR
 * 
 * Programmatically finds all section types and their variants from schema.ts
 * to keep prompts perfectly in sync with the actual codebase.
 */
export function getUICapabilities(): string {
  const schemaPath = path.join(process.cwd(), "lib/schema.ts");
  const content = fs.readFileSync(schemaPath, "utf-8");
  
  // Find all Section schemas (e.g., HeroSchema, ServicesSchema)
  // Modified to handle both single z.literal and enum patterns
  const schemaRegex = /export const (\w+)Schema = z\.object\(\{[\s\S]*?type: z\.literal\("(\w+)"\)[\s\S]*?variant: z\.enum\(\[([\s\S]*?)\]\)/g;
  
  let capabilities = "AVAILABLE UI COMPONENTS & VARIANTS:\n";
  let match;
  
  while ((match = schemaRegex.exec(content)) !== null) {
    const type = match[2];
    const variants = match[3]
      .replace(/["'\s]/g, "")
      .split(",")
      .filter(v => v.length > 0);
      
    capabilities += `- ${type.toUpperCase()}: variants [${variants.join(", ")}]\n`;
  }

  return capabilities;
}
