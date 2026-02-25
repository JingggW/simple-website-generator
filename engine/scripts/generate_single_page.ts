import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";

/**
 * PAGE GENERATOR ENGINE
 * 
 * Orchestrates: 
 * UI/UX Designer -> Content Strategist -> Page Assembler
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

async function generate_single_page(description: string, businessName: string, targetPath: string = "/") {
  console.log(`🚀 Orchestrating Page Generation for: ${businessName} (${targetPath})`);
  
  const system = getSystemContext();

  try {
    /**
     * STAGE 1: UI/UX DESIGN (Visual Identity)
     */
    console.log("🎨 Stage 1: Running UI/UX Designer...");
    const uiPrompt = loadPrompt("ui-ux-designer");
    const designBrief = await callLLM(`
### USER BUSINESS DESCRIPTION
${description}

### TASK: UI/UX DESIGN
${uiPrompt}
    `, "You are a senior UI/UX designer. Output a concise visual brand identity brief.");
    console.log("   -> Design Brief Generated.");

    /**
     * STAGE 2: CONTENT STRATEGY (Copy & Structure)
     */
    console.log("✍️  Stage 2: Running Content Strategist...");
    const contentPrompt = loadPrompt("content-strategist");
    const contentBlueprint = await callLLM(`
### INPUTS
Business: ${description}
Page Path: ${targetPath}
Design Vibe: 
${designBrief}

### TASK: CONTENT STRATEGY
${contentPrompt}
    `, "You are a senior content strategist. Output a detailed page blueprint including sections and all copy.");
    console.log("   -> Content Blueprint Generated.");

    /**
     * STAGE 3: CODE ASSEMBLY (Final JSON)
     */
    console.log("🛠️  Stage 3: Running Page Assembler...");
    const assemblerPrompt = loadPrompt("page-assembler")
      .replace("{{SCHEMA}}", system.schema)
      .replace("{{ICON_MAP}}", system.iconMap);

    const finalJson = await callLLM(`
### INPUTS
Design Brief: 
${designBrief}

Content Strategy:
${contentBlueprint}

### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `, "You are a senior frontend developer. Output ONLY the valid JSON object. No other text.");
    console.log("   -> Final JSON Assembly Complete.");

    // Parse to ensure it's valid JSON
    const rawJson = finalJson.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);
    
    // Save to Output Folder
    const outputDir = path.join(process.cwd(), "generated", sanitizeFileName(businessName));
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = targetPath === "/" ? "home.json" : `${sanitizeFileName(targetPath)}.json`;
    const outputPath = path.join(outputDir, fileName);
    
    fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2));
    
    console.log(`\n✅ Generation Complete!`);
    console.log(`📂 Saved to: ${outputPath}`);
    
    return parsed;

  } catch (error) {
    console.error("\n❌ Pipeline Failed:", error);
    throw error;
  }
}

// Example Usage
if (require.main === module) {
  const sampleName = "Azure Waves Hair Salon";
  const sampleDescription = "A high-end hair salon in Miami called 'Azure Waves'. Focus on luxury and coastal vibes.";
  generate_single_page(sampleDescription, sampleName, "/about");
}
