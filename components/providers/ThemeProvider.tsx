"use client";

import { useEffect } from "react";
import { WebsiteConfig } from "@/lib/schema";
import { hexToRgb, getLuminance, radiusMap } from "@/lib/theme-utils";
import { FONT_PAIRINGS } from "@/lib/fonts";

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: WebsiteConfig["theme"];
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const root = document.documentElement;

    const primaryRgb = hexToRgb(theme.colors.primary);
    const secondaryRgb = hexToRgb(theme.colors.secondary);
    const backgroundRgb = hexToRgb(theme.colors.background);
    const surfaceRgb = hexToRgb(theme.colors.surface || "#F9FAFB");
    const mutedRgb = hexToRgb(theme.colors.muted || "#F3F4F6");
    const accentRgb = hexToRgb(theme.colors.accent || "#F59E0B");
    const textRgb = hexToRgb(theme.colors.text);

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

    root.style.setProperty("--on-primary", getOnColor(theme.colors.primary));
    root.style.setProperty("--on-secondary", getOnColor(theme.colors.secondary));
    root.style.setProperty("--on-accent", getOnColor(theme.colors.accent));

    // Typography
    const pairing = FONT_PAIRINGS[theme.fontStyle as keyof typeof FONT_PAIRINGS] || FONT_PAIRINGS.sans;
    root.style.setProperty("--font-body", pairing.body);
    root.style.setProperty("--font-heading", pairing.heading);

    root.style.setProperty("--border-radius", radiusMap[theme.borderRadius]);

    // Global Scale Factor (Experimental)
    const scales = {
      standard: "1",
      editorial: "1.2",
      bold: "1.4",
    };
    root.style.setProperty("--scale-factor", scales[theme.typographyScale || "standard"]);
    root.style.setProperty("--preset", theme.preset || "modern");
  }, [theme]);
  return <>{children}</>;
};
