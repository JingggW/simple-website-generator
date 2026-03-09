import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_sitemap(description: string): Promise<string[]> {
  console.log("🗺️  Stage 1: Generating Sitemap...");
  
  const architectPrompt = loadPrompt("site-architect")
    .replace("{{BUSINESS}}", description);

  const response = await callLLM(architectPrompt, "You are a senior digital strategist. Output ONLY a JSON array.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    const start = rawJson.indexOf("[");
    const end = rawJson.lastIndexOf("]") + 1;
    if (start === -1 || end === 0) throw new Error("No JSON array found");
    
    const sitemap = JSON.parse(rawJson.slice(start, end));
    console.log(`✅ Sitemap Generated: [${sitemap.join(", ")}]`); // RESTORED LOGGING
    return sitemap;
  } catch (error) {
    console.error("❌ Failed to parse Sitemap JSON:", error);
    return ["/", "/about", "/services", "/contact"]; 
  }
}
