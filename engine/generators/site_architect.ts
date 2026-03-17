import fs from "fs";
import path from "path";
import { z } from "zod";
import { callLLM } from "../llmClient";
import { WebsiteConfig, ThemeSchema, HeaderSchema, FooterSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";
import { validate_and_repair } from "../repair/schema_fixer";
import { THEME_PRESETS } from "../../lib/theme-presets";

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
  soul?: string;
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

  // 1.5. Basic Blueprint Validation
  const globalSections = ["form", "map", "testimonials", "services", "pricing"];
  const seenGlobals = new Set<string>();
  for (const [path, sections] of Object.entries(structure.sitePlan || {})) {
    (sections as any[]).forEach((s) => {
      if (globalSections.includes(s.type)) {
        if (seenGlobals.has(s.type)) {
          console.warn(`⚠️ Blueprint Warning: Duplicate global section '${s.type}' detected on ${path}. Content Strategist will be forced to fallback to 'blocks'.`);
        }
        seenGlobals.add(s.type);
      }
    });
  }

  console.log("🎨 Stage 2: Designing Global UI & Branding Strategy...");

  // 2. Get UI Strategy (Preset & Soul)
  const schema = getSchemaSection(["THEME", "NAV", "HEADER", "FOOTER", "PAGE"]);
  const uiPrompt = loadPrompt("master-ui-designer")
    .replace(/{{BUSINESS}}/g, description)
    .replace(/{{SITEMAP}}/g, JSON.stringify(structure.sitemap))
    .replace(/{{SCHEMA}}/g, schema);

  const uiResponse = await callLLM(
    uiPrompt,
    "You are a senior UI/UX designer. Output ONLY the valid JSON branding (theme, header, footer).",
  );
  
  let uiRaw: any = null;
  try {
    uiRaw = JSON.parse(uiResponse.replace(/```json|```/g, "").trim());
  } catch (error) {
    console.warn("⚠️ Initial JSON parse failed for Brand config. Retrying with LLM repair...", error);
    uiRaw = JSON.parse(uiResponse.replace(/[\s\S]*?```json/i, "").replace(/```[\s\S]*/i, "").trim());
  }

  // 3. ENFORCE PRESET (The "Boutique" Fix)
  const chosenKey = uiRaw.theme?.preset || "modernSaaS";
  const baseTheme = (THEME_PRESETS as any)[chosenKey];
  
  if (baseTheme) {
    console.log(`🎯 Preset Matched: "${chosenKey}". Injecting source colors...`);
  } else {
    console.warn(`⚠️ Preset "${chosenKey}" not found in library. Falling back to modernSaaS.`);
  }

  const baseThemeToUse = baseTheme || THEME_PRESETS["modernSaaS"];

  // Merge LLM design with our Preset Source of Truth
  const finalTheme = {
    ...baseThemeToUse,
    ...uiRaw.theme,
    colors: baseThemeToUse.colors, // OVERRIDE with actual preset colors from theme-presets.ts
  };

  console.log(`🎨 Final Theme Strategy: ${finalTheme.preset} | Font: ${finalTheme.fontStyle} | Radius: ${finalTheme.borderRadius}`);

  const BrandSchema = z.object({
    theme: ThemeSchema,
    header: HeaderSchema,
    footer: FooterSchema,
  });

  const validatedUi = await validate_and_repair(
    {
      theme: finalTheme,
      header: uiRaw.header,
      footer: uiRaw.footer,
    },
    BrandSchema,
    "Global Branding (Theme, Header, Footer)"
  );

  return {
    ...validatedUi,
    sitemap: structure.sitemap,
    sitePlan: structure.sitePlan,
    soul: uiRaw.soul || "Professional and modern."
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
