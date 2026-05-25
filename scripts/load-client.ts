import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const clientName = args[0];

if (!clientName) {
  console.error("❌ Usage: npx tsx scripts/load-client.ts <client-name>");
  process.exit(1);
}

const sourceDir = path.join(process.cwd(), 'generated', clientName);
const targetDir = path.join(process.cwd(), 'config');

if (!fs.existsSync(sourceDir)) {
  console.error(`❌ Client directory not found: ${sourceDir}`);
  process.exit(1);
}

// Clear current workspace
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

// Copy from generated to workspace
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`✅ Successfully loaded client '${clientName}' into the active workspace (/config).`);
console.log("Run 'npm run dev' to preview.");
