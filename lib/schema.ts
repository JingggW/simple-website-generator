import { z } from "zod";

// --- START THEME ---
export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark", "auto"]).default("light"),
  colors: z.object({
    primary: z.string().default("#1D4ED8").describe("Main brand color (hex)"),
    secondary: z.string().default("#6B7280").describe("Accent color (hex)"),
    background: z.string().default("#FFFFFF"),
    surface: z.string().default("#F9FAFB").describe("Slightly off-background color for cards/sections"),
    muted: z.string().default("#F3F4F6").describe("Very subtle color for backgrounds"),
    accent: z.string().default("#F59E0B").describe("Highlight color for small elements"),
    text: z.string().default("#111827"),
  }),
  fontStyle: z.enum(["sans", "serif", "mono"]).default("sans"),
  borderRadius: z.enum(["none", "sm", "md", "full"]).default("md"),
});
// --- END THEME ---

// Common props for all sections
const BaseSectionSchema = z.object({
  background: z.enum(["default", "muted", "surface", "primary", "secondary"]).default("default"),
  animation: z.enum(["none", "fade", "slide-up", "zoom-in"]).default("slide-up"),
  width: z.enum(["prose", "default", "wide", "full"]).default("default"),
});

// --- START HERO ---
export const HeroSchema = z.object({
  type: z.literal("hero"),
  variant: z.enum(["simple", "split"]),
  props: BaseSectionSchema.extend({
    headline: z.string(),
    subheadline: z.string().optional(),
    ctaText: z.string().default("Get Started"),
    ctaLink: z.string().optional().describe("Internal path or anchor"),
    imageName: z.string().optional(),
  }),
});
// --- END HERO ---

// --- START SERVICES ---
export const ServicesSchema = z.object({
  type: z.literal("services"),
  variant: z.enum(["grid", "list"]),
  props: BaseSectionSchema.extend({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    ),
  }),
});
// --- END SERVICES ---

// --- START PRICING ---
export const PricingSchema = z.object({
  type: z.literal("pricing"),
  variant: z.enum(["simple", "detailed"]),
  props: BaseSectionSchema.extend({
    title: z.string(),
    description: z.string().optional(),
    categories: z.array(z.object({
      name: z.string(),
      items: z.array(z.object({
        label: z.string(),
        price: z.string(),
        details: z.string().optional(),
      }))
    }))
  })
});
// --- END PRICING ---

// --- START FORM ---
export const FormSchema = z.object({
  type: z.literal("form"),
  variant: z.enum(["contact", "request"]),
  props: BaseSectionSchema.extend({
    title: z.string(),
    description: z.string().optional(),
    fields: z.array(z.object({
      name: z.string(),
      label: z.string(),
      type: z.enum(["text", "email", "textarea", "select"]),
      options: z.array(z.string()).optional().describe("For select type"),
      required: z.boolean().default(true),
    })),
    submitLabel: z.string().default("Submit"),
  })
});
// --- END FORM ---

// --- START MAP ---
export const MapSchema = z.object({
  type: z.literal("map"),
  variant: z.enum(["embedded"]),
  props: BaseSectionSchema.extend({
    title: z.string().optional(),
    address: z.string(),
    zoom: z.number().default(14),
  })
});
// --- END MAP ---

// --- START CONTACT ---
export const ContactSchema = z.object({
  type: z.literal("contact"),
  variant: z.enum(["simple"]),
  props: BaseSectionSchema.extend({
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
  props: BaseSectionSchema.extend({
    title: z.string(),
    body: z.string(),
  }),
});
// --- END CONTENT ---

// --- START NAV ---
export const LinkSchema = z.object({
  type: z.literal("link"),
  label: z.string(),
  href: z.string().optional().describe("Internal path or anchor"),
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
      url: z.string(),
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
  props: BaseSectionSchema.extend({
    title: z.string().default("What Our Clients Say"),
    subtitles: z.string().optional(),
    items: z.array(TestimonialSchema),
  }),
});
// --- END TESTIMONIALS ---

// --- START BLOCKS ---
export const BaseBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    text: z.string(),
    level: z.enum(["h1", "h2", "h3"]).default("h2"),
    align: z.enum(["left", "center", "right"]).default("left"),
    spacing: z.enum(["none", "sm", "md", "lg"]).default("md"),
  }),
  z.object({
    type: z.literal("text"),
    content: z.string(),
    align: z.enum(["left", "center", "right"]).default("left"),
    spacing: z.enum(["none", "sm", "md", "lg"]).default("md"),
  }),
  z.object({
    type: z.literal("image"),
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    spacing: z.enum(["none", "sm", "md", "lg"]).default("md"),
  }),
  z.object({
    type: z.literal("button"),
    label: z.string(),
    href: z.string().optional().describe("Internal path or anchor"),
    variant: z.enum(["primary", "secondary", "outline"]).default("primary"),
    align: z.enum(["left", "center", "right"]).default("left"),
    spacing: z.enum(["none", "sm", "md", "lg"]).default("md"),
  }),
]);

// Helper for Recursive Columns
export type Block = z.infer<typeof BaseBlockSchema> | { 
  type: "columns"; 
  layout: "split" | "3-col" | "split-left" | "split-right"; 
  items: { blocks: Block[] }[] 
};

export const BlockSchema: z.ZodType<Block> = z.lazy(() => z.union([
  BaseBlockSchema,
  z.object({
    type: z.literal("columns"),
    layout: z.enum(["split", "3-col", "split-left", "split-right"]).default("split"),
    items: z.array(z.object({
      blocks: z.array(BlockSchema)
    })),
  })
]));

export const BlockSectionSchema = z.object({
  type: z.literal("blocks"),
  variant: z.enum(["prose", "wide", "full"]).default("prose"),
  props: BaseSectionSchema.extend({
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
      PricingSchema,
      FormSchema,
      MapSchema,
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
export type PricingSection = z.infer<typeof PricingSchema>;
export type FormSection = z.infer<typeof FormSchema>;
export type MapSection = z.infer<typeof MapSchema>;
export type ContactSection = z.infer<typeof ContactSchema>;
export type ContentSection = z.infer<typeof ContentSchema>;
export type TestimonialsSection = z.infer<typeof TestimonialsSectionSchema>;
export type BlockSection = z.infer<typeof BlockSectionSchema>;
export type AnySection =
  | HeroSection
  | ServicesSection
  | PricingSection
  | FormSection
  | MapSection
  | ContactSection
  | ContentSection
  | TestimonialsSection
  | BlockSection;

export type PageConfig = z.infer<typeof PageSchema>;
export type WebsiteConfig = z.infer<typeof WebsiteConfigSchema>;
