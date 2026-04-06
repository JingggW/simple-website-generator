import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function classify_intent(intent: string): Promise<string> {
  console.log(`🧠 Classifying intent: "${intent}"`);
  const prompt = loadPrompt("intent-classifier");

  const response = await callLLM(`
### USER INTENT
${intent}

### TASK: CLASSIFY
${prompt}
  `, "You are an intent classifier. Output ONLY the category name.");

  const category = response.trim().toUpperCase();
  const valid = ["HERO", "SERVICES", "PRICING", "FORM", "MAP", "TESTIMONIALS", "BLOCKS", "CAROUSEL", "ACCORDION", "TABS", "GALLERY"];
  
  return valid.includes(category) ? category : "BLOCKS"; // Default to blocks
}
