import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";

/**
 * PAGE GENERATOR ENGINE
 */

function getSystemContext(): { schema: string; iconMap: string } {
  const schemaPath = path.join(process.cwd(), "lib/schema.ts");
  const iconMapPath = path.join(process.cwd(), "components/ui/IconMap.tsx");
  
  return {
    schema: fs.readFileSync(schemaPath, "utf-8"),
    iconMap: fs.readFileSync(iconMapPath, "utf-8"),
  };
}

function loadPrompt(name: string): string {
  const promptPath = path.join(process.cwd(), `engine/prompts/${name}.md`);
  return fs.readFileSync(promptPath, "utf-8");
}

function sanitizeFileName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

export async function generate_single_page(
  description: string, 
  businessName: string, 
  targetPath: string = "/",
  useImageGen: boolean = false
) {
  console.log(`🚀 Orchestrating Page Generation for: ${businessName} (${targetPath})`);
  console.log(`🖼️  Image Generation: ${useImageGen ? "Enabled" : "Disabled"}`);
  
  const system = getSystemContext();

  try {
    /**
     * STAGE 1: UI/UX DESIGN
     */
    console.log("🎨 Stage 1: Running UI/UX Designer...");
    const uiPrompt = loadPrompt("ui-ux-designer");
    const designBrief = await callLLM(`
### USER BUSINESS DESCRIPTION
${description}
### TASK: UI/UX DESIGN
${uiPrompt}
    `, "You are a senior UI/UX designer. Output a concise visual brand identity brief.");

    /**
     * STAGE 2: CONTENT STRATEGY
     */
    console.log("✍️  Stage 2: Running Content Strategist...");
    const contentPrompt = loadPrompt("content-strategist");
    const contentBlueprint = await callLLM(`
### INPUTS
Business: ${description}
Page Path: ${targetPath}
Design Vibe: ${designBrief}
### TASK: CONTENT STRATEGY
${contentPrompt}
    `, "You are a senior content strategist. Output a detailed page blueprint.");

    /**
     * STAGE 3: OPTIONAL IMAGE INSERTION
     */
    let finalBlueprint = contentBlueprint;
    if (useImageGen) {
      console.log("📸 Stage 3: Running Image Inserter...");
      const imagePrompt = loadPrompt("image-inserter");
      // For PoC, we provide a static list of available placeholder assets
      const availableAssets = ["hero-plumber.webp", "salon-interior.jpg", "cafe-front.jpg", "team-working.jpg"];
      
      finalBlueprint = await callLLM(`
### INPUTS
Text Blueprint: ${contentBlueprint}
Available Assets: ${availableAssets.join(", ")}
### TASK: IMAGE INSERTION
${imagePrompt}
      `, "You are a visual editor. Insert image filenames into the blueprint where they make sense.");
    } else {
      console.log("⏭️  Stage 3: Skipping Image Inserter.");
    }

    /**
     * STAGE 4: CODE ASSEMBLY
     */
    console.log("🛠️  Stage 4: Running Page Assembler...");
    const assemblerPrompt = loadPrompt("page-assembler")
      .replace("{{SCHEMA}}", system.schema)
      .replace("{{ICON_MAP}}", system.iconMap);

    const finalJson = await callLLM(`
### INPUTS
Target Path: ${targetPath}
Design Brief: ${designBrief}
Content Strategy (Enhanced): ${finalBlueprint}
### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `, "You are a senior frontend developer. Output ONLY the valid JSON object.");

    const rawJson = finalJson.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);
    
    return parsed;

  } catch (error) {
    console.error("\n❌ Pipeline Failed:", error);
    throw error;
  }
}
