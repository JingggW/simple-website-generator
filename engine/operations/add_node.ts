import 'dotenv/config';
import { PropSiteEngine } from '../index';

/**
 * ADD NODE SCRIPT (AI-Powered)
 * 
 * Usage: npx tsx engine/operations/add_node.ts "/path" "node_id" "Business Description" "Section Goal Brief"
 */

async function main() {
  const args = process.argv.slice(2);
  const path = args[0];
  const nodeId = args[1];
  const bizDesc = args[2];
  const nodeBrief = args[3];

  if (!path || !nodeId || !bizDesc || !nodeBrief) {
    console.error("❌ Missing arguments. Usage: npx tsx engine/operations/add_node.ts <path> <nodeId> <bizDesc> <nodeBrief>");
    process.exit(1);
  }

  console.log(`🚀 AI-Generating Node: ${nodeId} for ${path}...`);
  const engine = new PropSiteEngine();
  
  try {
    // Note: We use "default" as bizName for now, or you can add a 5th arg
    await engine.createAndInjectNode(path, bizDesc, nodeId, nodeBrief, undefined, false);
    console.log(`
✨ Done! Section ${nodeId} is now live.`);
  } catch (error) {
    console.error("❌ Failed to add node:", error);
    process.exit(1);
  }
}

main();
