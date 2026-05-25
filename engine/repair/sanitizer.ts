import { repair_icons_recursive } from "./icon_repairer";

/**
 * PROPSITE REFINERY: Programmatic Structural Repair
 * 
 * This module handles "post-hoc" fixes for LLM hallucinations 
 * that are easier to fix with code than with prompting.
 */

export function refine_page(
  page: any,
  themePreset?: string,
  pagePath?: string,
): any {
  if (!page || typeof page !== "object") return page;

  // Deep clone to avoid mutation issues
  const refined = JSON.parse(JSON.stringify(page));

  const isLuxury = [
    "plumNoir",
    "elegantMinimal",
    "champagnePearl",
    "boutiqueAtelier",
  ].includes(themePreset || "");

  // --- SYSTEMATIC EMPTY SECTION REMOVAL (Permutation Check) ---
  const pruneEmptySections = (pageData: any) => {
    if (!pageData.sections || !pageData.sectionOrder) return;
    const toRemove: string[] = [];

    for (const sectionId of pageData.sectionOrder) {
      const section = pageData.sections[sectionId];
      if (!section || !section.props) continue;

      // Logic: If any of these content arrays exist but are empty, the section is broken.
      const contentKeys = ["items", "blocks", "images", "categories"];
      const isEmpty = contentKeys.some((key) => {
        const val = section.props[key];
        return Array.isArray(val) && val.length === 0;
      });

      if (isEmpty) {
        toRemove.push(sectionId);
        console.log(
          `🧹 Refinery: Pruning empty section '${sectionId}' (${section.type}) on page ${pagePath || "unknown"}`,
        );
      }
    }

    for (const id of toRemove) {
      delete pageData.sections[id];
      pageData.sectionOrder = pageData.sectionOrder.filter((i: string) => i !== id);
    }
  };

  // 1. First pass: Catch already empty sections
  pruneEmptySections(refined);

  const walk = (obj: any) => {
    if (!obj || typeof obj !== "object") return;

    for (const key in obj) {
      const val = obj[key];

      // 1. RECURSIVE WALK
      if (val && typeof val === "object") {
        walk(val);
      }

      // 2. COLUMN REFINERY (Flatten Singletons)
      if (val && val.type === "columns" && Array.isArray(val.items)) {
        // Filter out empty items (no blocks)
        val.items = val.items.filter(
          (item: any) =>
            item && Array.isArray(item.blocks) && item.blocks.length > 0,
        );

        // If only 1 column remains in a layout meant for many, flatten it
        if (
          val.items.length === 1 &&
          ["split", "3-col", "4-col"].includes(val.layout)
        ) {
          const innerBlocks = val.items[0].blocks;
          console.log(
            `🧹 Refinery: Flattening singleton ${val.layout} into ${innerBlocks.length} blocks`,
          );

          if (innerBlocks.length === 1) {
            Object.assign(val, innerBlocks[0]);
          } else {
            val.type = "container";
            val.blocks = innerBlocks;
            val.variant = "default";
            val.position = "relative";
            delete val.items;
            delete val.layout;
          }
        }
      }

      // 2.5 SMART ASPECT RATIO LOGIC FOR SPLIT COLUMNS
      if (val && val.type === "columns" && val.layout === "split" && Array.isArray(val.items)) {
        const calculateTextLength = (blocks: any[]): number => {
          let length = 0;
          for (const block of blocks) {
            if (block.type === "text" && block.content) length += block.content.length;
            else if (block.type === "heading" && block.text) length += block.text.length;
            else if (block.type === "list" && block.items) length += block.items.join(" ").length;
          }
          return length;
        };

        const findImageBlock = (blocks: any[]) => blocks.find((b: any) => b.type === "image");

        // Iterate through items in pairs (0 & 1, 2 & 3, etc.)
        for (let i = 0; i < val.items.length; i += 2) {
          if (i + 1 >= val.items.length) break; // Incomplete pair

          const col1 = val.items[i]?.blocks || [];
          const col2 = val.items[i + 1]?.blocks || [];

          const col1TextLen = calculateTextLength(col1);
          const col2TextLen = calculateTextLength(col2);
          const col1Image = findImageBlock(col1);
          const col2Image = findImageBlock(col2);

          if (col1TextLen > 0 && col2Image && !findImageBlock(col1)) {
            if (col1TextLen < 250) col2Image.aspect = "video";
            else if (col1TextLen < 500) col2Image.aspect = "square";
            else col2Image.aspect = "portrait";
            console.log(`⚖️  Auto-balanced image aspect to '${col2Image.aspect}' based on text length (${col1TextLen} chars) in row ${i/2}`);
          } else if (col2TextLen > 0 && col1Image && !findImageBlock(col2)) {
            if (col2TextLen < 250) col1Image.aspect = "video";
            else if (col2TextLen < 500) col1Image.aspect = "square";
            else col1Image.aspect = "portrait";
            console.log(`⚖️  Auto-balanced image aspect to '${col1Image.aspect}' based on text length (${col2TextLen} chars) in row ${i/2}`);
          }
        }
      }

      // 3. HERO CTA REFINERY
      if (
        val.type === "hero" &&
        val.props &&
        val.props.ctaLink &&
        val.props.ctaText &&
        pagePath &&
        page.sectionOrder &&
        page.sections
      ) {
        const ctaLink = val.props.ctaLink.toLowerCase();
        if (
          ctaLink === pagePath.toLowerCase() ||
          ctaLink === `${pagePath.toLowerCase()}/`
        ) {
          // Logic for converting self-referencing CTAs to anchors...
          // (Keeping simplified for this cleanup pass)
        }
      }

      // 4. LUXURY ICON STRIPPER
      if (isLuxury) {
        if (val && val.type === "icon") {
          delete obj[key];
        }
        if (val && val.type === "feature" && val.icon) {
          delete val.icon;
        }
      }

      // 5. STRING SANITIZATION
      if (typeof val === "string") {
        const hasHtml = /<[a-z][\s\S]*>/i.test(val);
        if (hasHtml) {
          obj[key] = val.replace(/<[^>]*>?/gm, "");
        }
      }
    }

    // Cleanup empty objects/nulls in arrays
    if (Array.isArray(obj)) {
      for (let i = obj.length - 1; i >= 0; i--) {
        const item = obj[i];
        const isEmptyObject =
          item &&
          typeof item === "object" &&
          !Array.isArray(item) &&
          Object.keys(item).length === 0;
        if (item === undefined || item === null || isEmptyObject) {
          obj.splice(i, 1);
        }
      }
    }
  };

  walk(refined);

  // 2. Second pass: Catch sections that became empty after the walk
  pruneEmptySections(refined);

  return refined;
}

