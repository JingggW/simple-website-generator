/**
 * PROPSITE REFINERY: Programmatic Structural Repair
 * 
 * This module handles "post-hoc" fixes for LLM hallucinations 
 * that are easier to fix with code than with prompting.
 */

export function refine_page(page: any, themePreset?: string, pagePath?: string): any {
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

      // 3. HERO CTA REFINERY (Convert self-referencing CTAs to intelligent anchor links)
      if (val.type === "hero" && val.props && val.props.ctaLink && val.props.ctaText && pagePath && page.sectionOrder && page.sections) {
        const ctaLink = val.props.ctaLink.toLowerCase();
        
        if (ctaLink === pagePath.toLowerCase() || ctaLink === `${pagePath.toLowerCase()}/`) {
          const ctaText = val.props.ctaText.toLowerCase();
          let bestMatchAnchor = "";
          let bestMatchScore = -1;

          // Iterate through all section IDs on the current page
          for (const sectionId of page.sectionOrder) {
            const section = page.sections[sectionId];
            if (!section || !section.props) continue;

            const sectionContent = [];
            // Add sectionId to content for matching
            sectionContent.push(sectionId.toLowerCase()); 

            // Add relevant text from the section for matching
            if (section.props.headline) sectionContent.push(section.props.headline.toLowerCase());
            if (section.props.title) sectionContent.push(section.props.title.toLowerCase());
            if (section.props.description) sectionContent.push(section.props.description.toLowerCase());
            
            // For blocks sections, check headings within blocks
            if (section.type === "blocks" && section.props.blocks) {
                const findHeadings = (blocks: any[]) => {
                    for (const b of blocks) {
                        if (!b) continue; // Defensive check for null/undefined blocks
                        if (b.type === "heading" && b.text) sectionContent.push(b.text.toLowerCase());
                        if (b.blocks) findHeadings(b.blocks);
                        if (b.items) b.items.forEach((item: any) => item && item.blocks && findHeadings(item.blocks));
                    }
                };
                findHeadings(section.props.blocks);
            }
            // For services sections, check service titles
            if (section.type === "services" && section.props.items) {
                section.props.items.forEach((item: any) => {
                    if (item.title) sectionContent.push(item.title.toLowerCase());
                });
            }

            // Calculate a score for how well the ctaText matches this section
            let currentScore = 0;
            for (const contentPart of sectionContent) {
                if (ctaText.includes(contentPart)) {
                    currentScore += 2; // Direct inclusion
                }
                // Check for partial keyword matches
                const ctaKeywords = ctaText.split(/\s+/);
                for (const keyword of ctaKeywords) {
                    if (keyword.length > 2 && contentPart.includes(keyword)) {
                        currentScore += 1;
                    }
                }
            }
            
            // Prioritize more specific matches on sectionId
            if (sectionId.toLowerCase().includes(ctaText)) currentScore += 3;

            if (currentScore > bestMatchScore) {
              bestMatchScore = currentScore;
              bestMatchAnchor = sectionId;
            }
          }

          if (bestMatchAnchor && bestMatchScore > 0) { // Only apply if there's a positive match
            val.props.ctaLink = `${pagePath}#${bestMatchAnchor}`;
            console.log(`🔗 Refinery: Converted self-referencing Hero CTA on ${pagePath} ('${val.props.ctaText}') to intelligent anchor: ${val.props.ctaLink}`);
          } else {
            // If no semantic match, remove the link as it's ineffective
            delete val.props.ctaLink; 
            delete val.props.ctaText; // Also remove text if link is gone
            console.log(`🗑️ Refinery: Removed ineffective Hero CTA on ${pagePath} ('${ctaText}') - no clear semantic anchor match.`);
          }
        }
      }


      // Previous rule 3, now 4. LUXURY ICON STRIPPER
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
