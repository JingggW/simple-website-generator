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
      "/": ["hero_main","services_grid","testimonials_section","contact_section"],
      "/about": ["brand_story","philosophy","meet_team","our_values","local_commitment","call_to_action"],
  "/services/emergency": [
    "hero_main",
    "services_grid",
    "contact_section",
    "testimonials_grid",
    "philosophy",
  ],
  "/services": ["hero_main","services_grid_01","services_basic_grooming","services_spa_packages","services_specialty","testimonials","contact"],
  "/contact": ["h1_heading","intro_section","contact_details","what_to_expect","contact_form","map_section","reassurance_cta","footer_note"],
};
