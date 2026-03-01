/**
 * SITE STRUCTURE (Layout Map)
 *
 * This file serves as the "Engine's Brain" for layout and surgical updates.
 * It tracks the order of nodes for every page without the heavy props data.
 */

export interface SiteStructure {
  [path: string]: string[]; // Map of Page Path -> Ordered Node IDs
}

export const siteStructure: SiteStructure = {
  "/": ["hero_home", "services_home", "contact_home"],
  "/about": ["story", "philosophy", "team", "services", "visit"],
  "/services/emergency": [
    "hero_main",
    "services_grid",
    "contact_section",
    "testimonials_grid",
    "philosophy",
  ],
};
