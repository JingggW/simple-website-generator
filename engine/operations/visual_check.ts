import { WebsiteConfig } from "../../lib/schema";
import { getContrastRatio } from "../../lib/theme-utils";

/**
 * VISUAL CHECKER
 */

export interface VisualReport {
  themeOverrides: string[];
  contrastWarnings: string[];
}

export function run_visual_check(config: WebsiteConfig): VisualReport {
  const overrides: string[] = [];
  const contrastWarnings: string[] = [];

  // 1. Global Theme Check
  const ratio = getContrastRatio(config.theme.colors.text, config.theme.colors.background);
  if (ratio < 4.5) {
    contrastWarnings.push(`Global: Contrast ratio between text (${config.theme.colors.text}) and background (${config.theme.colors.background}) is only ${ratio.toFixed(2)}:1. (Minimum recommended is 4.5:1)`);
  }

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
    contrastWarnings: contrastWarnings
  };
}
