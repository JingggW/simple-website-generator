import { PropSiteEngine } from "../engine";
import { WebsiteConfig } from "../lib/schema";

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      acc[key.replace("--", "")] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { pagePath, pageName, pageDesc } = args;

  if (!pagePath || !pageName || !pageDesc) {
    console.error(
      '❌ Usage: npx tsx scripts/add-page.ts --pagePath=/about --pageName="About Us" --pageDesc="Our company history and team."',
    );
    process.exit(1);
  }

  console.log(`🚀 Adding new page: ${pageName} (${pagePath})...`);

  const engine = new PropSiteEngine();
  let siteConfig: WebsiteConfig;

  try {
    siteConfig = engine.getSiteConfig();
    if (!siteConfig.header || !siteConfig.pages) {
      throw new Error("Config corrupted");
    }
  } catch (error) {
    console.error("❌ Failed to load config. Attempting self-healing...");
    siteConfig = engine.loadConfigFromDisk();
    engine.setSiteConfig(siteConfig);
    engine.saveConfig();
  }

  // 1. Generate the Page
  const bizDesc = pageDesc || siteConfig.footer.brand.description;

  await engine.createFullPage(
    siteConfig.header.title || "Business",
    bizDesc,
    pagePath,
    false, // useImages
    Object.keys(siteConfig.pages), // sitemap context
    "Professional and modern.", // design brief
    undefined, // Pass undefined to let the AI determine the optimal page structure
    siteConfig.theme?.preset,
  );

  // Reload config after createFullPage persists it
  siteConfig = engine.getSiteConfig();

  // 2. Inject into Navigation Bar
  let linkExists = false;
  const links = siteConfig.header.links || [];

  for (const link of links) {
    if (link.type === "link" && link.href === pagePath) linkExists = true;
    if (link.type === "dropdown") {
      for (const subLink of link.items) {
        if (subLink.href === pagePath) linkExists = true;
      }
    }
  }

  if (!linkExists) {
    console.log(`🧭 Adding '${pageName}' to the main navigation menu...`);
    siteConfig.header.links.push({
      type: "link",
      label: pageName,
      href: pagePath,
    });

    engine.setSiteConfig(siteConfig);
    engine.saveConfig();
  } else {
    console.log(`ℹ️ Link to '${pagePath}' already exists in navigation.`);
  }

  console.log(
    `✅ Page '${pageName}' successfully generated and added to navigation.`,
  );
  console.log(`Run 'npm run dev' to see the changes!`);
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
