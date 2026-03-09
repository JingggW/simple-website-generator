import fs from "fs";
import path from "path";

/**
 * DESIGN LIBRARY UTILITIES
 *
 * Surgically extracts tagged design guides from engine/design-library/*.md
 */

export function getDesignToken(category: string, tag: string): string {
  const filePath = path.join(
    process.cwd(),
    "engine/design-library",
    `${category}.md`,
  );

  if (!fs.existsSync(filePath)) {
    return `// Category ${category} not found.`;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const regex = new RegExp(
    `// --- START ${tag} ---[\s\S]*?// --- END ${tag} ---`,
    "g",
  );
  const matches = content.match(regex);

  return matches
    ? matches.join("")
    : `// No design token found for tag: ${tag}`;
}
