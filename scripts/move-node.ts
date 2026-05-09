import { PropSiteEngine } from "../engine";
import fs from "fs";
import path from "path";

/**
 * MOVE NODE SCRIPT
 * 
 * Usage:
 * npx tsx scripts/move-node.ts --nodeId=my_section --from=/coaching --to=/about [--position=after:some_node_id]
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

  const { nodeId, from, to, position = "end" } = args;

  if (!nodeId || !from || !to) {
    console.error('❌ Usage: npx tsx scripts/move-node.ts --nodeId=section_id --from=/coaching --to=/about [--position=after:node_id]');
    process.exit(1);
  }

  console.log(`🚀 Moving node '${nodeId}' from '${from}' to '${to}'...`);

  const engine = new PropSiteEngine();
  const siteConfig = engine.getSiteConfig();

  const fromPage = siteConfig.pages[from];
  const toPage = siteConfig.pages[to];

  if (!fromPage || !toPage) {
    console.error(`❌ Page path not found (From: ${from}, To: ${to})`);
    process.exit(1);
  }

  const section = fromPage.sections[nodeId];
  if (!section) {
    console.error(`❌ Node '${nodeId}' not found on page '${from}'`);
    process.exit(1);
  }

  // 1. Remove from source
  delete fromPage.sections[nodeId];
  fromPage.sectionOrder = fromPage.sectionOrder.filter(id => id !== nodeId);

  // 2. Insert into destination
  toPage.sections[nodeId] = section;
  
  let inserted = false;
  if (position === "start") {
    toPage.sectionOrder.unshift(nodeId);
    inserted = true;
  } else if (position === "end") {
    toPage.sectionOrder.push(nodeId);
    inserted = true;
  } else if (position.startsWith("after:")) {
    const targetId = position.substring("after:".length);
    const index = toPage.sectionOrder.indexOf(targetId);
    if (index !== -1) {
      toPage.sectionOrder.splice(index + 1, 0, nodeId);
      inserted = true;
    }
  } else if (position.startsWith("before:")) {
    const targetId = position.substring("before:".length);
    const index = toPage.sectionOrder.indexOf(targetId);
    if (index !== -1) {
      toPage.sectionOrder.splice(index, 0, nodeId);
      inserted = true;
    }
  }

  if (!inserted) {
    console.warn(`⚠️ Could not insert at position '${position}'. Appending to end.`);
    toPage.sectionOrder.push(nodeId);
  }

  // 3. Persist
  engine.setSiteConfig(siteConfig);
  engine.saveConfig();

  console.log(`✅ Successfully moved '${nodeId}' to '${to}'.`);
  console.log("Run 'npx tsx scripts/assemble-site.ts' to update production files!");
}

main().catch(console.error);
