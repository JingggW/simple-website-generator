import { z } from "zod";

// --- START THEME ---
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
// --- END THEME ---

// --- START HERO ---
export const HeroSchema = z.object({
  type: z.literal("hero"),
  variant: z.enum(["simple", "split"]).describe("Visual design of the hero"),
  props: z.object({
    headline: z.string(),
    subheadline: z.string().optional(),
    ctaText: z.string().default("Get Started"),
    ctaLink: z.string().optional(),
    imageName: z.string().optional(),
  }),
});
// --- END HERO ---

// --- START SERVICES ---
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
// --- END SERVICES ---

// --- START CONTACT ---
export const ContactSchema = z.object({
  type: z.literal("contact"),
  variant: z.enum(["simple"]),
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
// --- END CONTACT ---

// --- START CONTENT ---
export const ContentSchema = z.object({
  type: z.literal("content"),
  variant: z.enum(["simple"]),
  props: z.object({
    title: z.string(),
    body: z.string(),
  }),
});
// --- END CONTENT ---

// --- START NAV ---
export const LinkSchema = z.object({
  type: z.literal("link"),
  label: z.string(),
  href: z.string().default("#"),
});

export const DropdownSchema = z.object({
  type: z.literal("dropdown"),
  label: z.string(),
  items: z.array(LinkSchema),
});

export const NavItemSchema = z.discriminatedUnion("type", [
  LinkSchema,
  DropdownSchema,
]);

export const HeaderSchema = z.object({
  title: z.string().default("Brand"),
  links: z.array(NavItemSchema).default([]),
  cta: LinkSchema.optional(),
});
// --- END NAV ---

// --- START FOOTER ---
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
  social: z.array(
    z.object({
      platform: z.enum(["twitter", "github", "linkedin", "facebook", "instagram"]),
      url: z.string().url(),
    }),
  ).optional(),
  copyright: z.string().default("© 2026 Company Name. All rights reserved."),
});
// --- END FOOTER ---

// --- START TESTIMONIALS ---
export const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  avatar: z.string().optional(),
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
// --- END TESTIMONIALS ---

// --- START BLOCKS ---
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
// --- END BLOCKS ---

// --- START WEBSITE ---
export const PageSchema = z.object({
  seo: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  sectionOrder: z.array(z.string()),
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
  ),
});

export const WebsiteConfigSchema = z.object({
  header: HeaderSchema,
  footer: FooterSchema,
  theme: ThemeSchema,
  pages: z.record(z.string(), PageSchema),
});
// --- END WEBSITE ---

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
