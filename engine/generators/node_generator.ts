import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { inject_node_to_config } from "../storage/node_injector";
import { sync_blueprint_to_file } from "../storage/structure_sync";

/**
 * NODE GENERATOR (Surgical)
 * 
 * Generates a single section/node using specialized prompts and injects it.
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

export async function generate_and_inject_node(
  pagePath: string,
  businessDescription: string,
  nodeId: string,
  designBrief: string,
  insertAt?: { before?: string; after?: string },
  useImageGen: boolean = false
) {
  console.log(`🚀 Orchestrating Surgical Node Generation: ${nodeId} for ${pagePath}`);
  console.log(`🖼️  Image Generation: ${useImageGen ? "Enabled" : "Disabled"}`);
  
  const system = getSystemContext();

  /**
   * STAGE 1: NODE STRATEGY (The Copywriter)
   */
  console.log("✍️  Stage 1: Running Node Strategist...");
  const strategistPrompt = loadPrompt("node-strategist");
  const nodeBlueprintRaw = await callLLM(`
### INPUTS
Business: ${businessDescription}
Page Path: ${pagePath}
Design Vibe: ${designBrief}
Node Goal: Generate content for the section with ID "${nodeId}"

### TASK: NODE STRATEGY
${strategistPrompt}
  `, "You are a senior content strategist. Create a high-impact blueprint for a single section.");

  /**
   * STAGE 2: OPTIONAL IMAGE INSERTION
   */
  let finalNodeBlueprint = nodeBlueprintRaw;
  if (useImageGen) {
    console.log("📸 Stage 2: Running Image Inserter...");
    const imagePrompt = loadPrompt("image-inserter");
    const availableAssets = ["hero-plumber.webp", "salon-interior.jpg", "cafe-front.jpg", "team-working.jpg"];
    
    finalNodeBlueprint = await callLLM(`
### INPUTS
Text Blueprint: ${nodeBlueprintRaw}
Available Assets: ${availableAssets.join(", ")}
### TASK: IMAGE INSERTION
${imagePrompt}
    `, "You are a visual editor. Insert image filenames into the blueprint where they make sense.");
  }

  /**
   * STAGE 3: NODE ASSEMBLY (The Developer)
   */
  console.log("🛠️  Stage 3: Running Node Assembler...");
  const assemblerPrompt = loadPrompt("node-assembler")
    .replace("{{SCHEMA}}", system.schema)
    .replace("{{ICON_MAP}}", system.iconMap);

  const nodeJsonRaw = await callLLM(`
### INPUTS
Target Path: ${pagePath}
Design Brief: ${designBrief}
Node Blueprint: ${finalNodeBlueprint}
Target Node ID: ${nodeId}

### TASK: NODE ASSEMBLY
${assemblerPrompt}
  `, "You are a senior frontend developer. Output ONLY the valid JSON object for this single node.");

  try {
    const rawJson = nodeJsonRaw.replace(/```json|```/g, "").trim();
    const nodeConfig = JSON.parse(rawJson);

    // 4. Structural: Inject into site.ts
    const newOrder = inject_node_to_config(pagePath, nodeId, nodeConfig, insertAt);

    // 5. Brain: Sync the blueprint
    sync_blueprint_to_file(pagePath, newOrder);

    console.log(`✅ Node '${nodeId}' generated, injected, and synchronized successfully.`);
    return nodeConfig;
  } catch (error) {
    console.error("❌ Failed to parse or inject node JSON:", error);
    console.log("Raw LLM Output:", nodeJsonRaw);
    throw error;
  }
}
