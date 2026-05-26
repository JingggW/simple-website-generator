import fs from 'fs';
import path from 'path';

const configDir = path.join(process.cwd(), 'config', 'pages');

if (!fs.existsSync(configDir)) {
  console.error("❌ config/pages directory not found.");
  process.exit(1);
}

const files = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(configDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  let changed = false;
  if (data.sections) {
    for (const [id, section] of Object.entries(data.sections)) {
      if ((section as any).type === 'hero') {
        delete data.sections[id];
        data.sectionOrder = data.sectionOrder.filter((o: string) => o !== id);
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Removed hero section(s) from ${file}`);
  }
}
