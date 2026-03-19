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

export const metadata: Metadata = {
  title: "PropSite Engine",
  description: "AI-Driven Website Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </body>
    </html>
  );
}
