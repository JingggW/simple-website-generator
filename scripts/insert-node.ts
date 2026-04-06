import fs from "fs";
import path from "path";
import { generate_node } from "../engine/generators/node_generator";
import { WebsiteConfig } from "../lib/schema";
import { PropSiteEngine } from "../engine";
import { callLLM } from "../engine/llmClient";

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      acc[key.replace("--", "")] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { pagePath, nodeId, nodeBrief, position: userPosition } = args;

  if (!pagePath || !nodeId || !nodeBrief) {
    console.error(
      '❌ Usage: npx tsx scripts/insert-node.ts --pagePath=/ --nodeId=new_carousel --nodeBrief="A carousel of our best products" [--position=start|end|before:nodeId|after:nodeId|auto]',
    );
    process.exit(1);
  }

  console.log(`🚀 Inserting node '${nodeId}' into page '${pagePath}'...`);

  const engine = new PropSiteEngine();
  let siteConfig: WebsiteConfig;

  try {
    siteConfig = engine.getSiteConfig();
    // Basic sanity check to see if config loaded correctly
    if (!siteConfig.footer || !siteConfig.pages) {
        throw new Error("Site config is incomplete or corrupted.");
    }
  } catch (error) {
    console.error("❌ Failed to load site configuration. Attempting self-healing (regenerating site.ts from site.json)...");
    console.error("Diagnostic Error:", error);
    
    // Self-healing: Reload from disk (which prefers site.json) and re-persist to fix site.ts
    siteConfig = engine.loadConfigFromDisk();
    engine.setSiteConfig(siteConfig);
    engine.saveConfig();
    console.log("♻️  Site configuration regenerated. Continuing...");
  }

  // 2. Generate the new node from natural language
  const newSection = await generate_node(
    pagePath,
    siteConfig.footer.brand.description ?? "", // Use brand description as business context
    nodeId,
    nodeBrief,
  );

  if (!newSection) {
    console.error("❌ Failed to generate the new node.");
    process.exit(1);
  }

  // 3. Determine insertion position and inject the new node into the site config
  const targetPage = siteConfig.pages[pagePath];
  if (!targetPage) {
    console.error(`❌ Page with path '${pagePath}' not found in siteConfig.`);
    process.exit(1);
  }

  let resolvedPosition: string;

  // --- Generate Section Summary for LLM ---
  const sectionSummary: { nodeId: string; type: string }[] = [];
  if (targetPage) {
    // This check is redundant due to the previous 'if (!targetPage)'
    for (const existingNodeId of targetPage.sectionOrder) {
      const existingSection = targetPage.sections[existingNodeId];
      if (existingSection) {
        sectionSummary.push({
          nodeId: existingNodeId,
          type: existingSection.type,
        });
      }
    }
  }
  const pageStructureString = JSON.stringify(sectionSummary, null, 2);

  if (userPosition && ["start", "end"].includes(userPosition)) {
    resolvedPosition = userPosition;
  } else if (
    userPosition &&
    (userPosition.startsWith("before:") || userPosition.startsWith("after:"))
  ) {
    resolvedPosition = userPosition;
  } else {
    // userPosition is undefined or "auto"
    console.log("🧠 Calling LLM to determine optimal node position...");
    const placerPromptPath = path.join(
      process.cwd(),
      "engine/prompts/node-placer.md",
    );
    if (!fs.existsSync(placerPromptPath)) {
      console.error(`❌ Prompt file not found: ${placerPromptPath}`);
      process.exit(1);
    }
    const placerPrompt = fs.readFileSync(placerPromptPath, "utf-8");

    const llmInput = placerPrompt
      .replace(/{{NODE_BRIEF}}/g, nodeBrief)
      .replace(/{{CURRENT_PAGE_STRUCTURE}}/g, pageStructureString);

    const llmResponseRaw = await callLLM(
      llmInput,
      "You are an expert assistant for website section placement.",
    );

    resolvedPosition = llmResponseRaw.trim(); // LLM will return a string like "start", "end", "after:id"

    // Basic validation for LLM response
    if (
      !["start", "end"].includes(resolvedPosition) &&
      !resolvedPosition.startsWith("before:") &&
      !resolvedPosition.startsWith("after:")
    ) {
      console.warn(
        `⚠️ LLM returned an invalid position: "${resolvedPosition}". Defaulting to "end".`,
      );
      resolvedPosition = "end";
    }
  }
  console.log(`✨ Resolved position for new node: "${resolvedPosition}"`);

  // Add the new section to the 'sections' record
  targetPage.sections[nodeId] = newSection;

  // Add the sectionId to the 'sectionOrder' array based on resolvedPosition
  const currentSectionOrder = targetPage.sectionOrder;
  const newSectionOrder: string[] = [...currentSectionOrder];
  let inserted = false;

  if (resolvedPosition === "start") {
    newSectionOrder.unshift(nodeId);
    inserted = true;
  } else if (resolvedPosition === "end") {
    newSectionOrder.push(nodeId);
    inserted = true;
  } else if (resolvedPosition.startsWith("before:")) {
    const targetId = resolvedPosition.substring("before:".length);
    const index = newSectionOrder.indexOf(targetId);
    if (index !== -1) {
      newSectionOrder.splice(index, 0, nodeId);
      inserted = true;
    }
  } else if (resolvedPosition.startsWith("after:")) {
    const targetId = resolvedPosition.substring("after:".length);
    const index = newSectionOrder.indexOf(targetId);
    if (index !== -1) {
      newSectionOrder.splice(index + 1, 0, nodeId);
      inserted = true;
    }
  }

  if (!inserted) {
    console.warn(
      `⚠️ Could not insert node at resolved position "${resolvedPosition}". Appending to end.`,
    );
    newSectionOrder.push(nodeId); // Fallback to end if targetId not found
  }

  targetPage.sectionOrder = newSectionOrder;

  // 4. Persist the changes
  engine.setSiteConfig(siteConfig);
  engine.saveConfig();

  console.log("✅ Node successfully generated and inserted.");
  console.log(`Run 'npm run dev' to see the changes!`);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
