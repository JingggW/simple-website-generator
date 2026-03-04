import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { WebsiteConfig } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_navigation(
  description: string, 
  sitemap: string[]
): Promise<{ header: WebsiteConfig["header"]; footer: WebsiteConfig["footer"] }> {
  console.log("🧭 Stage 3: Designing Navigation...");
  
  // SURGICAL EXTRACTION: Only get Nav and Footer rules
  const schema = getSchemaSection(["NAV", "FOOTER"]);
  
  const navPrompt = loadPrompt("nav-designer")
    .replace("{{SCHEMA}}", schema)
    .replace("{{BUSINESS}}", description)
    .replace("{{SITEMAP}}", JSON.stringify(sitemap));

  const response = await callLLM(navPrompt, "You are a senior UI/UX strategist. Output ONLY the JSON object.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    return JSON.parse(rawJson);
  } catch (error) {
    console.error("❌ Failed to parse Navigation JSON:", error);
    throw error;
  }
}
