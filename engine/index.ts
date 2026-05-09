import fs from "fs";
import path from "path";
import "dotenv/config";

// Generators
import {
  generate_full_site_blueprint,
  SiteBlueprint,
} from "./generators/site_architect";
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
import { PageConfig, WebsiteConfig, Theme } from "../lib/schema";

import { refine_site_config } from "../engine/repair/sanitizer";

/**
 * PROPSITE ENGINE: ORCHESTRATOR
 */
export class PropSiteEngine {
  private config: WebsiteConfig;
  private currentBusinessName: string = "default"; // Store current business name
  private sitePlan: Record<string, { type: string; goal: string }[]> = {};
  private currentBlueprint: SiteBlueprint | null = null;
  private jsonPath = path.join(process.cwd(), "config/site.json");
  private tsPath = path.join(process.cwd(), "config/site.ts");
  private structurePath = path.join(process.cwd(), "config/site_structure.ts");
  private failures: { path: string; error: string; timestamp: string }[] = [];

  constructor() {
    this.config = this.loadConfigFromDisk();
  }

  public getSiteConfig(): WebsiteConfig {
    return this.config;
  }

  public setSiteConfig(config: WebsiteConfig): void {
    this.config = config;
  }

  public saveConfig(): void {
    this.persist();
  }

