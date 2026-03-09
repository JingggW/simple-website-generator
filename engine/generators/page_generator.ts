import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { PageSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";
import { getDesignToken } from "../storage/design_utils";

/**
 * PAGE GENERATOR ENGINE
 */

function getSystemContext(): { iconMap: string; structure: string; navigation: string } {
  const iconMapPath = path.join(process.cwd(), "components/ui/IconMap.tsx");
  const structurePath = path.join(process.cwd(), "config/site_structure.ts");
  const sitePath = path.join(process.cwd(), "config/site.json");
  
  const iconMap = fs.existsSync(iconMapPath) ? fs.readFileSync(iconMapPath, "utf-8") : "";
  const structure = fs.existsSync(structurePath) ? fs.readFileSync(structurePath, "utf-8") : "";
  
  let navigation = "No navigation defined.";
  if (fs.existsSync(sitePath)) {
    const site = JSON.parse(fs.readFileSync(sitePath, "utf-8"));
    navigation = JSON.stringify({ header: site.header, footer: site.footer }, null, 2);
  }

  return { iconMap, structure, navigation };
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
  currentSitemap: string[] = [],
  providedDesignBrief?: string // NEW: Optional provided design brief
) {
  console.log(`🚀 Generating Page: ${targetPath}`);
  
  const system = getSystemContext();
  const layoutsMenu = fs.readFileSync(path.join(process.cwd(), "engine/design-library/layouts.md"), "utf-8");

  try {
    /**
     * STAGE 1: CONTENT WRITING
     */
    console.log("✍️  Stage 1: Writing Raw Copy...");
    const contentPrompt = loadPrompt("content-strategist")
      .replace("{{BUSINESS}}", businessName)
      .replace("{{PATH}}", targetPath)
      .replace("{{STRUCTURE}}", `
Current Sitemap: ${currentSitemap.join(", ")}
Full Layout Map: ${system.structure}
Navigation Config:
${system.navigation}

AVAILABLE LAYOUTS:
${layoutsMenu}
`);

    const rawCopy = await callLLM(contentPrompt, "You are a brand storyteller.");
    console.log(`\n--- RAW COPY FOR ${targetPath} ---\n${rawCopy}\n--- END COPY ---\n`);

    /**
     * STAGE 2: DESIGN (Use provided or generate)
     */
    let designBrief = providedDesignBrief;
    if (!designBrief) {
      console.log("🎨 Stage 2: Generating Local UI/UX Design Brief...");
      const uiPrompt = loadPrompt("ui-ux-designer");
      designBrief = await callLLM(`
### USER BUSINESS DESCRIPTION
${description}
### TASK: UI/UX DESIGN
${uiPrompt}
      `, "You are a senior UI/UX designer.");
    } else {
      console.log("🎨 Stage 2: Using Global UI/UX Design Brief.");
    }

    /**
     * STAGE 3: ASSEMBLY
     */
    console.log("🛠️  Stage 3: Assembling JSON...");
    
    let designGuidance = "";
    if (rawCopy.toUpperCase().includes("SPLIT")) designGuidance += getDesignToken("layouts", "SPLIT");
    if (rawCopy.toUpperCase().includes("GRID")) designGuidance += getDesignToken("layouts", "FEATURE_GRID");

    const schema = getSchemaSection([
      "HERO", "SERVICES", "PRICING", "FORM", "MAP", "CONTACT", "CONTENT", "TESTIMONIALS", "BLOCKS", "WEBSITE"
    ]);

    const assemblerPrompt = loadPrompt("page-assembler")
      .replace("{{SCHEMA}}", schema)
      .replace("{{ICON_MAP}}", system.iconMap);

    const finalJsonRaw = await callLLM(`
### DESIGN GUIDANCE
${designGuidance}

### DESIGN BRIEF
${designBrief}

### RAW COPY & NAVIGATION GOALS
${rawCopy}

### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `, "You are a senior frontend developer.");

    const rawJson = finalJsonRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);
    
    return await validate_and_repair(parsed, PageSchema, `Page: ${targetPath}`);

  } catch (error) {
    console.error(`\n❌ Page Generation Failed for ${targetPath}:`, error);
    throw error;
  }
}
