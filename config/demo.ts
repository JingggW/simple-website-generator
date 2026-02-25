import { WebsiteConfig } from "@/lib/schema";

export const demoConfig: WebsiteConfig = {
  header: {
    title: "Urban Plumbers",
    links: [
      { type: "link", label: "Home", href: "/" },
      { type: "link", label: "About", href: "/about" },
      {
        type: "dropdown",
        label: "Services",
        items: [
          {
            type: "link",
            label: "Emergency Repairs",
            href: "/services/emergency",
          },
          { type: "link", label: "Maintenance", href: "/services/maintenance" },
          {
            type: "link",
            label: "Installations",
            href: "/services/installations",
          },
        ],
      },
      { type: "link", label: "Contact", href: "/contact" },
    ],
    cta: { type: "link", label: "Book Now", href: "/book" },
  },
  theme: {
    mode: "light",
    colors: {
      primary: "#059669", // Emerald-600
      secondary: "#D97706", // Amber-600
      background: "#FAFAF9", // Stone-50
      text: "#1C1917", // Stone-900
    },
    fontStyle: "sans",
    borderRadius: "md",
  },
  pages: {
    "/": {
      seo: {
        title: "Urban Plumbers | Fast 24/7 Emergency Repairs",
        description:
          "Professional plumbing services in Point Cook and surrounding areas.",
      },
      sections: [
        {
          type: "hero",
          variant: "split",
          props: {
            headline: "Plumbing Problems? We Fix Them Fast.",
            subheadline:
              "24/7 Emergency service for residential and commercial properties. No call-out fee for local bookings.",
            ctaText: "Book Now",
            imageName: "hero-plumber.webp",
          },
        },
        {
          type: "services",
          variant: "grid",
          props: {
            title: "Our Services",
            description:
              "From leaky taps to full renovations, we cover it all.",
            items: [
              {
                title: "Emergency Repairs",
                description:
                  "Burst pipes? Blocked drains? We arrive within 60 minutes.",
                icon: "Flame",
              },
              {
                title: "Maintenance",
                description:
                  "Regular checkups to prevent costly disasters later.",
                icon: "Wrench",
              },
              {
                title: "Installations",
                description:
                  "New hot water systems, dishwashers, and gas fittings.",
                icon: "Droplets",
              },
            ],
          },
        },
        {
          type: "contact",
          variant: "simple",
          props: {
            title: "Get in Touch",
            description: "Ready to get started? Call us or fill out the form.",
            phone: "0400 123 456",
            email: "hello@urbanplumbers.com.au",
            address: "123 High Street\nPoint Cook, VIC 3030",
          },
        },
      ],
    },
    "/about": {
      seo: {
        title: "About Azure Waves | Luxury Hair Salon in Miami",
        description:
          "Discover Azure Waves, Miami's premier luxury hair salon. Where coastal serenity meets expert artistry. Learn our story, meet our stylists, and experience elegance.",
      },
      sections: [
        {
          type: "blocks",
          variant: "full",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Where Elegance Meets the Ocean's Serenity.",
                level: "h1",
              },
              {
                type: "heading",
                text: "A Vision Forged by the Sea",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "I founded Azure Waves with a singular vision: to create a haven where the rush of the city fades, replaced by the rhythmic calm of the waves. Miami's energy is electric, but true luxury, I believe, is found in moments of peace. Every detail here—from the sweeping coastal blue hues to the natural textures—is curated to transport you. We don't just style hair; we craft a personal narrative of elegance, inspired by the sun, the sand, and the endless horizon. — Jane Doe, Founder & Creative Director",
              },
              {
                type: "heading",
                text: "The Azure Waves Philosophy",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "Our approach is rooted in three core principles that define every visit.\n\n- **Harmony with Nature**: We prioritize products and techniques that respect the integrity of your hair, using sustainable, ocean-inspired ingredients for health and radiance.\n- **Artisanal Craftsmanship**: Our stylists are artists, trained in the latest global techniques. We listen, we advise, and we execute with precision and a passion for perfection.\n- **Sanctuary & Serenity**: From the moment you enter, you are enveloped in a space designed for relaxation. Let the gentle sounds, calming scents, and serene aesthetics melt away stress.",
              },
              {
                type: "heading",
                text: "Meet the Artisans",
                level: "h2",
              },
              {
                type: "text",
                content:
                  'Our team of artisans embodies the elegance of the coast while delivering personalized service.\n\n- **Maria L.**, Senior Colorist — 8 years of expertise, lived-in color mastery. "Hair should feel as effortless as an ocean breeze."\n- **Ethan S.**, Master Stylist — Precision cuts and texture work. "Every strand tells a story."\n- **Sofia K.**, Texture Specialist — 5 years in wave creation and volume shaping. "Confidence flows like water."\n- **Luis G.**, Creative Director — Visionary leader, ensuring every detail reflects our brand.\n- **Ava P.**, Junior Stylist — Fresh perspective, passionate about sustainable practices.',
              },
              {
                type: "heading",
                text: "Committed to Beauty, Inside and Out",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "At Azure Waves, luxury is inseparable from responsibility. We are dedicated to sustainable practices—from our partnership with eco-conscious product lines like Oribe and Olaplex to our salon's energy-efficient operations. We believe in nurturing beauty that respects our environment, ensuring the oceans that inspire us remain vibrant for generations to come.",
              },
              {
                type: "button",
                label: "Book Your Escape",
                href: "/booking",
                variant: "primary",
              },
              {
                type: "text",
                content:
                  "Ready to experience the Azure Waves difference? Your journey to serene elegance begins with a single step.",
              },
            ],
          },
        },
      ],
    },
  },
  footer: {
    brand: {
      title: "PropSite",
      description: "Building the future of websites, one JSON at a time.",
    },
    copyright: "© 2026 PropSite Engine. Built with Next.js.",
    columns: [
      {
        title: "Product",
        links: [
          { type: "link", label: "Features", href: "/features" },
          { type: "link", label: "Pricing", href: "/pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { type: "link", label: "About", href: "/about" },
          { type: "link", label: "Careers", href: "/careers" },
        ],
      },
    ],
    social: [
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "github", url: "https://github.com" },
    ],
  },
};
