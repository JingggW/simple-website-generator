import { PropSiteEngine } from "../engine";
import { WebsiteConfig } from "../lib/schema";

async function main() {
  const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key.replace('--', '')] = value;
    return acc;
  }, {} as Record<string, string>);

  // Accept --pagePath or --path or a positional argument
  let targetPath = args.pagePath || args.path || process.argv[2];

  if (!targetPath) {
    console.error('❌ Error: Page route path is required.');
    console.error('Usage: npx tsx scripts/remove-hero.ts --pagePath=/about');
    console.error('   or: npx tsx scripts/remove-hero.ts /about');
    process.exit(1);
  }

  // Normalize path (ensure leading slash, trim trailing slash for non-root)
  let normalizedPath = targetPath.trim();
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }
  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  const engine = new PropSiteEngine();
  let siteConfig: WebsiteConfig;

  try {
    siteConfig = engine.getSiteConfig();
  } catch (error) {
    console.log("ℹ️ Failed to fetch config from engine. Loading from disk...");
    siteConfig = engine.loadConfigFromDisk();
  }

  const page = siteConfig.pages[normalizedPath];
  if (!page) {
    console.error(`❌ Error: Page with route '${normalizedPath}' not found in the site configuration.`);
    console.error(`Available routes: ${Object.keys(siteConfig.pages).join(', ')}`);
    process.exit(1);
  }

  let heroIds: string[] = [];
  if (page.sections) {
    for (const [id, section] of Object.entries(page.sections)) {
      if (section && section.type === 'hero') {
        heroIds.push(id);
      }
    }
  }

  if (heroIds.length === 0) {
    console.log(`ℹ️ No hero section found on page '${normalizedPath}'. No changes made.`);
    process.exit(0);
  }

  console.log(`🗑️  Found ${heroIds.length} hero section(s) on page '${normalizedPath}': ${heroIds.join(', ')}`);

  // Remove the hero sections from the page config
  for (const id of heroIds) {
    delete page.sections[id];
    page.sectionOrder = page.sectionOrder.filter((item) => item !== id);
  }

  // Update config in the engine and save
  engine.setSiteConfig(siteConfig);
  console.log("💾 Saving configuration changes...");
  engine.saveConfig();

  console.log(`✅ Successfully removed hero section(s) from page '${normalizedPath}'.`);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
