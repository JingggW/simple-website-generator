/**
 * PROPSITE REFINERY: Programmatic Structural Repair
 * 
 * This module handles "post-hoc" fixes for LLM hallucinations 
 * that are easier to fix with code than with prompting.
 */

export function refine_page(page: any, themePreset?: string): any {
  if (!page || typeof page !== "object") return page;

  // Deep clone to avoid mutation issues
  const refined = JSON.parse(JSON.stringify(page));

  const isLuxury = ["plumNoir", "elegantMinimal", "champagnePearl", "boutiqueAtelier"].includes(themePreset || "");

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
        val.items = val.items.filter((item: any) => 
          item && Array.isArray(item.blocks) && item.blocks.length > 0
        );

        // If only 1 column remains in a layout meant for many, flatten it
        if (val.items.length === 1 && ["split", "3-col", "4-col"].includes(val.layout)) {
          const innerBlocks = val.items[0].blocks;
          console.log(`🧹 Refinery: Flattening singleton ${val.layout} into ${innerBlocks.length} blocks`);
          
          // We can't easily "flatten" into the array we are iterating, 
          // but we can transform the 'columns' block into a 'container' 
          // or just the first block if there's only one.
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

      // 3. LUXURY ICON STRIPPER
      if (isLuxury) {
        if (val && val.type === "icon") {
          console.log(`💎 Refinery (Luxury): Removing icon block '${val.name}'`);
          delete obj[key];
        }
        if (val && val.type === "feature" && val.icon) {
          console.log(`💎 Refinery (Luxury): Stripping icon from feature '${val.title}'`);
          delete val.icon;
        }
      }

      // 4. STRING SANITIZATION (Strip Hallucinated HTML)
      if (typeof val === "string") {
        const hasHtml = /<[a-z][\s\S]*>/i.test(val);
        if (hasHtml) {
          obj[key] = val.replace(/<[^>]*>?/gm, '');
        }
      }
    }
    
    // Cleanup: Remove any undefined/null keys created by 'delete' in arrays
    if (Array.isArray(obj)) {
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i] === undefined || obj[i] === null || (typeof obj[i] === "object" && Object.keys(obj[i]).length === 0)) {
          obj.splice(i, 1);
        }
      }
    }
  };

  walk(refined);
  return refined;
}

/** Legacy support */
export function sanitize_json_structure(data: any): any {
  return refine_page(data);
}

export function unwrap_page_root(data: any): any {
  if (data.page && data.page.sections) return data.page;
  if (data.pages && typeof data.pages === "object") return Object.values(data.pages)[0];
  return data;
}
