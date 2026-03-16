import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { PageSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";
import { repair_icons_recursive } from "../repair/icon_repairer";

/**
 * PAGE GENERATOR ENGINE
 */

function getSystemContext(): {
  structure: string;
  navigation: string;
} {
  const structurePath = path.join(process.cwd(), "config/site_structure.ts");
  const sitePath = path.join(process.cwd(), "config/site.json");

  const structure = fs.existsSync(structurePath)
    ? fs.readFileSync(structurePath, "utf-8")
    : "";

  let navigation = "No navigation defined.";
  if (fs.existsSync(sitePath)) {
    const site = JSON.parse(fs.readFileSync(sitePath, "utf-8"));
    navigation = JSON.stringify(
      { header: site.header, footer: site.footer },
      null,
      2,
    );
  }

  return { structure, navigation };
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
  providedDesignBrief?: string,
  pagePlan?: { type: string; goal: string }[],
  existingPages: Record<string, any> = {}, // NEW: Pass existing pages directly
) {
  console.log(`🚀 Generating Page: ${targetPath}`);

  try {
    /**
     * STAGE 1: CONTENT WRITING
     */
    console.log("✍️  Stage 1: Writing Raw Copy...");

    const usedGlobalSections: string[] = [];
    const pageStructureStrings = Object.entries(existingPages).map(
      ([path, data]: [string, any]) => {
        const sections = Object.values(data.sections || {}).map(
          (s: any) => s.type,
        );
        sections.forEach((type) => {
          if (["form", "map", "testimonials"].includes(type)) {
            usedGlobalSections.push(`${type} (on ${path})`);
          }
        });
        return `${path}: [${(data.sectionOrder || []).join(", ")}]`;
      },
    );

    const generatedMap = `
PAGES GENERATED SO FAR:
${pageStructureStrings.join("\n") || "None."}

GLOBAL SECTIONS ALREADY USED:
${usedGlobalSections.join("\n") || "None yet."}
    `.trim();
    console.log("📊 Current Generated Map:\n", generatedMap);

    const contentPrompt = loadPrompt("content-strategist")
      .replace(/{{BUSINESS}}/g, businessName)
      .replace(/{{PATH}}/g, targetPath)
      .replace(/{{SITEMAP}}/g, currentSitemap.join(", "))
      .replace(/{{GENERATED_MAP}}/g, generatedMap || "None yet.")
      .replace(
        /{{PAGE_PLAN}}/g,
        pagePlan
          ? JSON.stringify(pagePlan, null, 2)
          : "Decide the plan yourself based on the business.",
      );

    const rawCopy = await callLLM(
      contentPrompt,
      "You are a brand storyteller.",
    );

    /**
     * STAGE 2: DESIGN (Use provided or generate)
     */
    let designBrief = providedDesignBrief;
    if (!designBrief) {
      console.log("🎨 Stage 2: Generating Local UI/UX Design Brief...");
      const uiPrompt = loadPrompt("ui-ux-designer");
      designBrief = await callLLM(
        `
### USER BUSINESS NAME AND DESCRIPTION
${businessName}: ${description}
### TASK: UI/UX DESIGN
${uiPrompt}
      `,
        "You are a senior UI/UX designer.",
      );
    } else {
      console.log("🎨 Stage 2: Using Global UI/UX Design Brief.");
    }

    /**
     * STAGE 3: ASSEMBLY
     */
    console.log("🛠️  Stage 3: Assembling JSON...");

    const layoutsLibrary = fs.readFileSync(
      path.join(process.cwd(), "engine/design-library/layouts.md"),
      "utf-8",
    );

    // Surgically select schema tags based on page plan
    const requiredTags = new Set(["PAGE", "BLOCKS", "HERO"]);
    if (pagePlan) {
      pagePlan.forEach((p) => {
        const tag = p.type.toUpperCase();
        if (
          ["FORM", "MAP", "CONTACT", "CONTENT", "TESTIMONIALS"].includes(tag)
        ) {
          requiredTags.add(tag);
        }
      });
    } else {
      // Fallback/Inferred tags
      ["CONTENT", "TESTIMONIALS"].forEach((t) => requiredTags.add(t));
      if (targetPath.includes("contact")) {
        ["FORM", "MAP", "CONTACT"].forEach((t) => requiredTags.add(t));
      }
    }

    const schema = getSchemaSection(Array.from(requiredTags));

    const assemblerPrompt = loadPrompt("page-assembler").replace(
      /{{SCHEMA}}/g,
      schema,
    );

    console.log("📄 Content Prompt (with replacements):\n", contentPrompt);

    const finalJsonRaw = await callLLM(
      `
### LAYOUT PATTERNS & EXAMPLES
${layoutsLibrary}

### DESIGN BRIEF
${designBrief}

### RAW COPY & NAVIGATION GOALS
${rawCopy}

### TASK: PAGE ASSEMBLY
${assemblerPrompt}
    `,
      "You are a senior frontend developer.",
    );

    const rawJson = finalJsonRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);

    const validated = await validate_and_repair(
      parsed,
      PageSchema,
      `Page: ${targetPath}`,
    );

    // Final Post-Processing: Repair Icons
    return repair_icons_recursive(validated);
  } catch (error) {
    console.error(`\n❌ Page Generation Failed for ${targetPath}:`, error);
    throw error;
  }
}
