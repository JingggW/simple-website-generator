import fs from "fs";
import path from "path";
import { callLLM } from "../llmClient";
import { BrokenLink } from "../operations/integrity_check";

export async function repair_link(
  bizDesc: string,
  brokenLink: BrokenLink,
  structureContext: string,
): Promise<string> {
  const promptPath = path.join(
    process.cwd(),
    "engine/prompts/link-repairer.md",
  );
  const prompt = fs
    .readFileSync(promptPath, "utf-8")
    .replace("{{BUSINESS}}", bizDesc)
    .replace("{{LABEL}}", brokenLink.label)
    .replace("{{HREF}}", brokenLink.currentHref || "None")
    .replace("{{LOCATION}}", brokenLink.location)
    .replace("{{STRUCTURE}}", structureContext);

  const response = await callLLM(
    prompt,
    "You are a link repair specialist. Output ONLY the corrected href string.",
  );

  const cleaned = response.trim().replace(/['"`]/g, ""); // Remove quotes if any

  // Validate it's a path, anchor, or protocol
  const isValid =
    cleaned.startsWith("/") ||
    cleaned.startsWith("#") ||
    cleaned.startsWith("mailto:") ||
    cleaned.startsWith("tel:") ||
    cleaned.startsWith("http");

  if (!isValid) {
    console.warn(
      `⚠️ LLM suggested invalid link: "${cleaned}". Falling back to "#".`,
    );
    return "#";
  }

  console.log(`🔗 Repaired Link: "${brokenLink.currentHref}" -> "${cleaned}"`);

  return cleaned;
}
