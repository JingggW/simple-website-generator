import "dotenv/config";
import fs from "fs";
import path from "path";
import { generate_full_site_blueprint } from "@/engine/generators/site_architect";

const TEST_CASES = [
  {
    name: "The Daily Grind",
    desc: "A cozy local neighborhood cafe in Point Cook. We serve artisanal coffee, fresh sourdough sandwiches, and homemade pastries. Known for our friendly staff and warm atmosphere.",
  },
  {
    name: "Precision Cuts",
    desc: "A local family-owned hair salon specializing in modern men's and women's haircuts, styling, and color. We pride ourselves on a premium experience without the city prices.",
  },
  {
    name: "Green Edge Lawn Care",
    desc: "Professional residential lawn mowing, edging, and garden maintenance service. Reliable, punctual, and local to the Western suburbs of Melbourne.",
  },
  {
    name: "Pure Bloom Florist",
    desc: "A small boutique flower shop offering seasonal bouquets, indoor plants, and event floral arrangements. Every arrangement is hand-picked and unique.",
  },
  {
    name: "Swift Fix Plumbing",
    desc: "Expert local plumber handling 24/7 emergencies, hot water systems, and leaking taps. Honest pricing and over 10 years of experience in the community.",
  },
];

async function runThemeTest() {
  const timestamp = new Date().toLocaleString();
  let markdown = `# THEME PICKER BATCH TEST RESULTS\n`;
  markdown += `*Generated on: ${timestamp}*\n\n`;
  markdown += `| Business Name | Preset | Mode | Typography | Header Variant |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- |\n`;

  console.log("\n🧪 STARTING THEME PICKER BATCH TEST\n");

  const results = [];

  for (const biz of TEST_CASES) {
    console.log(`🏢 Testing: ${biz.name}...`);

    try {
      const blueprint = await generate_full_site_blueprint(
        biz.name,
        biz.desc,
        "Pick the most thematic preset.",
      );

      results.push({ biz, blueprint });

      markdown += `| **${biz.name}** | \`${blueprint.theme.preset}\` | ${blueprint.theme.mode} | ${blueprint.theme.fontStyle} | ${blueprint.header.variant} |\n`;
    } catch (error) {
      console.error(`❌ Error testing ${biz.name}:`, error);
    }
  }

  markdown += `\n---\n\n## Detailed Design Breakdown\n\n`;

  for (const res of results) {
    const { biz, blueprint } = res;
    const soulText =
      typeof blueprint.soul === "object"
        ? JSON.stringify(blueprint.soul, null, 2)
        : blueprint.soul;

    markdown += `### 🏢 ${biz.name}\n`;
    markdown += `**Description:** ${biz.desc}\n\n`;
    markdown += `#### 💎 Design Decisions\n`;
    markdown += `- **Preset Key:** \`${blueprint.theme.preset}\`\n`;
    markdown += `- **Visual Soul:** ${soulText}\n`;
    markdown += `- **Typography:** ${blueprint.theme.fontStyle} (${blueprint.theme.typographyScale})\n`;
    markdown += `- **Header Style:** \`${blueprint.header.variant}\`\n\n`;

    markdown += `#### 🎨 Color Palette\n`;
    markdown += `| Role | Hex Code | Preview |\n`;
    markdown += `| :--- | :--- | :--- |\n`;
    markdown += `| Primary | \`${blueprint.theme.colors.primary}\` | ![#${blueprint.theme.colors.primary.replace("#", "")}](https://via.placeholder.com/15/${blueprint.theme.colors.primary.replace("#", "")}/000000?text=+) |\n`;
    markdown += `| Background | \`${blueprint.theme.colors.background}\` | ![#${blueprint.theme.colors.background.replace("#", "")}](https://via.placeholder.com/15/${blueprint.theme.colors.background.replace("#", "")}/000000?text=+) |\n`;
    markdown += `| Text | \`${blueprint.theme.colors.text}\` | ![#${blueprint.theme.colors.text.replace("#", "")}](https://via.placeholder.com/15/${blueprint.theme.colors.text.replace("#", "")}/000000?text=+) |\n`;
    markdown += `| Accent | \`${blueprint.theme.colors.accent}\` | ![#${blueprint.theme.colors.accent.replace("#", "")}](https://via.placeholder.com/15/${blueprint.theme.colors.accent.replace("#", "")}/000000?text=+) |\n\n`;

    markdown += `#### 🗺️ Navigation Structure\n`;
    markdown += `- **Header Title (Logo):** ${blueprint.header.title}\n`;
    markdown += `- **Header Links:** ${blueprint.header.links.map((l) => l.label).join(", ")}\n`;
    markdown += `- **Footer Title:** ${blueprint.footer.brand.title}\n\n`;

    markdown += `\n---\n`;
  }

  const outputPath = path.join(process.cwd(), "THEME_TEST_RESULTS_2.md");
  fs.writeFileSync(outputPath, markdown);

  console.log(`\n✅ BATCH TEST COMPLETE.`);
  console.log(`📊 Results saved to: ${outputPath}`);
}

runThemeTest();
