import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { WebsiteConfig } from "../../lib/schema";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_navigation(
  description: string, 
  sitemap: string[]
): Promise<{ header: WebsiteConfig["header"]; footer: WebsiteConfig["footer"] }> {
  console.log("🧭 Stage 3: Designing Navigation...");
  const navPrompt = loadPrompt("nav-designer");

  const response = await callLLM(`
### INPUTS
Business: ${description}
Sitemap: ${JSON.stringify(sitemap)}

### TASK: NAVIGATION DESIGNER
${navPrompt}
  `, "You are a senior UI/UX strategist. Output ONLY the JSON object with header and footer keys.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    return JSON.parse(rawJson);
  } catch (error) {
    console.error("❌ Failed to parse Navigation JSON:", error);
    throw error;
  }
}
