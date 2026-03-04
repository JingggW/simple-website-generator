import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { validate_and_repair } from "../repair/schema_fixer";
import { getSchemaSection } from "../storage/schema_utils";
import { z } from "zod";
import { 
  HeroSchema, ServicesSchema, ContactSchema, 
  ContentSchema, TestimonialsSectionSchema, BlockSectionSchema 
} from "../../lib/schema";

/**
 * NODE GENERATOR (Surgical)
 */

const AnySectionSchema = z.discriminatedUnion("type", [
  HeroSchema,
  ServicesSchema,
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

  const strategistPrompt = loadPrompt("node-strategist");
  const nodeBlueprintRaw = await callLLM(`
### INPUTS
Business: ${businessDescription}
Node ID: ${nodeId}
Design Vibe: ${designBrief}
### TASK: NODE STRATEGY
${strategistPrompt}
  `, "You are a senior content strategist.");

  let finalBlueprint = nodeBlueprintRaw;
  if (useImageGen) {
    const imagePrompt = loadPrompt("image-inserter");
    finalBlueprint = await callLLM(`
### INPUTS
Text Blueprint: ${nodeBlueprintRaw}
Available Assets: ["hero-plumber.webp", "salon-interior.jpg"]
### TASK: IMAGE INSERTION
${imagePrompt}
    `, "You are a visual editor.");
  }

  // SURGICAL EXTRACTION: Get all Section schemas + Block schema
  const schema = getSchemaSection([
    "HERO", "SERVICES", "CONTACT", "CONTENT", "TESTIMONIALS", "BLOCKS"
  ]);

  const assemblerPrompt = loadPrompt("node-assembler")
    .replace("{{SCHEMA}}", schema)
    .replace("{{ICON_MAP}}", system.iconMap);

  const nodeJsonRaw = await callLLM(`
### INPUTS
Target Path: ${pagePath}
Design Brief: ${designBrief}
Node Blueprint: ${finalBlueprint}
Target Node ID: ${nodeId}
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
