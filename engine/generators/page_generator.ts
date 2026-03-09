import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { PageSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";

/**
 * PAGE GENERATOR ENGINE
 */

function getSystemContext(): { iconMap: string; structure: string } {
  const iconMapPath = path.join(process.cwd(), "components/ui/IconMap.tsx");
  const structurePath = path.join(process.cwd(), "config/site_structure.ts");
  
  const iconMap = fs.existsSync(iconMapPath) ? fs.readFileSync(iconMapPath, "utf-8") : "// No icons defined";
  const structure = fs.existsSync(structurePath) ? fs.readFileSync(structurePath, "utf-8") : "// No existing structure";

  return { iconMap, structure };
}

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_single_page(
  description: string, 
  businessName: string, 
  targetPath: string = "/",
  useImageGen: boolean = false,
  currentSitemap: string[] = [] 
) {
  console.log(`🚀 Generating Page: ${targetPath}`);
  
  const system = getSystemContext();

  try {
    /**
     * STAGE 1: CONTENT WRITING
     */
    const contentPrompt = loadPrompt("content-strategist")
      .replace("{{BUSINESS}}", businessName)
      .replace("{{PATH}}", targetPath)
      .replace("{{STRUCTURE}}", `Current Sitemap: ${currentSitemap.join(", ")}`);

    const rawCopy = await callLLM(contentPrompt, "You are a world-class copywriter.");

    /**
     * STAGE 2: DESIGN
     */
    const uiPrompt = loadPrompt("ui-ux-designer");
    const designBrief = await callLLM(`
### USER BUSINESS DESCRIPTION
${description}
### TASK: UI/UX DESIGN
${uiPrompt}
    `, "You are a senior UI/UX designer.");

    /**
     * STAGE 3: ASSEMBLY
     */
    console.log("🛠️  Stage 3: Assembling JSON...");
    
    // FIXED: Included PRICING, FORM, and MAP
    const schema = getSchemaSection([
      "HERO", "SERVICES", "PRICING", "FORM", "MAP", "CONTACT", "CONTENT", "TESTIMONIALS", "BLOCKS", "WEBSITE"
    ]);

    const assemblerPrompt = loadPrompt("page-assembler")
      .replace("{{SCHEMA}}", schema)
      .replace("{{ICON_MAP}}", system.iconMap);

    const finalJsonRaw = await callLLM(`
### INPUTS
Target Path: ${targetPath}
Design Brief: ${designBrief}
RAW COPY:
${rawCopy}

### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `, "You are a senior frontend developer.");

    const rawJson = finalJsonRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);
    
    return await validate_and_repair(parsed, PageSchema, `Page: ${targetPath}`);

  } catch (error) {
    console.error("\n❌ Page Generation Failed:", error);
    throw error;
  }
}
