/**
 * UTILITY: Generate a placeholder image URL using LoremFlickr (Reliable for <img> tags)
 */
export function get_placeholder_url(query: string, width: number = 1600, height: number = 900): string {
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "is", "if", "then", "else", "when", 
    "at", "from", "by", "for", "with", "in", "out", "on", "off", "over", "under",
    "your", "yours", "my", "mine", "our", "ours", "their", "theirs", "his", "her", "hers",
    "it", "its", "me", "you", "us", "them", "him", "she", "every", "moment", "elegant",
    "perfect", "discover", "explore", "best", "top", "premium", "bespoke", "custom",
    "experience", "elevate", "modern", "traditional", "artisanal"
  ]);

  const sanitized = query
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ") // Use spaces for better splitting
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word)) // Filter stop words and short words
    .slice(0, 2) // Limit to 2 high-quality keywords
    .join(",");
    
  // Fallback if all words were filtered out
  const finalQuery = sanitized || "business";
    
  return `https://loremflickr.com/${width}/${height}/${finalQuery}`;
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
