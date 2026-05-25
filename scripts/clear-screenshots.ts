import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

if (fs.existsSync(SCREENSHOT_DIR)) {
  const files = fs.readdirSync(SCREENSHOT_DIR);
  
  if (files.length === 0) {
    console.log("✨ Screenshots directory is already empty.");
    process.exit(0);
  }

  console.log(`🗑️  Deleting ${files.length} screenshots...`);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      fs.unlinkSync(path.join(SCREENSHOT_DIR, file));
    }
  }
  
  console.log("✅ All screenshots cleared.");
} else {
  console.log("✨ No screenshots directory found.");
}
