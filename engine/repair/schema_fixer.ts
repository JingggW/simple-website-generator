import { ZodSchema } from "zod";
import { callLLM } from "../llmClient";
import fs from "fs";
import path from "path";

/**
 * SCHEMA REPAIR UTILITY
 * 
 * Validates data against a schema. If it fails, calls an LLM to "heal" the data.
 */

export async function validate_and_repair<T>(
  data: any, 
  schema: ZodSchema<T>, 
  contextDescription: string
): Promise<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  // If validation fails, we enter the Repair Loop
  console.log(`⚠️ Validation failed for ${contextDescription}. Attempting self-healing...`);
  console.log(`Errors: ${JSON.stringify(result.error.format(), null, 2)}`);

  const repairPrompt = fs.readFileSync(path.join(process.cwd(), "engine/repair/repair_prompt.md"), "utf-8");
  const schemaSource = fs.readFileSync(path.join(process.cwd(), "lib/schema.ts"), "utf-8");

  const response = await callLLM(`
### CONTEXT
We are generating a website component for: ${contextDescription}

### BROKEN JSON
${JSON.stringify(data, null, 2)}

### SCHEMA DEFINITION
${schemaSource}

### ZOD ERROR MESSAGES
${JSON.stringify(result.error.issues, null, 2)}

### TASK: REPAIR JSON
${repairPrompt}
  `, "You are a schema repair specialist. Output ONLY the fixed JSON object.");

  try {
    const rawJson = response.replace(/```json|```/g, "").trim();
    const healedData = JSON.parse(rawJson);
    
    // Re-validate the healed data
    return schema.parse(healedData);
  } catch (error) {
    console.error(`❌ Self-healing failed for ${contextDescription}:`, error);
    throw new Error(`Critical Schema Error: Could not repair ${contextDescription}`);
  }
}
