import { PropSiteEngine } from "../engine/index";

async function testNewBlocks() {
  const engine = new PropSiteEngine();

  console.log("🚀 STARTING GENERATION: Global Luxury Aesthetic Test");

  const bizName = "Aurelius Leather Boutique";
  const bizDesc =
    "Bespoke, hand-crafted leather goods for the modern traveler. Italian calfskin, vegetable-tanned, and made to last a lifetime. Based in Fitzroy, Melbourne.";

  try {
    // We don't provide a manual page plan here - we want to see how the 
    // global design settings (Luxury preset) influence the automatic generation.
    const pageConfig = await engine.createFullPage(
      bizName,
      bizDesc,
      "/collection-v1",
      true, // Use images
      ["/", "/about", "/collection-v1", "/contact"],
      undefined, // No provided design brief, let it generate one based on the luxury theme
      undefined  // No provided page plan, let it decide
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
