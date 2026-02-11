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
