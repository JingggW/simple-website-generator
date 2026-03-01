import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { Theme } from "../../lib/schema";

function getSchema(): string {
  const schemaPath = path.join(process.cwd(), "lib/schema.ts");
  return fs.readFileSync(schemaPath, "utf-8");
}

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_theme(description: string): Promise<Theme> {
  console.log("🎨 Stage 2: Designing Theme...");
  const schema = getSchema();
  const themePrompt = loadPrompt("theme-designer").replace("{{SCHEMA}}", schema);

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
