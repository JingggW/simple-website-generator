/**
 * SEMANTIC ICON MAPPER
 * 
 * Maps common LLM hallucinations or semantic concepts to valid Lucide icon names.
 */

const SEMANTIC_MAP: Record<string, string> = {
  // Movement & Fitness
  "breathable": "Wind",
  "breathablemesh": "Wind",
  "air": "Wind",
  "ventilation": "Wind",
  "mesh": "Grid",
  "compression": "Shrink",
  "performance": "Zap",
  "durability": "Shield",
  "flexible": "Repeat",
  "stretchy": "Move",
  "quickdry": "Droplets",
  "sweat": "Droplets",
  
  // Business & Shop
  "shop": "ShoppingBag",
  "cart": "ShoppingCart",
  "delivery": "Truck",
  "shipping": "Truck",
  "local": "MapPin",
  "melbourne": "MapPin",
  "australia": "Globe",
  "craftsmanship": "Wrench",
  "handmade": "Scissors",
  "artisanal": "Hammer",
  "design": "PenTool",
  "timber": "Trees",
  "wood": "Trees",
  "bespoke": "Layers",
  "studio": "Home",
  
  // Luxury & Premium
  "heritage": "History",
  "tradition": "History",
  "legacy": "Milestone",
  "fine": "Gem",
  "luxury": "Crown",
  "curated": "Sparkles",
  "collection": "Archive",
  "signature": "CheckCircle",
  "exclusive": "Lock",
  
  // Health & Pet Spa (Your Bubbles & Paws needs)
  "pet": "Dog",
  "dog": "Dog",
  "cat": "Cat",
  "wash": "Bath",
  "bath": "Bath",
  "bubbles": "Droplets",
  "grooming": "Scissors",
  "paw": "Footprints",
  "gentle": "Heart",
  "care": "Heart",
  "organic": "Leaf",
  "natural": "Leaf",
  "wellness": "Activity",
  "meditation": "Wind",
  "yoga": "Zap",
  "practice": "Activity",
  "inclusivity": "Users",
  "strength": "Dumbbell",
  "calm": "Moon",
  "energy": "Zap",
  
  // Tech & Quality
  "innovation": "Lightbulb",
  "quality": "Award",
  "premium": "Crown",
  "certified": "CheckCircle",
  "guarantee": "ShieldCheck",
  "fast": "Zap",
  "reliable": "Shield",
  
  // Contact & Social
  "phone": "Phone",
  "email": "Mail",
  "address": "MapPin",
  "hours": "Clock",
  "parking": "Car",
  "instagram": "Instagram",
  "facebook": "Facebook",
  "twitter": "Twitter",
  
  // Boutique & Salon specific
  "hair": "Scissors",
  "cut": "Scissors",
  "scissors": "Scissors",
  "spa": "Flower2",
  "beauty": "Sparkles",
  "cosmetic": "Sparkles",
  "facial": "User",
  "massage": "Hand",
  "appointment": "Calendar",
  "booking": "CalendarCheck",
};

/**
 * Normalizes a string to PascalCase for Lucide matching
 */
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Repairs a potentially hallucinated icon name
 */
export function repair_icon_name(input: string): string {
  if (!input) return "HelpCircle";

  const normalized = input.toLowerCase().replace(/[^a-z]/g, "");

  // 1. Direct semantic match
  if (SEMANTIC_MAP[normalized]) return SEMANTIC_MAP[normalized];

  // 2. Keyword check
  for (const [key, val] of Object.entries(SEMANTIC_MAP)) {
    if (normalized.includes(key)) return val;
  }

  // 3. Fallback to formatted PascalCase (hope it exists in Lucide)
  return toPascalCase(input);
}

/**
 * RECURSIVE ICON REPAIRER
 *
 * Traverses a JSON object and repairs any 'icon' or 'name' fields within icon blocks.
 */
export function repair_icons_recursive(data: any): any {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map((item) => repair_icons_recursive(item));
  }

  const repaired = { ...data };

  // Handle 'icon' block type
  if (repaired.type === "icon" && typeof repaired.name === "string") {
    repaired.name = repair_icon_name(repaired.name);
  }

  // Handle 'feature' block type
  if (repaired.type === "feature" && typeof repaired.icon === "string") {
    repaired.icon = repair_icon_name(repaired.icon);
  }

  // Handle legacy/other icon fields
  if (repaired.icon && typeof repaired.icon === "string") {
    repaired.icon = repair_icon_name(repaired.icon);
  }

  // Recurse into all properties
  for (const key in repaired) {
    if (typeof repaired[key] === "object") {
      repaired[key] = repair_icons_recursive(repaired[key]);
    }
  }

  return repaired;
}
