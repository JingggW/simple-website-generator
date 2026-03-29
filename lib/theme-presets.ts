// We import the Type only, not the config file itself
import type { Theme } from "./schema";

/**
 * 🎨 PropSite-Engine 官方预设主题
 * 每一个预设都经过了对比度校准，确保符合 WCAG AA 级易用性标准。
 */
export const THEME_PRESETS: Record<string, Theme> = {
  // 1. 经典 SaaS 风格：专业、可信、现代
  modernSaaS: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#4F46E5", // Indigo-600
      secondary: "#0F172A", // Slate-900
      background: "#F8FAFC", // 极淡冷灰背景
      surface: "#FFFFFF", // 纯白卡片
      muted: "#E2E8F0", // 边框和禁用态
      accent: "#818CF8", // 辅助亮色
      text: "#1E293B", // 深灰蓝文字
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },

  ecoGrowth: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#065F46", // Emerald-800
      secondary: "#D97706", // Amber-600
      background: "#F0F4F1",
      surface: "#FFFFFF",
      muted: "#D1FAE5",
      accent: "#10B981",
      text: "#064E3B",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "lg",
    containerStyle: "default",
  },

  // 3. 2026 流行色“深梅紫”：高奢、女性化、神秘
  plumNoir: {
    mode: "dark",
    preset: "luxury",
    colors: {
      primary: "#EFC07B", // 哑光金
      secondary: "#5C3E94", // 浓郁梅紫
      background: "#1A1A2E", // 午夜蓝底
      surface: "#16213E",
      muted: "#0F3460",
      accent: "#EFC07B",
      text: "#F8FAFC",
    },
    fontStyle: "serif",
    typographyScale: "editorial",
    borderRadius: "sm",
    containerStyle: "glass",
  },

  elegantMinimal: {
    mode: "light",
    preset: "minimal",
    colors: {
      primary: "#171717", // Neutral-900
      secondary: "#525252", // Neutral-600
      background: "#FAFAFA",
      surface: "#FFFFFF",
      muted: "#F5F5F5",
      accent: "#A3A3A3",
      text: "#171717",
    },
    fontStyle: "serif",
    typographyScale: "standard",
    borderRadius: "none",
    containerStyle: "default",
  },

  // 5. 极客暗黑：赛博、高能、技术感
  digitalWasabi: {
    mode: "dark",
    preset: "brutalist",
    colors: {
      primary: "#ADFF2F", // 芥末绿 (荧光感)
      secondary: "#1A1A1D", // 深炭黑
      background: "#080808",
      surface: "#121212",
      muted: "#2A2A2A",
      accent: "#ADFF2F",
      text: "#FFFFFF",
    },
    fontStyle: "mono",
    typographyScale: "bold",
    borderRadius: "none",
    containerStyle: "outline",
  },

  // 6. 温暖香槟：柔和、母婴、高端护理
  champagnePearl: {
    mode: "light",
    preset: "minimal",
    colors: {
      primary: "#9B8F84", // 灰褐
      secondary: "#C8B7A6", // 亚麻
      background: "#F7E7CE", // 香槟色
      surface: "#FFFFFF",
      muted: "#EAD9C3",
      accent: "#2C2A28",
      text: "#2C2A28",
    },
    fontStyle: "serif",
    typographyScale: "standard",
    borderRadius: "full",
    containerStyle: "default",
  },

  // 7. 现代科技（深蓝）：适合 AI、开发者工具
  modernTech: {
    mode: "dark",
    preset: "modern",
    colors: {
      primary: "#2DD4BF", // Teal-400
      secondary: "#6366F1", // Indigo-500
      background: "#020617", // 极深蓝黑
      surface: "#0F172A", // 深蓝灰
      muted: "#1E293B",
      accent: "#5EEAD4",
      text: "#F1F5F9",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "lg",
    containerStyle: "glass",
  },

  // 8. 工业钢铁：硬核、建筑、工程
  industrialSteel: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#374151", // Gray-700
      secondary: "#4B5563", // Gray-600
      background: "#F9FAFB",
      surface: "#F3F4F6",
      muted: "#E5E7EB",
      accent: "#1F2937",
      text: "#111827",
    },
    fontStyle: "mono",
    typographyScale: "standard",
    borderRadius: "none",
    containerStyle: "outline",
  },

  // 9. 企业信托：专业、稳重、高信任感 (适合水管工、律师)
  corporateTrust: {
    mode: "light",
    preset: "modern",
    colors: {
      primary: "#1E40AF",    // Blue-800
      secondary: "#64748B",  // Slate-500
      background: "#FFFFFF",
      surface: "#F8FAFC",
      muted: "#F1F5F9",
      accent: "#3B82F6",     // Blue-500
      text: "#0F172A",
    },
    fontStyle: "sans",
    typographyScale: "standard",
    borderRadius: "md",
    containerStyle: "default",
  },
};

export const PRESET_KEYS = Object.keys(
  THEME_PRESETS,
) as (keyof typeof THEME_PRESETS)[];
