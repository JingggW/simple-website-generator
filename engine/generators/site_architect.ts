import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { WebsiteConfig } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export interface SiteBlueprint {
  theme: WebsiteConfig["theme"];
  header: WebsiteConfig["header"];
  footer: WebsiteConfig["footer"];
  sitemap: string[];
  sitePlan: Record<string, { type: string; goal: string }[]>;
}

export async function generate_full_site_blueprint(
  description: string,
  instruction: string = "", // NEW: Optional specific instruction
): Promise<SiteBlueprint> {
  console.log("📐 Stage 1: Drafting Structural Blueprint...");

  // 1. Get Structure (Sitemap & Page Plans)
  const architectPrompt = loadPrompt("site-architect")
    .replace(/{{BUSINESS}}/g, description)
    .replace(
      /{{INSTRUCTION}}/g,
      instruction || "Create a comprehensive website structure.",
    );

  const structResponse = await callLLM(
    architectPrompt,
    "You are a senior digital architect. Output ONLY the valid JSON structure.",
  );

  const structure = JSON.parse(
    structResponse.replace(/```json|```/g, "").trim(),
  );

  console.log("🎨 Stage 2: Designing Global UI & Branding...");

  // 2. Get UI & Branding (Theme, Header, Footer)
  const schema = getSchemaSection(["THEME", "NAV", "HEADER", "FOOTER", "PAGE"]);
  const uiPrompt = loadPrompt("master-ui-designer")
    .replace(/{{BUSINESS}}/g, description)
    .replace(/{{SITEMAP}}/g, JSON.stringify(structure.sitemap))
    .replace(/{{SCHEMA}}/g, schema);

  const uiResponse = await callLLM(
    uiPrompt,
    "You are a senior UI/UX designer. Output ONLY the valid JSON branding (theme, header, footer).",
  );
  const ui = JSON.parse(uiResponse.replace(/```json|```/g, "").trim());

  return {
    ...ui,
    sitemap: structure.sitemap,
    sitePlan: structure.sitePlan,
  };
}

/** Fallback or Legacy: Keep for simple sitemap needs */
export async function generate_sitemap(description: string): Promise<string[]> {
  console.log("🗺️  Stage 1 (Fallback): Generating Sitemap...");

  const architectPrompt = loadPrompt("site-architect").replace(
    "{{BUSINESS}}",
    description,
  );

  const response = await callLLM(
    architectPrompt,
    "You are a senior digital strategist. Output ONLY a JSON array.",
  );

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    const start = rawJson.indexOf("[");
    const end = rawJson.lastIndexOf("]") + 1;
    if (start === -1 || end === 0) throw new Error("No JSON array found");

    const sitemap = JSON.parse(rawJson.slice(start, end));
    console.log(`✅ Sitemap Generated: [${sitemap.join(", ")}]`);
    return sitemap;
  } catch (error) {
    console.error("❌ Failed to parse Sitemap JSON:", error);
    return ["/", "/contact"];
  }
}
