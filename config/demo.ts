import { WebsiteConfig } from "@/lib/schema";

export const demoConfig: WebsiteConfig = {
  siteName: "Urban Plumbers",
  meta: {
    title: "Urban Plumbers - Fast & Reliable",
    description: "The #1 plumbing service in Melbourne.",
  },
  theme: {
    mode: "light",
    colors: {
      primary: "#2563EB", // Blue-600
      secondary: "#1E293B", // Slate-800
      background: "#FFFFFF",
      text: "#0F172A",
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
