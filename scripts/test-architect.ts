import "dotenv/config";
import { generate_full_site_blueprint } from "../engine/generators/site_architect";

async function main() {
  const business =
    process.argv[2] ||
    "Victor Churchill, a luxury butcher shop and grocer in Melbourne with a heritage façade and curved marble dining counter.";
  const instruction =
    process.argv[3] ||
    "Focus on a premium, editorial boutique feel with a dedicated 'Melbourne' page.";

  console.log(`
🔍 TESTING SITE ARCHITECT FOR: "${business}"`);
  console.log(`📝 INSTRUCTIONS: "${instruction}"
`);

  try {
    const blueprint = await generate_full_site_blueprint(business, instruction);

    console.log("🗺️  SITEMAP:");
    console.log(JSON.stringify(blueprint.sitemap, null, 2));

    console.log("📋 SITE PLAN (Sections per Page):");
    console.log(JSON.stringify(blueprint.sitePlan, null, 2));

    console.log("🎨 BRANDING & THEME:");
    console.log(JSON.stringify(blueprint.theme, null, 2));

    console.log("🏠 HEADER:");
    console.log(JSON.stringify(blueprint.header, null, 2));

    console.log("📦 FOOTER:");
    console.log(JSON.stringify(blueprint.footer, null, 2));

    console.log("✅ ARCHITECT TEST COMPLETE.");
  } catch (error) {
    console.error("❌ ARCHITECT TEST FAILED:", error);
  }
}

main();
