import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { getSchemaSection } from "../storage/schema_utils";
import { classify_intent } from "./intent_classifier";
import { z } from "zod";
import { 
  HeroSchema, ServicesSchema, ContactSchema, 
  ContentSchema, TestimonialsSectionSchema, BlockSectionSchema,
  PricingSchema, FormSchema, MapSchema
} from "../../lib/schema";

/**
 * NODE GENERATOR (Surgical)
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
  console.log(`🎯 Chosen Schema: ${schemaCategory}`);

  // 2. STAGE 1: NODE STRATEGY
  console.log("✍️  Stage 1: Node Strategist...");
  const strategistPrompt = loadPrompt("node-strategist")
    .replace("{{BUSINESS}}", businessDescription)
    .replace("{{PATH}}", pagePath)
    .replace("{{GOAL}}", designBrief);

  const nodeBlueprintRaw = await callLLM(strategistPrompt, `You are a content strategist. You have decided to use the ${schemaCategory} component.`);

  // 3. STAGE 2: ASSEMBLY (With Surgical Schema)
  console.log("🛠️  Stage 2: Node Assembler...");
  
  // SURGICAL: Only get the ONE schema we need!
  const surgicalSchema = getSchemaSection([schemaCategory]);

  const assemblerPrompt = loadPrompt("node-assembler")
    .replace("{{PATH}}", pagePath)
    .replace("{{NODE_ID}}", nodeId)
    .replace("{{SCHEMA}}", surgicalSchema)
    .replace("{{ICON_MAP}}", system.iconMap);

  const nodeJsonRaw = await callLLM(`
### INPUTS
Node Blueprint: ${nodeBlueprintRaw}

### TASK: NODE ASSEMBLY
${assemblerPrompt}
  `, "You are a senior developer.");

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
