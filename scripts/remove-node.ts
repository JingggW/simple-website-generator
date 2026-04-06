import { PropSiteEngine } from "../engine";
import { callLLM } from "../engine/llmClient";
import fs from "fs";
import path from "path";
import { WebsiteConfig, PageConfig } from "../lib/schema"; // Import necessary types

async function main() {
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace('--', '')] = value;
    return acc;
  }, {} as Record<string, string>);

  const { description } = args;

  if (!description) {
    console.error('❌ Usage: npx tsx scripts/remove-node.ts --description="Remove Our Signature Services section"');
    process.exit(1);
  }

  console.log(`🚀 Attempting to remove section(s) based on: "${description}"`);

  const engine = new PropSiteEngine();
  const siteConfig: WebsiteConfig = engine.getSiteConfig(); // Access siteConfig via public getter

  // --- Step 1: Generate Section Summary for LLM ---
  const sectionSummary: { pagePath: string; nodeId: string; type: string; title?: string; description?: string }[] = [];

  for (const pagePath in siteConfig.pages) {
    const page: PageConfig = siteConfig.pages[pagePath];
    for (const nodeId of page.sectionOrder) {
      const section = page.sections[nodeId];
      if (section) {
        let title: string | undefined;
        let desc: string | undefined;

        // Attempt to extract title/description from common section types
        if ('props' in section) {
            // Check for headline in Hero section
            if (section.type === 'hero' && 'headline' in section.props) {
                title = section.props.headline;
                desc = section.props.subheadline;
            }
            // Check for title/description in other sections
            if ('title' in section.props) {
                title = title || section.props.title; // Use if not already set by hero headline
            }
            if ('description' in section.props) {
                desc = desc || section.props.description; // Use if not already set by hero subheadline
            }
        }
        sectionSummary.push({ pagePath, nodeId, type: section.type });
      }
    }
  }

  const sectionSummaryString = JSON.stringify(sectionSummary, null, 2);
  console.log("🔍 Current Site Sections Summary for LLM:", sectionSummaryString);

  // --- Step 2: Call LLM to Identify Target Node(s) ---
  const identifyPromptPath = path.join(process.cwd(), "engine/prompts/node-identifier.md");
  if (!fs.existsSync(identifyPromptPath)) {
    console.error(`❌ Prompt file not found: ${identifyPromptPath}`);
    process.exit(1);
  }
  const identifyPrompt = fs.readFileSync(identifyPromptPath, "utf-8");

  const llmInput = identifyPrompt
    .replace(/{{USER_DESCRIPTION}}/g, description)
    .replace(/{{SECTION_SUMMARY}}/g, sectionSummaryString);

  console.log("🧠 Calling LLM to identify nodes...");
  const llmResponseRaw = await callLLM(llmInput, "You are a helpful assistant that identifies website sections.");

  let identifiedNodes: { pagePath: string; nodeId: string }[] = [];
  try {
    const rawJson = llmResponseRaw.replace(/```json|```/g, "").trim();
    identifiedNodes = JSON.parse(rawJson);
    if (!Array.isArray(identifiedNodes) || identifiedNodes.some(n => !n.pagePath || !n.nodeId)) {
        throw new Error("LLM response is not a valid array of { pagePath, nodeId } objects.");
    }
  } catch (e) {
    console.error("❌ Failed to parse LLM response for node identification:", e);
    console.error("LLM Raw Response:", llmResponseRaw);
    process.exit(1);
  }

  if (identifiedNodes.length === 0) {
    console.log("✅ No matching section found by the AI. No changes made.");
    process.exit(0);
  }

  console.log("AI identified nodes for removal:", identifiedNodes);

  // --- Step 3: Remove Node(s) from siteConfig ---
  let removedCount = 0;
  for (const { pagePath, nodeId } of identifiedNodes) {
    if (siteConfig.pages[pagePath] && siteConfig.pages[pagePath].sections[nodeId]) {
      delete siteConfig.pages[pagePath].sections[nodeId];
      siteConfig.pages[pagePath].sectionOrder = siteConfig.pages[pagePath].sectionOrder.filter(id => id !== nodeId);
      console.log(`🗑️  Removed section '${nodeId}' from page '${pagePath}'.`);
      removedCount++;
    } else {
      console.warn(`⚠️ Identified node '${nodeId}' on page '${pagePath}' not found in current config. Skipping.`);
    }
  }

  if (removedCount === 0) {
      console.log("✅ No sections were removed. Either none matched the description, or they were already absent.");
      process.exit(0);
  }

  // --- Step 4: Persist Changes ---
  // To use the persist method of PropSiteEngine, we need to ensure the instance holds the modified config.
  // The loadConfigFromDisk() creates a copy, so we need to set it back or modify the original.
  // For simplicity, directly write files for now, or update PropSiteEngine to accept config.
  // However, the persist method in PropSiteEngine relies on 'this.config'.
  // I will make a slight adjustment to PropSiteEngine to allow it to receive config in persist.
  // For now, let's assume we modify `engine.config` directly.
  engine.setSiteConfig(siteConfig); // Directly assign the modified config back to the engine instance

  console.log("💾 Persisting changes...");
  engine.saveConfig(); // The persist method takes an optional businessName, but for removal, it's not strictly needed.

  console.log(`✅ Successfully removed ${removedCount} section(s).`);
  console.log("Run 'npm run dev' to see the changes!");
}

main().catch(error => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});