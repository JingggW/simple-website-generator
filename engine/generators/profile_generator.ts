import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { BusinessProfileSchema } from "../../lib/schema";
import { getSchemaSection } from "../storage/schema_utils";
import { validate_and_repair } from "../repair/schema_fixer";

/**
 * PROFILE GENERATOR
 * 
 * Transforms raw natural language into a structured BusinessProfile.
 */

export async function extract_business_profile(description: string) {
  console.log(`🧠 Extracting structured profile from description...`);

  // 1. Load Prompt
  const promptPath = path.join(process.cwd(), "engine/prompts/profile-extractor.md");
  const promptTemplate = fs.readFileSync(promptPath, "utf-8");

  // 2. Get Schema Reference
  const schemaString = getSchemaSection("INGESTION");

  // 3. Assemble Prompt
  const prompt = promptTemplate
    .replace("{{RAW_DESCRIPTION}}", description)
    .replace("{{SCHEMA}}", schemaString);

  // 4. Call LLM
  const responseRaw = await callLLM(prompt, "You are a professional intake specialist. Output ONLY valid JSON.");

  try {
    const rawJson = responseRaw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(rawJson);

    // 5. Validate and Repair
    return await validate_and_repair(
      parsed,
      BusinessProfileSchema,
      "Business Profile Extraction"
    );
  } catch (error) {
    console.error("❌ Profile Extraction Failed:", error);
    throw error;
  }
}
