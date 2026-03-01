import { z } from "zod";

// --- Theme Schemas ---

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
      }),
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

// --- Navigation Schemas ---
export const LinkSchema = z.object({
  type: z.literal("link"),
  label: z.string().describe("Text to display for the link (eg About)"),
  href: z.string().default("#").describe("URL path (eg /about)"),
});

export const DropdownSchema = z.object({
  type: z.literal("dropdown"),
  label: z.string().describe("Dropdown text (eg Services)"),
  items: z.array(LinkSchema).describe("Links inside the dropdown"),
});

export const NavItemSchema = z.discriminatedUnion("type", [
  LinkSchema,
  DropdownSchema,
]);

export const HeaderSchema = z.object({
  title: z.string().default("Brand").describe("Site title or logo text"),
  links: z
    .array(NavItemSchema)
    .default([])
    .describe("Navigation items in the header"),
  cta: LinkSchema.optional().describe(
    "Optional 'sign up' or 'contact us' link in the header",
  ),
});

// --- Footer Schema ---
export const FooterColumnSchema = z.object({
  title: z.string(),
  links: z.array(LinkSchema),
});

export const FooterSchema = z.object({
  brand: z.object({
    title: z.string().default("Brand"),
    description: z.string().optional(),
  }),
  columns: z.array(FooterColumnSchema).default([]),
  social: z
    .array(
      z.object({
        platform: z.enum([
          "twitter",
          "github",
          "linkedin",
          "facebook",
          "instagram",
        ]),
        url: z.string().url(),
      }),
    )
    .optional(),
  copyright: z.string().default("© 2026 Company Name. All rights reserved."),
});

// --- Testimonial Schema ---
export const TestimonialSchema = z.object({
  quote: z.string().describe("The testimonial text"),
  author: z.string().describe("Name of the person giving the testimonial"),
  role: z.string().optional().describe("Their role or company"),
  avatar: z.string().optional().describe("URL or filename of avatar image"),
});

export const TestimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  variant: z.enum(["carousel", "grid"]).default("grid"),
  props: z.object({
    title: z.string().default("What Our Clients Say"),
    subtitles: z.string().optional(),
    items: z.array(TestimonialSchema),
  }),
});

// --- Block Section Schema (Atomic) ---
export const BlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    text: z.string(),
    level: z.enum(["h1", "h2", "h3"]).default("h2"),
  }),
  z.object({
    type: z.literal("text"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("image"),
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("button"),
    label: z.string(),
    href: z.string(),
    variant: z.enum(["primary", "secondary", "outline"]).default("primary"),
  }),
]);

export const BlockSectionSchema = z.object({
  type: z.literal("blocks"),
  variant: z.enum(["prose", "wide", "full"]).default("prose"),
  props: z.object({
    blocks: z.array(BlockSchema),
  }),
});

// --- Overall Website Schema ---
export const PageSchema = z.object({
  seo: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  sectionOrder: z.array(z.string()).describe("Ordered list of section IDs"),
  sections: z.record(
    z.string(),
    z.discriminatedUnion("type", [
      HeroSchema,
      ServicesSchema,
      ContactSchema,
      ContentSchema,
      TestimonialsSectionSchema,
      BlockSectionSchema,
    ])
  ).describe("Dictionary of sections keyed by ID"),
});

export const WebsiteConfigSchema = z.object({
  header: HeaderSchema,
  footer: FooterSchema,
  theme: ThemeSchema,
  pages: z.record(z.string(), PageSchema).describe("Map of path to page config"),
});

export type Theme = z.infer<typeof ThemeSchema>;
export type HeroSection = z.infer<typeof HeroSchema>;
export type ServicesSection = z.infer<typeof ServicesSchema>;
export type ContactSection = z.infer<typeof ContactSchema>;
export type ContentSection = z.infer<typeof ContentSchema>;
export type TestimonialsSection = z.infer<typeof TestimonialsSectionSchema>;
export type BlockSection = z.infer<typeof BlockSectionSchema>;
export type AnySection =
  | HeroSection
  | ServicesSection
  | ContactSection
  | ContentSection
  | TestimonialsSection
  | BlockSection;

export type PageConfig = z.infer<typeof PageSchema>;
export type WebsiteConfig = z.infer<typeof WebsiteConfigSchema>;
