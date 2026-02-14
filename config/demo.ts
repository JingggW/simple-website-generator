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
  sections: [
    // 1. HERO SECTION (Split Variant)
    {
      type: "hero",
      variant: "split",
      props: {
        headline: "Plumbing Problems? We Fix Them Fast.",
        subheadline:
          "24/7 Emergency service for residential and commercial properties. No call-out fee for local bookings.",
        ctaText: "Book Now",
        imageName: "hero-plumber.webp", // You can use a placeholder image in public/ for now
      },
    },
    // 2. SERVICES SECTION (Grid Variant)
    {
      type: "services",
      variant: "grid",
      props: {
        title: "Our Services",
        description: "From leaky taps to full renovations, we cover it all.",
        items: [
          {
            title: "Emergency Repairs",
            description:
              "Burst pipes? Blocked drains? We arrive within 60 minutes.",
            icon: "Flame", // Using 'Flame' as a proxy for urgency/heat
          },
          {
            title: "Maintenance",
            description: "Regular checkups to prevent costly disasters later.",
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
    // 3. CONTENT SECTION (Simple Variant)
    {
      type: "content",
      variant: "simple",
      props: {
        title: "Why Choose Us?",
        body: "We have been serving the community for over 20 years.\n\nOur team is fully licensed, insured, and committed to providing the highest quality workmanship. We offer a 100% satisfaction guarantee on all our jobs.",
      },
    },
    // 4. CONTACT SECTION (Simple Variant)
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
};
