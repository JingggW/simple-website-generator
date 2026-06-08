"use client";

import { useEffect } from "react";
import { Theme } from "@/lib/schema";
import { hexToRgb, getLuminance, radiusMap } from "@/lib/theme-utils";
import { FONT_PAIRINGS } from "@/lib/fonts";
import { siteConfig } from "@/config/site";

export const DynamicThemeProvider = ({
  theme,
  children,
  restoreOnUnmount = false,
}: {
  theme: Theme;
  children: React.ReactNode;
  restoreOnUnmount?: boolean;
}) => {
  useEffect(() => {
    const root = document.documentElement;

    const apply = (t: Theme) => {
      const primaryRgb = hexToRgb(t.colors.primary);
      const secondaryRgb = hexToRgb(t.colors.secondary);
      const backgroundRgb = hexToRgb(t.colors.background);
      const surfaceRgb = hexToRgb(t.colors.surface || "#F9FAFB");
      const mutedRgb = hexToRgb(t.colors.muted || "#F3F4F6");
      const accentRgb = hexToRgb(t.colors.accent || "#F59E0B");
      const textRgb = hexToRgb(t.colors.text);

      root.style.setProperty("--primary", primaryRgb);
      root.style.setProperty("--secondary", secondaryRgb);
      root.style.setProperty("--background", backgroundRgb);
      root.style.setProperty("--surface", surfaceRgb);
      root.style.setProperty("--muted", mutedRgb);
      root.style.setProperty("--accent", accentRgb);
      root.style.setProperty("--text", textRgb);

      // Calculate high-contrast text colors for brand backgrounds
      const getOnColor = (bgHex: string) => {
        const luminance = getLuminance(bgHex);
        return luminance > 0.5 ? "0 0 0" : "255 255 255";
      };

      root.style.setProperty("--on-primary", getOnColor(t.colors.primary));
      root.style.setProperty("--on-secondary", getOnColor(t.colors.secondary));
      root.style.setProperty("--on-accent", getOnColor(t.colors.accent));
      root.style.setProperty("--on-muted", getOnColor(t.colors.muted || "#F3F4F6"));
      root.style.setProperty("--on-surface", getOnColor(t.colors.surface || "#F9FAFB"));

      // Typography
      const pairing = FONT_PAIRINGS[t.fontStyle as keyof typeof FONT_PAIRINGS] || FONT_PAIRINGS.sans;
      root.style.setProperty("--font-body", pairing.body);
      root.style.setProperty("--font-heading", pairing.heading);

      root.style.setProperty("--border-radius", radiusMap[t.borderRadius]);

      // Global Scale Factor (Experimental)
      const scales = {
        standard: "1",
        editorial: "1.2",
        bold: "1.4",
      };
      root.style.setProperty("--scale-factor", scales[t.typographyScale || "standard"]);
      root.style.setProperty("--preset", t.preset || "modern");
      root.style.setProperty("--col-flex-grow", (t as any).equalHeightColumns !== false ? "1" : "0");
    };

    apply(theme);

    return () => {
      if (restoreOnUnmount && siteConfig?.theme) {
        apply(siteConfig.theme);
      }
    };
  }, [theme, restoreOnUnmount]);
  return <>{children}</>;
};
