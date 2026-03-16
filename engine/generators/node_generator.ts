import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { getSchemaSection } from "../storage/schema_utils";
import { getDesignToken } from "../storage/design_utils";
import { classify_intent } from "./intent_classifier";
import { z } from "zod";
import { 
  HeroSchema, ServicesSchema, ContactSchema, 
  ContentSchema, TestimonialsSectionSchema, BlockSectionSchema,
  PricingSchema, FormSchema, MapSchema
} from "../../lib/schema";

/**
 * NODE GENERATOR (Design-Library Aware)
 */

const AnySectionSchema = z.discriminatedUnion("type", [
  HeroSchema,
  ServicesSchema,
  PricingSchema,
  FormSchema,
  MapSchema,
  ContactSchema,
  ContentSchema,
  TestimonialsSectionSchema,
  BlockSectionSchema,
]);

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

export async function generate_node(
  pagePath: string,
  businessDescription: string,
  nodeId: string,
  designBrief: string,
  useImageGen: boolean = false
) {
  console.log(`🚀 Generating JSON for Node: ${nodeId}`);
  const system = getSystemContext();

  // 1. CLASSIFY INTENT
  const schemaCategory = await classify_intent(designBrief);
  
  // 2. STAGE 1: NODE STRATEGY
  // We inject the LIST of available layouts so the strategist can choose one
  const layoutsMenu = fs.readFileSync(path.join(process.cwd(), "engine/design-library/layouts.md"), "utf-8");
  
  const strategistPrompt = loadPrompt("node-strategist")
    .replace(/{{BUSINESS}}/g, businessDescription)
    .replace(/{{PATH}}/g, pagePath)
    .replace(/{{GOAL}}/g, designBrief + `\n\nAVAILABLE LAYOUT PATTERNS:\n${layoutsMenu}`);

  const nodeBlueprintRaw = await callLLM(strategistPrompt, `You are a content strategist. Pick one layout pattern from the menu if using 'blocks'.`);

  // 3. SURGICAL DESIGN TOKEN EXTRACTION
  // We look for which pattern the strategist chose (e.g. "SPLIT" or "FEATURE_GRID")
  let designGuidance = "";
  if (nodeBlueprintRaw.toUpperCase().includes("SPLIT")) {
    designGuidance = getDesignToken("layouts", "SPLIT");
  } else if (nodeBlueprintRaw.toUpperCase().includes("GRID")) {
    designGuidance = getDesignToken("layouts", "FEATURE_GRID");
  }

  // 4. STAGE 2: ASSEMBLY
  const surgicalSchema = getSchemaSection([schemaCategory]);
  const assemblerPrompt = loadPrompt("node-assembler")
    .replace(/{{PATH}}/g, pagePath)
    .replace(/{{NODE_ID}}/g, nodeId)
    .replace(/{{SCHEMA}}/g, surgicalSchema)
    .replace(/{{ICON_MAP}}/g, system.iconMap);

  const nodeJsonRaw = await callLLM(`
### DESIGN GUIDANCE (FOLLOW THIS PATTERN)
${designGuidance}

### CONTENT BLUEPRINT
${nodeBlueprintRaw}

### TASK: NODE ASSEMBLY
${assemblerPrompt}
  `, "You are a senior developer. Use the provided Design Guidance to structure the JSON.");

  try {
    const rawJson = nodeJsonRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);

    return await validate_and_repair(
      parsed,
      AnySectionSchema,
      `Node: ${nodeId}`
    );
  } catch (error) {
    console.error("❌ Node Generation Failed:", error);
    throw error;
  }
}
