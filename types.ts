// --- 1. Business & SEO Data ---
export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  abn?: string; // Australian Business Number
  openingHours?: string; // e.g., "Mon-Fri 9am-5pm"
}

export interface SeoContext {
  suburb: string; // e.g., "Richmond, Melbourne"
  keywords: string[]; // Primary keywords for metadata
  description: string; // Meta description
}

// --- 2. Theme Configuration ---
// TODO: I expect to have more diverse themes in the future.
export interface ThemeConfig {
  primaryColor: string; // Hex code (e.g., #2563EB)
  secondaryColor?: string; // Optional accent color
  fontFamily: string; // e.g., "Inter", "Roboto"
}

// --- 3. Section Definitions ---

// The "Discriminated Union" Base
interface BaseSection {
  id: string; // Unique ID for anchor links (e.g., "about", "services")
  type: SectionType;
}

export type SectionType = "hero" | "services" | "content" | "contact";

// A. Hero Section
export interface HeroSection extends BaseSection {
  type: "hero";
  content: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
}

// B. Service Grid (The "Bricks")
import { IconName } from "@/components/IconMap";
export interface ServicesSection extends BaseSection {
  type: "services";
  content: {
    title: string;
    description?: string;
    items: Array<{
      icon: IconName;
      title: string;
      description: string;
    }>;
  };
}

// C. Text + Image (Alternating Layouts)
export interface ContentSection extends BaseSection {
  type: "content";
  content: {
    layout: "image-left" | "image-right"; // Controls orientation
    title: string;
    text: string; // Can support simple Markdown later
    image: string; // Image URL
    alt: string; // Alt text for SEO
  };
}

// D. Contact Section
export interface ContactSection extends BaseSection {
  type: "contact";
  content: {
    title: string;
    subtitle?: string;
    formEndpoint?: string; // Formspree URL
  };
}

// --- 4. The Master Union Type ---
export type Section =
  | HeroSection
  | ServicesSection
  | ContentSection
  | ContactSection;

// --- 5. The Root Config Object ---
export interface SiteConfig {
  business: BusinessInfo;
  seo: SeoContext;
  theme: ThemeConfig;
  navigation: Array<{ label: string; href: string }>;
  sections: Section[];
}
