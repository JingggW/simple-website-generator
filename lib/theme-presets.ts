// We import the Type only, not the config file itself
import type { Theme } from "@/lib/schema";

export const THEME_PRESETS: Record<string, Theme> = {
  modernSaaS: {
    mode: "light",
    colors: {
      primary: "#2563EB", // Blue-600
      secondary: "#475569", // Slate-600
      background: "#FFFFFF", // White
      text: "#0F172A", // Slate-900
    },
    fontStyle: "sans",
    borderRadius: "md",
  },
  earthyOrganic: {
    mode: "light",
    colors: {
      primary: "#059669", // Emerald-600
      secondary: "#D97706", // Amber-600
      background: "#FAFAF9", // Stone-50
      text: "#1C1917", // Stone-900
    },
    fontStyle: "sans",
    borderRadius: "md", // Schema restricted (was lg)
  },
  boldCreative: {
    mode: "light",
    colors: {
      primary: "#E11D48", // Rose-600
      secondary: "#4F46E5", // Indigo-600
      background: "#F8FAFC", // Slate-50
      text: "#020617", // Slate-950
    },
    fontStyle: "sans",
    borderRadius: "none",
  },
  elegantMinimal: {
    mode: "light",
    colors: {
      primary: "#18181B", // Zinc-900
      secondary: "#71717A", // Zinc-500
      background: "#FFFFFF", // White
      text: "#27272A", // Zinc-800
    },
    fontStyle: "serif",
    borderRadius: "sm",
  },

  // --- New 4 ---
  corporateTrust: {
    mode: "light",
    colors: {
      primary: "#0F172A", // Slate-900
      secondary: "#64748B", // Slate-500
      background: "#F1F5F9", // Slate-100
      text: "#334155", // Slate-700
    },
    fontStyle: "sans",
    borderRadius: "md",
  },
  sunsetWarmth: {
    mode: "light",
    colors: {
      primary: "#EA580C", // Orange-600
      secondary: "#CA8A04", // Yellow-600
      background: "#FFF7ED", // Orange-50
      text: "#431407", // Orange-950
    },
    fontStyle: "sans",
    borderRadius: "md", // Schema restricted (was xl)
  },
  cyberDark: {
    mode: "dark", // Intentionally Dark Mode
    colors: {
      primary: "#D946EF", // Fuchsia-500
      secondary: "#8B5CF6", // Violet-500
      background: "#09090B", // Zinc-950
      text: "#E4E4E7", // Zinc-200
    },
    fontStyle: "mono",
    borderRadius: "none",
  },
  softPastel: {
    mode: "light",
    colors: {
      primary: "#8B5CF6", // Violet-500
      secondary: "#EC4899", // Pink-500
      background: "#FDF4FF", // Fuchsia-50
      text: "#4C1D95", // Violet-900
    },
    fontStyle: "serif",
    borderRadius: "full", // "Bubble" like buttons
  },
};

export const PRESET_KEYS = Object.keys(
  THEME_PRESETS
) as (keyof typeof THEME_PRESETS)[];
