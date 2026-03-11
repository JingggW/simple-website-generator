import fs from "fs";
import path from "path";
import "dotenv/config";

// Generators
import { generate_full_site_blueprint } from "./generators/site_architect";
import { generate_single_page } from "./generators/page_generator";
import { generate_node } from "./generators/node_generator";
import { repair_link } from "./generators/link_repairer";
import {
  auto_fill_placeholders,
  get_placeholder_url,
} from "./generators/image_searcher";
import { callLLM } from "./llmClient"; // Added for UIUX design

// Operations
import { run_integrity_check } from "./operations/integrity_check";
import { run_visual_check } from "./operations/visual_check";

// Types
import { PageConfig, WebsiteConfig } from "../lib/schema";

/**
 * PROPSITE ENGINE: ORCHESTRATOR
 */
export class PropSiteEngine {
  private config: WebsiteConfig;
  private jsonPath = path.join(process.cwd(), "config/site.json");
  private tsPath = path.join(process.cwd(), "config/site.ts");
  private structurePath = path.join(process.cwd(), "config/site_structure.ts");
  private failures: { path: string; error: string; timestamp: string }[] = [];

  constructor() {
    this.config = this.loadConfigFromDisk();
  }

  autoSearchImages(page: PageConfig) {
    console.log("🖼️  Searching for image placeholders...");
    const isPlaceholder = (src: string | undefined) => {
      if (!src || src === "" || src === "#") return true;
      // If it's a URL or a direct local path (starts with /), it's NOT a placeholder
      if (src.startsWith("http") || src.startsWith("/")) return false;
      // Everything else (descriptive strings, local filenames without path) is a placeholder to be filled
      return true;
    };

    for (const section of Object.values(page.sections)) {
      const props: any = section.props;

      // Hero image fill
      if (section.type === "hero" && isPlaceholder(props.imageName)) {
        props.imageName = auto_fill_placeholders(props);
      }

      // Blocks image fill
      if (section.type === "blocks" && props.blocks) {
        const fillBlocks = (blocks: any[]) => {
          blocks.forEach((b) => {
            if (b.type === "image" && isPlaceholder(b.src)) {
              b.src =
                auto_fill_placeholders(b) || auto_fill_placeholders(props);
            }
            if (b.type === "columns" && b.items)
              b.items.forEach((c: any) => fillBlocks(c.blocks));
          });
        };
        fillBlocks(props.blocks);
      }
    }
  }

  async repairAllLinks(bizDesc: string) {
    console.log("\n🛠️  REPAIRING BROKEN LINKS...");
    const audit = run_integrity_check(this.config);
    if (audit.brokenLinks.length === 0) return;

    const structureContext = fs.readFileSync(this.structurePath, "utf-8");

    for (const link of audit.brokenLinks) {
      console.log(`🔗 Fixing link: "${link.label}" at ${link.location}...`);
      const fixedHref = await repair_link(bizDesc, link, structureContext);

      if (link.location === "header") {
        this.config.header.links?.forEach((l) => {
          if (l.type === "link" && l.label === link.label) l.href = fixedHref;
          if (l.type === "dropdown")
            l.items.forEach((si) => {
              if (si.label === link.label) si.href = fixedHref;
            });
        });
        if (this.config.header.cta?.label === link.label)
          this.config.header.cta.href = fixedHref;
      } else if (link.location === "footer") {
        this.config.footer.columns?.forEach((col) => {
          col.links.forEach((l) => {
            if (l.label === link.label) l.href = fixedHref;
          });
        });
      } else {
        const [pagePath, sectionId] = link.location.split(":::");
        const section = this.config.pages[pagePath]?.sections[sectionId];
        if (section) {
          const props: any = section.props;
          // Fix: Ensure we update ctaLink even if it's currently undefined/empty
          if (
            props.ctaText === link.label ||
            (!props.ctaLink && !props.ctaText)
          ) {
            props.ctaLink = fixedHref;
          }

          if (props.blocks) {
            const repairBlocks = (blocks: any[]) => {
              blocks.forEach((b) => {
                if (b.type === "button" && b.label === link.label)
                  b.href = fixedHref;
                if (b.type === "columns" && b.items)
                  b.items.forEach((c: any) => repairBlocks(c.blocks));
              });
            };
            repairBlocks(props.blocks);
          }
        }
      }
    }
    this.persist();
  }

