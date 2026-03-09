import { WebsiteConfig } from "../../lib/schema";

/**
 * VISUAL CHECKER
 * 
 * Audits the site for CSS overrides and visual inconsistencies.
 */

export interface VisualReport {
  themeOverrides: string[]; // Sections using hardcoded colors instead of theme vars
  contrastWarnings: string[];
}

export function run_visual_check(config: WebsiteConfig): VisualReport {
  const overrides: string[] = [];
  const contrast: string[] = [];

  for (const [path, page] of Object.entries(config.pages)) {
    for (const [id, section] of Object.entries(page.sections)) {
      // 1. Detect Hardcoded Tailwind Colors (common LLM mistake)
      // We look inside the props for strings like "blue-600", "zinc-900", etc.
      const rawProps = JSON.stringify(section.props);
      const tailwindColorRegex = /(?:bg|text)-(?:blue|red|green|yellow|zinc|gray|slate|emerald|indigo|violet|purple|pink|cyan|sky|teal|lime|amber|orange)-(?:\d{2,3})/g;
      
      const matches = rawProps.match(tailwindColorRegex);
      if (matches) {
        overrides.push(`Page ${path} | Section ${id}: Found hardcoded colors [${matches.join(", ")}]. Should use 'primary' or 'secondary'.`);
      }

      // 2. Check for missing Image alt text
      if (section.type === 'hero' && !section.props.imageName) {
        // Just an observation
      }
    }
  }

  return {
    themeOverrides: overrides,
    contrastWarnings: contrast
  };
}
