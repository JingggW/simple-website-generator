export const fontMap: Record<string, string> = {
  sans: "var(--font-sans), ui-sans-serif, system-ui, sans-serif", // Inherit Tailwind's default sans
  serif: "var(--font-serif), ui-serif, Georgia, serif",
  mono: "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
};

export const radiusMap: Record<string, string> = {
  none: "0px",
  sm: "0.125rem",
  md: "0.375rem",
  full: "9999px",
};

// Converts "#ffffff" -> "255 255 255"
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )}`
    : "0 0 0";
};

export const getLuminance = (hex: string) => {
  const rgb = hexToRgb(hex).split(" ").map(Number);
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastRatio = (hex1: string, hex2: string) => {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
