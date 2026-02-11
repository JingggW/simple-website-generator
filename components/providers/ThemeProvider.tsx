"use client";

import { useEffect } from "react";
import { WebsiteConfig } from "@/lib/schema";
import { fontMap, hexToRgb } from "@/lib/theme-utils";
import { radiusMap } from "@/lib/theme-utils";

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
    const textRgb = hexToRgb(theme.colors.text);

    root.style.setProperty("--primary", primaryRgb);
    root.style.setProperty("--secondary", secondaryRgb);
    root.style.setProperty("--background", backgroundRgb);
    root.style.setProperty("--text", textRgb);

    root.style.setProperty("--font-body", fontMap[theme.fontStyle]);

    root.style.setProperty("--border-radius", radiusMap[theme.borderRadius]);
  }, [theme]);
  return <>{children}</>;
};