/** Global Refinery for the entire WebsiteConfig */
export function refine_site_config(config: any): any {
  if (!config || typeof config !== "object") return config;

  // Run the icon repairer globally before other checks
  config = repair_icons_recursive(config);

  const globalSingletons = [
    "testimonials",
    "map",
    "form",
    "price-list",
  ];
  const seenSingletons = new Set<string>();

  if (config.pages) {
    const paths = Object.keys(config.pages).sort((a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b);
    });

    for (const path of paths) {
      const page = config.pages[path];
      if (page.sections && page.sectionOrder) {
        for (const sectionId of [...page.sectionOrder]) {
          const section = page.sections[sectionId];
          if (!section) continue;

          // 1. Check top-level section type
          if (globalSingletons.includes(section.type)) {
            if (seenSingletons.has(section.type)) {
              console.log(`🧹 Global Refinery: Removing duplicate singleton '${section.type}' from ${path}`);
              delete page.sections[sectionId];
              page.sectionOrder = page.sectionOrder.filter((id: string) => id !== sectionId);
              continue;
            }
            seenSingletons.add(section.type);
          }

          // 2. Deep check for singleton blocks (like price-list inside blocks)
          if (section.type === "blocks" && section.props?.blocks) {
            const checkBlocks = (blocks: any[]) => {
              for (let i = blocks.length - 1; i >= 0; i--) {
                const b = blocks[i];
                if (!b) continue;
                
                if (globalSingletons.includes(b.type)) {
                    if (seenSingletons.has(b.type)) {
                        console.log(`🧹 Global Refinery: Removing duplicate singleton block '${b.type}' from ${path}::${sectionId}`);
                        blocks.splice(i, 1);
                    } else {
                        seenSingletons.add(b.type);
                    }
                }
                if (b.blocks) checkBlocks(b.blocks);
                if (b.items) b.items.forEach((item: any) => item && item.blocks && checkBlocks(item.blocks));
              }
            };
            checkBlocks(section.props.blocks);
          }
        }
      }
      config.pages[path] = refine_page(config.pages[path], config.theme?.preset, path);
    }
  }
  return config;
}

export function unwrap_page_root(data: any): any {
  if (data.page && data.page.sections) return data.page;
  if (data.pages && typeof data.pages === "object") return Object.values(data.pages)[0];
  return data;
}

export function sanitize_json_structure(data: any): any {
    return refine_page(data);
}
