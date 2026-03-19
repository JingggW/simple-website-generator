import { 
  Inter, 
  Playfair_Display, 
  JetBrains_Mono, 
  Plus_Jakarta_Sans, 
  Crimson_Pro,
  Montserrat,
  Outfit,
  Spectral
} from "next/font/google";

// 1. Define the Google Fonts we want to support
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
export const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
export const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
export const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
export const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const spectral = Spectral({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-spectral" });

// 2. Define Curated Pairings / Choices
// This maps our schema 'fontStyle' to actual CSS variable stacks
export const FONT_PAIRINGS = {
  // Balanced & Modern
  sans: {
    heading: "var(--font-jakarta), ui-sans-serif, system-ui",
    body: "var(--font-inter), ui-sans-serif, system-ui",
    variable: `${plusJakarta.variable} ${inter.variable}`
  },
  // High-End & Editorial
  serif: {
    heading: "var(--font-playfair), ui-serif, Georgia",
    body: "var(--font-spectral), ui-serif, Georgia",
    variable: `${playfair.variable} ${spectral.variable}`
  },
  // Technical & Precise
  mono: {
    heading: "var(--font-jetbrains), ui-monospace",
    body: "var(--font-jetbrains), ui-monospace",
    variable: `${jetbrains.variable}`
  },
  // Boutique & Artisanal (The Churchill style)
  display: {
    heading: "var(--font-outfit), sans-serif",
    body: "var(--font-crimson), serif",
    variable: `${outfit.variable} ${crimson.variable}`
  },
  // Bold & Playful
  bold: {
    heading: "var(--font-montserrat), sans-serif",
    body: "var(--font-inter), sans-serif",
    variable: `${montserrat.variable} ${inter.variable}`
  }
};

export type FontStyle = keyof typeof FONT_PAIRINGS;
