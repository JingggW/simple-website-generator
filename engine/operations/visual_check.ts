import { WebsiteConfig } from "../../lib/schema";
import { getContrastRatio, hexToRgbObj, rgbToHsl } from "../../lib/theme-utils";

/**
 * VISUAL CHECKER
 */

export interface VisualReport {
  themeOverrides: string[];
  contrastWarnings: string[];
  spacingWarnings: string[];
  accessibilityWarnings: string[];
}

export function run_visual_check(config: WebsiteConfig): VisualReport {
  const overrides: string[] = [];
  const contrastWarnings: string[] = [];
  const spacingWarnings: string[] = [];
  const accessibilityWarnings: string[] = [];

  // 1. Global Theme Check
  const ratio = getContrastRatio(config.theme.colors.text, config.theme.colors.background);
  if (ratio < 4.5) {
    contrastWarnings.push(`Global: Contrast ratio between text (${config.theme.colors.text}) and background (${config.theme.colors.background}) is only ${ratio.toFixed(2)}:1. (Minimum recommended is 4.5:1)`);
  }

  const isLightMode = config.theme.mode === "light";
  const bgRgb = hexToRgbObj(config.theme.colors.background);
  const bgHsl = rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b);

  if (isLightMode && bgHsl.l < 90) {
    accessibilityWarnings.push(`Light Mode Background: Brightness (${bgHsl.l.toFixed(1)}%) is too low. Expected > 90%.`);
  }

  for (const [path, page] of Object.entries(config.pages)) {
    for (const [id, section] of Object.entries(page.sections)) {
      const props = section.props as any;

      // 2. Padding Check (The Whitespace Rule)
      if (props.padding === "none" && section.type !== "map") {
        spacingWarnings.push(`Page ${path} | Section ${id}: 'padding: none' detected. High-end designs require breathing room.`);
      }

      // 3. Detect Hardcoded Tailwind Colors (common LLM mistake)
      const rawProps = JSON.stringify(props);
      const tailwindColorRegex = /(?:bg|text)-(?:blue|red|green|yellow|zinc|gray|slate|emerald|indigo|violet|purple|pink|cyan|sky|teal|lime|amber|orange)-(?:\d{2,3})/g;
      
      const matches = rawProps.match(tailwindColorRegex);
      if (matches) {
        overrides.push(`Page ${path} | Section ${id}: Found hardcoded colors [${matches.join(", ")}]. Should use tokens.`);
      }

      // 4. Per-Section Contrast (If background is customized)
      if (props.background === "primary" || props.background === "secondary") {
        // Since we now enforce this in SectionRenderer, we just log it here for safety
      }
    }
  }

  return {
    themeOverrides: overrides,
    contrastWarnings: contrastWarnings,
    spacingWarnings: spacingWarnings,
    accessibilityWarnings: accessibilityWarnings
  };
}
