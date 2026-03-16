import { PropSiteEngine } from "../engine/index";

async function testNewBlocks() {
  const engine = new PropSiteEngine();

  console.log("🚀 STARTING GENERATION: Global Luxury Aesthetic Test");

  const bizName = "Aurelius Leather Boutique";
  const bizDesc =
    "Bespoke, hand-crafted leather goods for the modern traveler. Italian calfskin, vegetable-tanned, and made to last a lifetime. Based in Fitzroy, Melbourne.";

  const pagePlan = [
    {
      type: "blocks",
      goal: "A 'Cinematic Hero': Use an image with 'cinematic' aspect ratio and a 'glass' container overlay for the brand intro.",
    },
    {
      type: "blocks",
      goal: "Our Services: A 'minimal' variant price-list showing 'Bespoke Commissions' and 'Restoration Services'.",
    },
    {
      type: "blocks",
      goal: "Client Spotlight: Use a 'testimonial-card' to highlight a premium review from a high-end customer.",
    }
  ];

  try {
    const pageConfig = await engine.createFullPage(
      bizName,
      bizDesc,
      "/collection-v1",
      true, // Use images
      ["/", "/about", "/collection-v1", "/contact"],
      undefined, // Global design brief will be used
      pagePlan
    );

    console.log("\n✨ SUCCESS!");
    console.log(`📄 Page generated: /collection-v1`);
    console.log(
      `📂 Saved to: generated/aurelius-leather-boutique/collection-v1.json`,
    );
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
  }
}

testNewBlocks().catch(console.error);
