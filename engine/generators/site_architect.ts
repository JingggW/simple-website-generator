import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_sitemap(description: string): Promise<string[]> {
  console.log("🗺️  Stage 1: Generating Sitemap...");
  const architectPrompt = loadPrompt("site-architect");

  const response = await callLLM(
    `
### BUSINESS DESCRIPTION
${description}

### TASK: SITE ARCHITECT
${architectPrompt}
  `,
    "You are a senior digital strategist. Output ONLY a JSON array of strings.",
  );

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    // More robust extraction: find the first '[' and last ']'
    const start = rawJson.indexOf("[");
    const end = rawJson.lastIndexOf("]") + 1;
    if (start === -1 || end === 0) throw new Error("No JSON array found");
    return JSON.parse(rawJson.slice(start, end));
  } catch (error) {
    console.error("❌ Failed to parse Sitemap JSON:", error);
    return ["/", "/about", "/services", "/contact"]; // Safe fallback
  }
}
