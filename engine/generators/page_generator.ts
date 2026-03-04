import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { PageSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";

/**
 * PAGE GENERATOR ENGINE
 */

function getSystemContext(): { iconMap: string } {
  const iconMapPath = path.join(process.cwd(), "components/ui/IconMap.tsx");
  return {
    iconMap: fs.readFileSync(iconMapPath, "utf-8"),
  };
}

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

export async function generate_single_page(
  description: string, 
  businessName: string, 
  targetPath: string = "/",
  useImageGen: boolean = false
) {
  console.log(`🚀 Orchestrating Page Generation: ${targetPath}`);
  
  const system = getSystemContext();

  try {
    /**
     * STAGE 1: UI/UX DESIGN
     */
    const uiPrompt = loadPrompt("ui-ux-designer");
    const designBrief = await callLLM(`
### USER BUSINESS DESCRIPTION
${description}
### TASK: UI/UX DESIGN
${uiPrompt}
    `, "You are a senior UI/UX designer.");

    /**
     * STAGE 2: CONTENT STRATEGY
     */
    const contentPrompt = loadPrompt("content-strategist");
    const contentBlueprint = await callLLM(`
### INPUTS
Business: ${description}
Page Path: ${targetPath}
Design Vibe: ${designBrief}
### TASK: CONTENT STRATEGY
${contentPrompt}
    `, "You are a senior content strategist.");

    /**
     * STAGE 3: OPTIONAL IMAGE INSERTION
     */
    let finalBlueprint = contentBlueprint;
    if (useImageGen) {
      const imagePrompt = loadPrompt("image-inserter");
      finalBlueprint = await callLLM(`
### INPUTS
Text Blueprint: ${contentBlueprint}
Available Assets: ["hero-plumber.webp", "salon-interior.jpg", "cafe-front.jpg"]
### TASK: IMAGE INSERTION
${imagePrompt}
      `, "You are a visual editor.");
    }

    /**
     * STAGE 4: CODE ASSEMBLY
     */
    console.log("🛠️  Stage 4: Page Assembler...");
    
    // SURGICAL EXTRACTION: Get all Section schemas + Block schema + Website schema
    const schema = getSchemaSection([
      "HERO", "SERVICES", "CONTACT", "CONTENT", "TESTIMONIALS", "BLOCKS", "WEBSITE"
    ]);

    const assemblerPrompt = loadPrompt("page-assembler")
      .replace("{{SCHEMA}}", schema)
      .replace("{{ICON_MAP}}", system.iconMap);

    const finalJsonRaw = await callLLM(`
### INPUTS
Target Path: ${targetPath}
Design Brief: ${designBrief}
Content Strategy (Enhanced): ${finalBlueprint}
### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `, "You are a senior frontend developer. Output ONLY the valid JSON object.");

    const rawJson = finalJsonRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);
    
    // --- SELF-HEALING GUARD ---
    return await validate_and_repair(
      parsed, 
      PageSchema, 
      `Page: ${targetPath}`
    );

  } catch (error) {
    console.error("\n❌ Page Generation Pipeline Failed:", error);
    throw error;
  }
}
