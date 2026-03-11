/**
 * UTILITY: Generate a placeholder image URL using LoremFlickr (Reliable for <img> tags)
 * Format: https://loremflickr.com/1600/900/keyword1,keyword2/all
 */
export function get_placeholder_url(query: string, width: number = 1600, height: number = 900): string {
  const sanitized = query
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ",") // Replace special chars with commas
    .split(",")
    .filter(Boolean)
    .slice(0, 2) // Limit to 2 keywords for better relevance
    .join(",");
    
  return `https://loremflickr.com/${width}/${height}/${sanitized}/all`;
}

/**
 * UTILITY: Fill missing images using section content as keywords
 */
export function auto_fill_placeholders(props: any): string | null {
  // Try to find the best keyword source in order of relevance
  // Added props.src to catch descriptive placeholders like "bra-styles-gallery"
  const keywords = props.headline || props.title || props.alt || props.src || "business";
  
  if (typeof keywords === "string") {
    return get_placeholder_url(keywords);
  }
  
  return get_placeholder_url("business");
}