  private loadConfigFromDisk(): WebsiteConfig {
    if (fs.existsSync(this.jsonPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.jsonPath, "utf-8"));
      } catch (e) {
        console.warn("⚠️ site.json invalid.");
      }
    }
    if (fs.existsSync(this.tsPath)) {
      try {
        const content = fs.readFileSync(this.tsPath, "utf-8");
        const jsonMatch = content.match(
          /siteConfig: WebsiteConfig = ([\s\S]*?);/,
        );
        if (jsonMatch) return eval(`(${jsonMatch[1]})`);
      } catch (e) {}
    }
    return {
      theme: {} as any,
      header: {} as any,
      footer: {} as any,
      pages: {},
    };
  }

  private recordFailure(pagePath: string, error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`\n❌ [FAILURE] Page: ${pagePath} | Error: ${errorMsg}`);
    this.failures.push({
      path: pagePath,
      error: errorMsg,
      timestamp: new Date().toISOString(),
    });
  }

  private persist(businessName: string = "default") {
    const jsonContent = JSON.stringify(this.config, null, 2);
    fs.writeFileSync(this.jsonPath, jsonContent);
    fs.writeFileSync(
      this.tsPath,
      `import { WebsiteConfig } from "@/lib/schema";\n\nexport const siteConfig: WebsiteConfig = ${jsonContent};`,
    );

    const pagesStructure: Record<string, string[]> = {};
    for (const [path, page] of Object.entries(this.config.pages)) {
      pagesStructure[path] = page.sectionOrder;
    }
    const structure = {
      pages: pagesStructure,
      navigation: {
        header: (this.config.header?.links || []).map((l: any) => l.href),
        footer: (this.config.footer?.columns || []).flatMap((c: any) =>
          c.links?.map((l: any) => l.href),
        ),
      },
    };
    fs.writeFileSync(
      this.structurePath,
      `export const siteStructure = ${JSON.stringify(structure, null, 2)};`,
    );

    const sanitize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
    const dir = path.join(process.cwd(), "generated", sanitize(businessName));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, "site_full.json"), jsonContent);
    fs.writeFileSync(
      path.join(dir, "failures.json"),
      JSON.stringify(this.failures, null, 2),
    );

    for (const [pagePath, pageData] of Object.entries(this.config.pages)) {
      const fileName =
        pagePath === "/" ? "home.json" : `${sanitize(pagePath)}.json`;
      fs.writeFileSync(
        path.join(dir, fileName),
        JSON.stringify(pageData, null, 2),
      );
    }
  }

  async generateFullWebsite(businessName: string, description: string, instruction: string = "") {
    console.log(`\n🏗️  CONSTRUCTING SITE: ${businessName}`);
    this.failures = [];

    // 1. Blueprint Phase (Master Planning)
    const blueprint = await generate_full_site_blueprint(description, instruction);
    this.config.theme = blueprint.theme;
    this.config.header = blueprint.header;
    this.config.footer = blueprint.footer;
    this.config.pages = {};

    console.log("🎨 Stage 4: Defining Global UI/UX Design Brief...");
    const uiPrompt = fs.readFileSync(
      path.join(process.cwd(), "engine/prompts/ui-ux-designer.md"),
      "utf-8",
    );
    const globalDesignBrief = await callLLM(
      `
### BUSINESS
${businessName}: ${description}
### THEME COLORS
${JSON.stringify(this.config.theme.colors, null, 2)}
### TASK: UI/UX DESIGN
${uiPrompt}
    `,
      "You are a senior UI/UX designer. Define the global visual style guide.",
    );

    this.persist(businessName);

    // 2. Production Phase (Building Pages based on Blueprint)
    for (const pagePath of blueprint.sitemap) {
      try {
        const pagePlan = blueprint.sitePlan[pagePath];
        await this.createFullPage(
          businessName,
          description,
          pagePath,
          false,
          blueprint.sitemap,
          globalDesignBrief,
          pagePlan,
        );
      } catch (e: any) {
        this.recordFailure(pagePath, e);
        this.persist(businessName);
      }
    }

    // 3. Auto-Repair Loop
    for (let i = 0; i < 2; i++) {
      // Repair existing links first
      await this.repairAllLinks(description);

      const audit = run_integrity_check(this.config);

      // Identify paths that are linked to but don't exist in config.pages
      // We look for broken links where the reason is that the path doesn't exist
      const missingPaths = Array.from(
        new Set(
          audit.brokenLinks
            .filter((bl) => bl.reason.includes("does not exist"))
            .map((bl) => {
              const href = bl.currentHref || "";
              return href.split("#")[0];
            })
            .filter((p) => p.startsWith("/") && !this.config.pages[p]),
        ),
      );

      if (missingPaths.length === 0 && audit.brokenLinks.length === 0) break;

      for (const p of missingPaths) {
        try {
          const pagePlan = blueprint.sitePlan[p] || [
            { type: "hero", goal: `Information about ${p}` },
            { type: "blocks", goal: "Detailed content" },
          ];

          await this.createFullPage(
            businessName,
            description,
            p,
            false,
            blueprint.sitemap,
            globalDesignBrief,
            pagePlan,
          );
        } catch (e: any) {
          this.recordFailure(p, e);
        }
      }
    }

    this.validateSite();
    this.persist(businessName);
    console.log(`\n🎉 SITE CONSTRUCTION FINISHED!`);
  }

  async createFullPage(
    bizName: string,
    desc: string,
    pagePath: string,
    useImages: boolean = false,
    sitemap: string[] = [],
    designBrief?: string,
    pagePlan?: { type: string; goal: string }[],
  ) {
    console.log(`\n--- 🏗️  Building Page: ${pagePath} ---`);

    const pageConfig = await generate_single_page(
      desc,
      bizName,
      pagePath,
      useImages,
      sitemap,
      designBrief,
      pagePlan,
      this.config.pages, // Pass current in-memory pages
    );
    this.autoSearchImages(pageConfig);
    this.config.pages[pagePath] = pageConfig;
    this.persist(bizName);
    return pageConfig;
  }

  validateSite() {
    console.log("\n🔍 RUNNING SITE AUDIT...");
    const integrity = run_integrity_check(this.config);
    const visual = run_visual_check(this.config);

    if (integrity.orphans.length > 0)
      console.warn(`🔗 Orphans: ${integrity.orphans.join(", ")}`);
    if (integrity.deadLinks.length > 0)
      console.warn(`❌ Dead Nav Links: ${integrity.deadLinks.join(", ")}`);
    if (integrity.brokenLinks.length > 0)
      console.warn(`❌ Broken Links: ${integrity.brokenLinks.length}`);
    if (visual.themeOverrides.length > 0)
      console.warn(`🎨 Visual Overrides: ${visual.themeOverrides.length}`);
    if (visual.contrastWarnings.length > 0)
      console.warn(`♿ A11y Contrast Warnings: ${visual.contrastWarnings.join(", ")}`);

    if (integrity.isValid && visual.themeOverrides.length === 0 && visual.contrastWarnings.length === 0)
      console.log("✅ Audit Passed.");
  }
}

async function runPoC() {
  const engine = new PropSiteEngine();
  await engine.generateFullWebsite(
    "Christine Customised Bras Co.",
    "Premium and professionally fit Bra made in house by Christine in Point Cook, Melbourne. Pink and girly, but well-designed.",
  );
}

if (require.main === module) {
  runPoC().catch(console.error);
}
