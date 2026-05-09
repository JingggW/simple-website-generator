import fs from "fs";
import path from "path";
import { PropSiteEngine } from "../engine";
import { callLLM } from "../engine/llmClient";
import { WebsiteConfig, PageConfig } from "../lib/schema";

/**
 * CONTENT SWAPPER (Page Text Refiner)
 * 
 * Usage:
 * npx tsx scripts/refine-site-config.ts --pagePath=/about --newBrief="..."
 */

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      acc[key.replace("--", "")] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { pagePath, newBrief } = args;

  if (!pagePath || !newBrief) {
    console.error('❌ Usage: npx tsx scripts/refine-site-config.ts --pagePath=/path --newBrief="Your content instructions"');
    process.exit(1);
  }

  console.log(`🚀 Refining content for page: ${pagePath}...`);

  const engine = new PropSiteEngine();
  const siteConfig = engine.getSiteConfig();

  const targetPage = siteConfig.pages[pagePath];
  if (!targetPage) {
    console.error(`❌ Page not found: ${pagePath}`);
    process.exit(1);
  }

  // 1. Create a lean version of the page for the LLM (Content Context)
  // We only send nodeIds and current props to keep tokens low
  const currentStructure = JSON.stringify(targetPage, null, 2);

  // 2. Load Prompt
  const promptPath = path.join(process.cwd(), "engine/prompts/content-refiner.md");
  const promptTemplate = fs.readFileSync(promptPath, "utf-8");

  const prompt = promptTemplate
    .replace("{{CURRENT_STRUCTURE}}", currentStructure)
    .replace("{{NEW_BRIEF}}", newBrief);

  // 3. Call LLM
  console.log("🧠 Asking AI to rewrite copy...");
  const responseRaw = await callLLM(prompt, "You are a conversion copywriter. Output ONLY valid JSON.");

  try {
    const rawJson = responseRaw.replace(/```json|```/g, "").trim();
    const updatedProps = JSON.parse(rawJson);

    // 4. Surgical Merge
    console.log("🧪 Merging new copy into page configuration...");
    for (const [nodeId, newProps] of Object.entries(updatedProps)) {
      if (targetPage.sections[nodeId]) {
        // Only merge into props
        targetPage.sections[nodeId].props = {
          ...targetPage.sections[nodeId].props,
          ...(newProps as any)
        };
        console.log(` ✅ Updated node: ${nodeId}`);
      }
    }

    // 5. Persist and Assemble
    console.log("💾 Saving changes...");
    engine.setSiteConfig(siteConfig);
    engine.saveConfig();

    // Trigger full assembly to sync production site.ts
    const assemblerPath = path.join(process.cwd(), "scripts/assemble-site.ts");
    // We can just call the engine's persist, which we already did
    
    console.log(`\n✨ Content swap complete for ${pagePath}!`);
    console.log("Run 'npm run dev' to see the new copy.");

  } catch (error) {
    console.error("❌ Content Refinement Failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);
