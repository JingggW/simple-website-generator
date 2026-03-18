/**
 * Utility functions for theme generation and accessibility
 */

export const fontMap: Record<string, string> = {
  sans: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  serif: "var(--font-serif), ui-serif, Georgia, serif",
  mono: "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
  display: "var(--font-display), 'Inter Tight', sans-serif",
};

export const radiusMap: Record<string, string> = {
  none: "0px",
  sm: "0.25rem",
  md: "1rem",
  lg: "2rem",
  full: "9999px",
};

/**
 * Converts a hex color to an RGB string "R G B" for CSS variables
 */
export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )}`
    : "0 0 0";
}

/**
 * For internal JS calculations (returns object)
 */
export function hexToRgbObj(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Converts an RGB object to a hex color
 */
export function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculates the relative luminance of a hex color
 */
export function getLuminance(hex: string) {
  const rgb = hexToRgb(hex).split(" ").map(Number);
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates the contrast ratio between two hex colors
 */
export function getContrastRatio(hex1: string, hex2: string) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Basic RGB to HSL conversion
 */
export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Basic HSL to RGB conversion
 */
export function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Adjusts lightness of a color while keeping its hue and saturation
 */
export function shiftLightness(hex: string, targetLightness: number): string {
  const rgb = hexToRgbObj(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newRgb = hslToRgb(hsl.h, hsl.s, targetLightness);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Generates an "on-brand" high contrast text color for a given background
 */
export function getOnBrandContrastColor(
  primaryHex: string,
  bgHex: string,
  isDarkTheme: boolean
): string {
  const targetContrast = 4.5;
  const currentRatio = getContrastRatio(primaryHex, bgHex);

  // If already high contrast, keep the brand primary color
  if (currentRatio >= targetContrast) return primaryHex;

  // Otherwise, derive a high-contrast version of the primary color
  if (isDarkTheme) {
    // Dark mode: very light version of primary (90-95% lightness)
    return shiftLightness(primaryHex, 92);
  } else {
    // Light mode: very dark version of primary (5-10% lightness)
    return shiftLightness(primaryHex, 8);
  }
}
