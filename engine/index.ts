import 'dotenv/config';
import { generate_single_page } from "./operations/generate_single_page";
import { generate_and_inject_node } from "./operations/generate_node";
import { inject_page_to_config } from "./operations/inject_page";
import { inject_node_to_config } from "./operations/inject_node";
import { sync_blueprint_to_file } from "./utils/blueprint";

/**
 * PROPSITE ENGINE: ORCHESTRATOR (Mission Control)
 * 
 * This is the primary interface for the Site Factory.
 */

export class PropSiteEngine {
  /**
   * METHOD 1: CREATE FULL PAGE
   * Generates a brand-new page from scratch and injects it into the config.
   */
  async createFullPage(
    businessName: string, 
    description: string, 
    path: string,
    useImageGen: boolean = false
  ) {
    console.log(`\n--- 🏗️  Building Full Page: ${path} ---`);
    
    // 1. Creative: Generate the JSON via LLM Pipeline
    const pageConfig = await generate_single_page(description, businessName, path, useImageGen);

    // 2. Structural: Inject into site.ts
    inject_page_to_config(path, pageConfig);

    // 3. Brain: Sync the site_structure.ts
    sync_blueprint_to_file(path, pageConfig.sectionOrder);

    console.log(`\n✨ Successfully created and deployed ${path} for ${businessName}.`);
    return pageConfig;
  }

  /**
   * METHOD 2: MANUAL NODE INJECTION
   * Surgically adds or updates a single section on an existing page.
   */
  async updatePageNode(
    pagePath: string, 
    nodeId: string, 
    nodeConfig: any, 
    insertAt?: { before?: string; after?: string }
  ) {
    console.log(`\n--- 💉 Surgically Injecting Node: ${nodeId} into ${pagePath} ---`);

    // 1. Structural: Inject node into site.ts
    const newOrder = inject_node_to_config(pagePath, nodeId, nodeConfig, insertAt);

    // 2. Brain: Sync the site_structure.ts
    sync_blueprint_to_file(pagePath, newOrder);

    console.log(`\n✨ Node '${nodeId}' is now live.`);
  }

  /**
   * METHOD 3: AI-GENERATED NODE INJECTION
   * Generates a new node via AI and injects it surgically.
   */
  async createAndInjectNode(
    pagePath: string,
    businessDescription: string,
    nodeId: string,
    designBrief: string,
    insertAt?: { before?: string; after?: string },
    useImageGen: boolean = false
  ) {
    console.log(`\n--- 🪄  AI-Generating and Injecting Node: ${nodeId} ---`);

    // 1. Generate & Inject via our specialized module
    const nodeConfig = await generate_and_inject_node(
      pagePath,
      businessDescription,
      nodeId,
      designBrief,
      insertAt,
      useImageGen
    );
    
    console.log(`\n✨ AI Node '${nodeId}' injected.`);
    return nodeConfig;
  }
}

/**
 * PoC EXECUTION (Example)
 */
async function runPoC() {
  const engine = new PropSiteEngine();

  const business = "Azure Waves Hair Salon";
  const desc = "A full-service plumbing company specializing in emergency repairs, maintenance, and installations for residential and commercial clients. Known for fast response times, expert craftsmanship, and a customer-first approach.";

  // Step 1: Create the target page FIRST
  await engine.createFullPage(business, desc, "/services/emergency", false);

  // Step 2: Surgically inject a specific node
  await engine.createAndInjectNode(
    "/services/emergency",
    desc,
    "philosophy",
    "Create a 'Philosophy' section that shows the commitment of plumber service to quality, reliability, and customer satisfaction.",
    undefined,
    false // Keep images OFF by default to avoid Invalid URL error
  );
}

if (require.main === module) {
  runPoC().catch(console.error);
}
