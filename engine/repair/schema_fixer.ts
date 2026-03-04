import { ZodSchema } from "zod";
import { callLLM } from "../llmClient";
import fs from "fs";
import path from "path";
import { sanitize_json_structure, unwrap_page_root } from "./sanitizer";

/**
 * HYBRID VALIDATE & REPAIR
 */

export async function validate_and_repair<T>(
  data: any, 
  schema: ZodSchema<T>, 
  contextDescription: string
): Promise<T> {
  // --- STAGE 1: Programmatic Sanitize ---
  let cleaned = unwrap_page_root(data);
  cleaned = sanitize_json_structure(cleaned);

  // --- STAGE 2: Validate ---
  const result = schema.safeParse(cleaned);

  if (result.success) {
    return result.data;
  }

  // --- STAGE 3: LLM Repair Loop ---
  console.log(`⚠️  Validation failed for ${contextDescription}. Attempting LLM self-healing...`);
  
  // Format errors for the LLM: "Path: sections.services.props.items -> Message: Expected array, received undefined"
  const errorSummary = result.error.issues.map(issue => 
    `- Path: ${issue.path.join(".")} | Error: ${issue.message}`
  ).join("\n");

  const repairPrompt = fs.readFileSync(path.join(process.cwd(), "engine/repair/repair_prompt.md"), "utf-8");
  const schemaSource = fs.readFileSync(path.join(process.cwd(), "lib/schema.ts"), "utf-8");

  const response = await callLLM(`
### CONTEXT
We are generating a website component for: ${contextDescription}

### BROKEN JSON
${JSON.stringify(cleaned, null, 2)}

### SCHEMA DEFINITION
${schemaSource}

### SPECIFIC ERRORS TO FIX
${errorSummary}

### TASK: REPAIR JSON
${repairPrompt}
  `, "You are a schema repair specialist. Output ONLY the fixed JSON object.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    const healedData = JSON.parse(rawJson);
    
    // Re-validate the healed data (This will throw a final error if still invalid)
    return schema.parse(healedData);
  } catch (error) {
    console.error(`❌ Self-healing failed for ${contextDescription}. The JSON is still invalid.`);
    throw error; 
  }
}
