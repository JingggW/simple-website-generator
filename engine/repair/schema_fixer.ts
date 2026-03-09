import { ZodSchema } from "zod";
import { callLLM } from "../llmClient";
import fs from "fs";
import path from "path";
import { sanitize_json_structure, unwrap_page_root } from "./sanitizer";

/**
 * HYBRID VALIDATE & REPAIR (with Retry Loop)
 */

export async function validate_and_repair<T>(
  data: any,
  schema: ZodSchema<T>,
  contextDescription: string,
  maxRetries: number = 3,
): Promise<T> {
  let cleaned = unwrap_page_root(data);
  cleaned = sanitize_json_structure(cleaned);

  let currentData = cleaned;
  let lastError: any = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = schema.safeParse(currentData);

    if (result.success) {
      if (attempt > 0)
        console.log(`✅ Self-healing successful on attempt ${attempt + 1}.`);
      return result.data;
    }

    lastError = result.error;
    console.log(
      `⚠️  Validation attempt ${attempt + 1}/${maxRetries} failed for ${contextDescription}.`,
    );

    const errorSummary = result.error.issues
      .map(
        (issue) => `- Path: ${issue.path.join(".")} | Error: ${issue.message}`,
      )
      .join("\n");

    const repairPrompt = fs.readFileSync(
      path.join(process.cwd(), "engine/repair/repair_prompt.md"),
      "utf-8",
    );
    const schemaSource = fs.readFileSync(
      path.join(process.cwd(), "lib/schema.ts"),
      "utf-8",
    );

    const response = await callLLM(
      `
### CONTEXT
We are generating: ${contextDescription} (Attempt ${attempt + 1} of ${maxRetries})

### BROKEN JSON
${JSON.stringify(currentData, null, 2)}

### SCHEMA RULES
${schemaSource}

### SPECIFIC ERRORS TO FIX
${errorSummary}

### TASK: REPAIR JSON
${repairPrompt}
    `,
      "You are a schema repair specialist. Output ONLY the fixed JSON object.",
    );

    try {
      const rawJson = response.replace(/```json|```/g, "").trim();
      currentData = JSON.parse(rawJson);
    } catch (e) {
      console.error(
        `❌ Attempt ${attempt + 1}: LLM returned unparseable JSON.`,
      );
    }
  }

  console.error(
    `❌ Self-healing failed after ${maxRetries} attempts for ${contextDescription}.`,
  );
  throw lastError;
}