  autoSearchImages(page: PageConfig) {
    console.log("🖼️  Searching for image placeholders...");
    const isPlaceholder = (src: string | undefined) => {
      if (!src || src === "" || src === "#") return true;
      // If it's a URL, it's NOT a placeholder
      if (src.startsWith("http")) return false;
      // If it's a direct local path (starts with /), check if it exists in public/
      if (src.startsWith("/")) {
        return !fs.existsSync(path.join(process.cwd(), "public", src));
      }
      // Everything else (descriptive strings, local filenames without path) is a placeholder to be filled
      return true;
    };

    for (const section of Object.values(page.sections)) {
      const props: any = section.props;

      // Hero image fill
      if (section.type === "hero" && isPlaceholder(props.imageName)) {
        props.imageName = auto_fill_placeholders(props);
      }

      // Form image fill (for split or appointment variants)
      if (section.type === "form" && isPlaceholder(props.imageName)) {
        props.imageName = auto_fill_placeholders(props);
      }

      // Content image fill
      if (section.type === "content" && isPlaceholder(props.imageName)) {
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
            if (b.type === "image-grid" && b.images) {
              b.images.forEach((img: any) => {
                if (isPlaceholder(img.src)) {
                  img.src =
                    auto_fill_placeholders(img) ||
                    auto_fill_placeholders(props);
                }
              });
            }
            if (b.type === "testimonial-card" && isPlaceholder(b.avatar)) {
              b.avatar = auto_fill_placeholders({ ...b, src: b.avatar });
            }
            if (b.type === "columns" && b.items) {
              b.items.forEach((c: any) => fillBlocks(c.blocks));
            }
            if (b.type === "container" && b.blocks) {
              fillBlocks(b.blocks);
            }
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
          // Fix: ONLY update ctaLink if the component actually supports it
          // We check if ctaText exists OR if ctaLink was already there (not just hallucinated by AI)
          if (
            props.ctaText === link.label ||
            (props.ctaLink !== undefined && props.ctaText)
          ) {
            props.ctaLink = fixedHref;
          }

          if (props.blocks) {
            const repairBlocks = (blocks: any[]) => {
              blocks.forEach((b) => {
                if (
                  b.type === "button" &&
                  (b.label === link.label || b.href === link.currentHref)
                )
                  b.href = fixedHref;
                if (b.type === "columns" && b.items)
                  b.items.forEach((c: any) => repairBlocks(c.blocks));
                if (b.type === "container" && b.blocks) repairBlocks(b.blocks);
              });
            };
            repairBlocks(props.blocks);
          }
        }
      }
    }
    this.persist();
  }

  public loadConfigFromDisk(): WebsiteConfig {
    const configDir = path.join(process.cwd(), "config");
    const pagesDir = path.join(configDir, "pages");

    // 1. Try Modular Loading (The new standard)
    if (
      fs.existsSync(path.join(configDir, "theme.json")) &&
      fs.existsSync(pagesDir)
    ) {
      try {
        console.log("📂 Loading modular configuration from config/...");
        const theme = JSON.parse(
          fs.readFileSync(path.join(configDir, "theme.json"), "utf-8"),
        );
        const header = JSON.parse(
          fs.readFileSync(path.join(configDir, "header.json"), "utf-8"),
        );
        const footer = JSON.parse(
          fs.readFileSync(path.join(configDir, "footer.json"), "utf-8"),
        );
        const crm = fs.existsSync(path.join(configDir, "crm.json"))
          ? JSON.parse(
              fs.readFileSync(path.join(configDir, "crm.json"), "utf-8"),
            )
          : {};

        const pages: Record<string, any> = {};
        const pageFiles = fs
          .readdirSync(pagesDir)
          .filter((f) => f.endsWith(".json"));

        for (const file of pageFiles) {
          const pageData = JSON.parse(
            fs.readFileSync(path.join(pagesDir, file), "utf-8"),
          );
          let route = file.replace(".json", "");
          if (route === "home") route = "/";
          else route = `/${route.replace(/-/g, "/")}`;
          pages[route] = pageData;
        }

        return { theme, header, footer, pages, ...crm };
      } catch (e) {
        console.warn(
          "⚠️ Modular config loading failed, falling back to monolith.",
          e,
        );
      }
    }

    // 2. Fallback to Monolithic JSON
    if (fs.existsSync(this.jsonPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.jsonPath, "utf-8"));
      } catch (e) {
        console.warn("⚠️ site.json invalid.");
      }
    }

    // 3. Last Resort: TypeScript Eval
    if (fs.existsSync(this.tsPath)) {
      try {
        const content = fs.readFileSync(this.tsPath, "utf-8");
        const jsonMatch = content.match(
          /siteConfig: WebsiteConfig = ([\s\S]*?);/,
        );
        if (jsonMatch) return eval(`(${jsonMatch[1]})`);
      } catch (e) {
        console.error(
          "❌ Failed to parse siteConfig from config/site.ts using eval.",
        );
        console.error("Eval Error:", e);
      }
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

  public persist(businessName?: string) {
    // RUN FINAL REFINERY CHECK (Prune empty items, ghost blocks, etc.)
    this.config = refine_site_config(this.config);

    const targetName = businessName || this.currentBusinessName;
    const configDir = path.join(process.cwd(), "config");
    const pagesDir = path.join(configDir, "pages");

    // Ensure modular directories exist
    if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

    // 1. Save Modular Components (The new source of truth)
    fs.writeFileSync(
      path.join(configDir, "theme.json"),
      JSON.stringify(this.config.theme, null, 2),
    );
    fs.writeFileSync(
      path.join(configDir, "header.json"),
      JSON.stringify(this.config.header, null, 2),
    );
    fs.writeFileSync(
      path.join(configDir, "footer.json"),
      JSON.stringify(this.config.footer, null, 2),
    );

    if (this.config.crmUrl || this.config.crmSecret) {
      fs.writeFileSync(
        path.join(configDir, "crm.json"),
        JSON.stringify(
          {
            crmUrl: this.config.crmUrl,
            crmSecret: this.config.crmSecret,
          },
          null,
          2,
        ),
      );
    }

    // Save individual pages
    for (const [pagePath, pageData] of Object.entries(this.config.pages)) {
      const fileName =
        pagePath === "/"
          ? "home.json"
          : `${pagePath.replace(/^\//, "").replace(/\//g, "__")}.json`;
      fs.writeFileSync(
        path.join(pagesDir, fileName),
        JSON.stringify(pageData, null, 2),
      );
    }

    // 2. Save Production Monoliths (For Next.js runtime)
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

    // 3. Archiving (Snapshots)
    if (!targetName || targetName === "default") {
      console.warn(
        "⚠️ Skipping saving to generated/[businessName] directory: No specific business name defined.",
      );
      return;
    }

    const sanitize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
    const dir = path.join(process.cwd(), "generated", sanitize(targetName));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, "site_full.json"), jsonContent);
    fs.writeFileSync(
      path.join(dir, "failures.json"),
      JSON.stringify(this.failures, null, 2),
    );

    // Save snapshots of modular files in the archive too
    const genPagesDir = path.join(dir, "pages");
    if (!fs.existsSync(genPagesDir)) fs.mkdirSync(genPagesDir);
    for (const [pagePath, pageData] of Object.entries(this.config.pages)) {
      const fileName =
        pagePath === "/"
          ? "home.json"
          : `${pagePath.replace(/^\//, "").replace(/\//g, "__")}.json`;
      fs.writeFileSync(
        path.join(genPagesDir, fileName),
        JSON.stringify(pageData, null, 2),
      );
    }
  }
  async generateFullWebsite(
    businessName: string,
    description: string,
    instruction: string = "",
  ) {
    console.log(`\n🏗️  CONSTRUCTING SITE: ${businessName}`);
    this.currentBusinessName = businessName;
    this.failures = [];

    // 1. Blueprint Phase (Master Planning)
    const blueprint = await generate_full_site_blueprint(
      businessName,
      description,
      instruction,
    );
    this.currentBlueprint = blueprint;
    this.sitePlan = blueprint.sitePlan;

    this.config.theme = blueprint.theme;
    this.config.header = blueprint.header;
    this.config.footer = blueprint.footer;
    this.config.pages = {};

    const globalDesignBrief = blueprint.soul || "Professional and modern.";

    this.persist();

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
          blueprint.theme?.preset, // Pass preset from blueprint
        );
      } catch (e: any) {
        this.recordFailure(pagePath, e);
        this.persist();
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
            blueprint.theme?.preset,
          );
        } catch (e: any) {
          this.recordFailure(p, e);
        }
      }
    }

    await this.runDesignRepair();

    this.validateSite();
    this.persist(businessName);
    console.log(`\n🎉 SITE CONSTRUCTION FINISHED!`);
  }

  async runDesignRepair() {
    console.log("\n🎨 RUNNING DESIGN AUTO-REPAIR (Golden Rules)...");
    for (const page of Object.values(this.config.pages)) {
      for (const section of Object.values(page.sections)) {
        const props = section.props as any;

        // Rule 1: Whitespace is Luxury (Force padding if none)
        if (props.padding === "none" && section.type !== "map") {
          console.log(`✨ Auto-Fix: Upgrading padding for ${section.type}`);
          props.padding = "md";
        }

        // Rule 2: Force Branding (Logo) consistency
        if (section.type === "hero" && props.headline === "Brand Name") {
          props.headline = this.currentBusinessName;
        }
      }
    }
    this.persist();
  }

  async createFullPage(
    bizName: string,
    desc: string,
    pagePath: string,
    useImages: boolean = false,
    sitemap: string[] = [],
    designBrief?: string,
    pagePlan?: { type: string; goal: string }[],
    themePreset?: string, // Added to accept theme from blueprint
  ) {
    this.currentBusinessName = bizName;
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
      themePreset, // Pass the preset to refinery
    );
    this.autoSearchImages(pageConfig);
    this.config.pages[pagePath] = pageConfig;
    this.persist(bizName);
    return pageConfig;
  }

  async createAndInjectNode(
    pagePath: string,
    bizDesc: string,
    nodeId: string,
    nodeBrief: string,
    bizName?: string,
    useImages: boolean = false,
  ) {
    const section = await generate_node(
      pagePath,
      bizDesc,
      nodeId,
      nodeBrief,
      useImages,
    );
    const page = this.config.pages[pagePath];
    if (!page) throw new Error(`Page ${pagePath} not found.`);

    page.sections[nodeId] = section as any;
    if (!page.sectionOrder.includes(nodeId)) {
      page.sectionOrder.push(nodeId);
    }

    if (useImages) {
      this.autoSearchImages(page);
    }

    this.persist(bizName || this.currentBusinessName);
    return section;
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
      console.warn(
        `♿ A11y Contrast Warnings: ${visual.contrastWarnings.join(", ")}`,
      );

    if (
      integrity.isValid &&
      visual.themeOverrides.length === 0 &&
      visual.contrastWarnings.length === 0
    )
      console.log("✅ Audit Passed.");
  }
}

async function runPoC() {
  const engine = new PropSiteEngine();
  await engine.generateFullWebsite(
    "Growing Money Minds",
    "A financial education platform for kids and teens (ages 7-17). We bridge the gap between childhood curiosity and professional entry through practical financial literacy and career readiness courses like 'Money Foundations' and 'Getting Your First Job'.",
    "Use the 'ecoGrowth' preset with a 'centered' header. Create dedicated pages for 'Courses', 'Coaching', and 'Contact'. On the home page, include a 'Freebies' section using a 'tabs' or 'blocks' layout to show resources for three age groups: 7-9, 10-13, and 14-17 year olds. Emphasize trust, accessibility, and empowerment.",
  );
}

if (require.main === module) {
  runPoC().catch(console.error);
}
