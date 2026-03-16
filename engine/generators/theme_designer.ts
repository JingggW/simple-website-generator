import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { Theme } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_theme(description: string): Promise<Theme> {
  console.log("🎨 Stage 2: Designing Theme...");
  
  // SURGICAL EXTRACTION: Only get Theme rules
  const schema = getSchemaSection("THEME");
  const themePrompt = loadPrompt("theme-designer").replace(/{{SCHEMA}}/g, schema);

  const response = await callLLM(`
### BUSINESS DESCRIPTION
${description}

### TASK: THEME DESIGNER
${themePrompt}
  `, "You are a senior UI/UX designer. Output ONLY the valid Theme JSON object.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    return JSON.parse(rawJson);
  } catch (error) {
    console.error("❌ Failed to parse Theme JSON:", error);
    throw error;
  }
}
