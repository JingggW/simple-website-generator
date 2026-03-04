import 'dotenv/config';
import { PropSiteEngine } from '../index';

/**
 * ADD PAGE SCRIPT
 * 
 * Usage: npx tsx engine/operations/add_page.ts "/my-new-path" "Business Name" "Page Description"
 */

async function main() {
  const args = process.argv.slice(2);
  const path = args[0];
  const name = args[1];
  const desc = args[2];

  if (!path || !name || !desc) {
    console.error("❌ Missing arguments. Usage: npx tsx engine/operations/add_page.ts <path> <name> <description>");
    process.exit(1);
  }

  console.log(`🚀 Adding page: ${path} for ${name}...`);
  const engine = new PropSiteEngine();
  
  try {
    await engine.createFullPage(name, desc, path, false);
    console.log(`
✨ Done! Page ${path} is now live.`);
  } catch (error) {
    console.error("❌ Failed to add page:", error);
    process.exit(1);
  }
}

main();
