"use client";

import { useState } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { 
  inter, 
  playfair, 
  jetbrains, 
  plusJakarta, 
  crimson, 
  montserrat, 
  outfit, 
  spectral 
} from "@/lib/fonts";
import { siteConfig } from "@/config/site"; // Import siteConfig
import { ThemeProvider } from "@/components/providers/ThemeProvider"; // Import ThemeProvider
import { ThemePicker } from "@/components/ui/ThemePicker"; // Import ThemePicker

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentTheme, setCurrentTheme] = useState(siteConfig.theme);

  const fontVariables = [
    inter.variable,
    playfair.variable,
    jetbrains.variable,
    plusJakarta.variable,
    crimson.variable,
    montserrat.variable,
    outfit.variable,
    spectral.variable
  ].join(" ");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontVariables} antialiased`}
      >
        <ThemeProvider theme={currentTheme}>
          {children}
          <ThemePicker
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
