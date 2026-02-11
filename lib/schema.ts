import { z } from "zod";

export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark", "auto"]).default("light"),
  colors: z.object({
    primary: z.string().default("#1D4ED8").describe("Main brand color (hex)"),
    secondary: z.string().default("#6B7280").describe("Accent color (hex)"),
    background: z.string().default("#FFFFFF"),
    text: z.string().default("#111827"),
  }),
  fontStyle: z.enum(["sans", "serif", "mono"]).default("sans"),
  borderRadius: z.enum(["none", "sm", "md", "full"]).default("md"),
});

export const HeroSchema = z.object({
  type: z.literal("hero"),
  variant: z.enum(["simple", "split"]).describe("Visual design of the hero"), // Can add more variations
  props: z.object({
    headline: z.string(),
    subheadline: z.string().optional(),
    ctaText: z.string().default("Get Started"),
    ctaLink: z
      .string()
      .optional()
      .describe("URL for the call-to-action button"),
    imageName: z
      .string()
      .optional()
      .describe("Name of the image file in /public/"),
  }),
});

export const ServicesSchema = z.object({
  type: z.literal("services"),
  variant: z.enum(["grid", "list"]).describe("Layout style for services"),
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        icon: z.string().describe("Name of the icon from lucide-react"),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export const ContactSchema = z.object({
  type: z.literal("contact"),
  variant: z.enum(["simple"]).describe("Design style for contact section"),
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const ContentSchema = z.object({
  type: z.literal("content"),
  variant: z.enum(["simple"]).describe("Design style for content section"),
  props: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

export const WebsiteConfigSchema = z.object({
  siteName: z.string(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
  }),
  theme: ThemeSchema,
  sections: z.array(
    z.union([HeroSchema, ServicesSchema, ContactSchema, ContentSchema])
  ),
});

export type WebsiteConfig = z.infer<typeof WebsiteConfigSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type HeroSection = z.infer<typeof HeroSchema>;
export type ServicesSection = z.infer<typeof ServicesSchema>;
export type ContactSection = z.infer<typeof ContactSchema>;
export type ContentSection = z.infer<typeof ContentSchema>;
export type AnySection =
  | HeroSection
  | ServicesSection
  | ContactSection
  | ContentSection;
