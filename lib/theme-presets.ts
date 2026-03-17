// We import the Type only, not the config file itself
import type { Theme } from "./schema";

export const THEME_PRESETS: Record<string, Theme> = {
  modernSaaS: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#2563EB", // Blue-600
      secondary: "#475569", // Slate-600
      background: "#FFFFFF",
      surface: "#F8FAFC",
      muted: "#F1F5F9",
      accent: "#3B82F6",
      text: "#0F172A",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  earthyOrganic: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#059669", // Emerald-600
      secondary: "#D97706", // Amber-600
      background: "#FAFAF9",
      surface: "#F5F5F4",
      muted: "#E7E5E4",
      accent: "#10B981",
      text: "#1C1917",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  boldCreative: {
    mode: "light",
    preset: "brutalist",
    colors: {
      primary: "#E11D48", // Rose-600
      secondary: "#4F46E5", // Indigo-600
      background: "#F8FAFC",
      surface: "#F1F5F9",
      muted: "#E2E8F0",
      accent: "#FB7185",
      text: "#020617",
    },
    fontStyle: "sans",
    typographyScale: "bold",
    borderRadius: "none",
    containerStyle: "outline",
  },
  elegantMinimal: {
    mode: "light",
    preset: "minimal",
    colors: {
      primary: "#18181B", // Zinc-900
      secondary: "#71717A", // Zinc-500
      background: "#FFFFFF",
      surface: "#FAFAFA",
      muted: "#F4F4F5",
      accent: "#27272A",
      text: "#18181B",
    },
    fontStyle: "serif",
    typographyScale: "standard",
    borderRadius: "sm",
    containerStyle: "default",
  },
  corporateTrust: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#0F172A", // Slate-900
      secondary: "#64748B", // Slate-500
      background: "#F1F5F9",
      surface: "#F8FAFC",
      muted: "#E2E8F0",
      accent: "#1E293B",
      text: "#334155",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  sunsetWarmth: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#EA580C", // Orange-600
      secondary: "#CA8A04", // Yellow-600
      background: "#FFF7ED",
      surface: "#FFEDD5",
      muted: "#FED7AA",
      accent: "#F97316",
      text: "#431407",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  cyberDark: {
    mode: "dark",
    preset: "brutalist",
    colors: {
      primary: "#D946EF", // Fuchsia-500
      secondary: "#8B5CF6", // Violet-500
      background: "#09090B",
      surface: "#18181B",
      muted: "#27272A",
      accent: "#A21CAF",
      text: "#E4E4E7",
    },
    fontStyle: "mono",
    typographyScale: "bold",
    borderRadius: "none",
    containerStyle: "outline",
  },
  softPastel: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#8B5CF6", // Violet-500
      secondary: "#EC4899", // Pink-500
      background: "#FDF4FF", // Fuchsia-50
      surface: "#FAE8FF", // Fuchsia-100
      muted: "#F5D0FE", // Fuchsia-200
      accent: "#D946EF", // Fuchsia-500
      text: "#4C1D95", // Violet-900
    },
    fontStyle: "serif",
    typographyScale: "standard",
    borderRadius: "full",
    containerStyle: "default",
  },
  professionalTrust: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#1E40AF", // Blue-800
      secondary: "#64748B", // Slate-500
      background: "#FFFFFF",
      surface: "#F8FAFC",
      muted: "#F1F5F9",
      accent: "#3B82F6", // Blue-500
      text: "#0F172A", // Slate-900
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  modernTech: {
    mode: "dark",
    preset: "modern",
    colors: {
      primary: "#06B6D4", // Cyan-500
      secondary: "#94A3B8", // Slate-400
      background: "#0F172A", // Slate-900
      surface: "#1E293B", // Slate-800
      muted: "#334155", // Slate-700
      accent: "#22D3EE", // Cyan-400
      text: "#F8FAFC", // Slate-50
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "lg",
    containerStyle: "glass",
  },
  ecoGrowth: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#15803D", // Green-700
      secondary: "#B45309", // Amber-700
      background: "#F0FDF4", // Green-50
      surface: "#DCFCE7", // Green-100
      muted: "#BBF7D0", // Green-200
      accent: "#16A34A", // Green-600
      text: "#064E3B", // Emerald-950
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
  warmHospitality: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#9A3412", // Orange-800
      secondary: "#854D0E", // Yellow-800
      background: "#FFF7ED", // Orange-50
      surface: "#FFEDD5", // Orange-100
      muted: "#FED7AA", // Orange-200
      accent: "#EA580C", // Orange-600
      text: "#431407", // Orange-950
    },
    fontStyle: "serif",
    typographyScale: "standard",
    borderRadius: "sm",
    containerStyle: "default",
  },
  industrialSteel: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#374151", // Gray-700
      secondary: "#4B5563", // Gray-600
      background: "#F9FAFB", // Gray-50
      surface: "#F3F4F6", // Gray-100
      muted: "#E5E7EB", // Gray-200
      accent: "#1F2937", // Gray-800
      text: "#111827", // Gray-900
    },
    fontStyle: "mono",
    typographyScale: "standard",
    borderRadius: "none",
    containerStyle: "outline",
  },
  luxuryGold: {
    mode: "light",
    preset: "luxury",
    colors: {
      primary: "#111827", // Gray-900
      secondary: "#854D0E", // Yellow-800
      background: "#FFFFFF",
      surface: "#FAFAF9",
      muted: "#F5F5F4",
      accent: "#A16207", // Yellow-700
      text: "#1C1917", // Stone-900
    },
    fontStyle: "serif",
    typographyScale: "editorial",
    borderRadius: "sm",
    containerStyle: "glass",
  },
  boutiqueAtelier: {
    mode: "light",
    preset: "luxury",
    colors: {
      primary: "#000000",
      secondary: "#1C1917",
      background: "#FFFFFF",
      surface: "#FAFAF9",
      muted: "#F5F5F4",
      accent: "#A16207",
      text: "#111827",
    },
    fontStyle: "serif",
    typographyScale: "editorial",
    borderRadius: "none",
    containerStyle: "outline",
  },
};

export const PRESET_KEYS = Object.keys(
  THEME_PRESETS
) as (keyof typeof THEME_PRESETS)[];
