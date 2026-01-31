// config/site.ts
import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  business: {
    name: "Rapid Plumbers",
    phone: "0400 123 456",
    email: "hello@rapidplumbers.com.au",
    address: "123 High St, Richmond VIC 3121",
    abn: "12 345 678 901",
    openingHours: "Mon-Sun 24 Hours",
  },
  seo: {
    suburb: "Richmond, Melbourne",
    keywords: ["Emergency Plumber", "Blocked Drains", "Hot Water Systems"],
    description: "Reliable local plumbing in Richmond. On time, every time.",
  },
  theme: {
    primaryColor: "#2563EB",
    fontFamily: "Inter",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  sections: [
    {
      id: "hero",
      type: "hero",
      content: {
        headline: "Richmond's Most Trusted Local Plumbers",
        subheadline: "No call out fees. Arriving within 60 minutes.",
        ctaText: "Get a Free Quote",
        ctaLink: "#contact",
      },
    },
    {
      id: "services",
      type: "services",
      content: {
        title: "Our Services",
        items: [
          {
            icon: "Wrench",
            title: "Repairs",
            description: "Leaking taps and pipes fixed fast.",
          },
          {
            icon: "Droplets",
            title: "Drainage",
            description: "Blocked drains cleared.",
          },
          {
            icon: "Flame",
            title: "Hot Water",
            description: "Installation and repairs.",
          },
        ],
      },
    },
    {
      id: "about",
      type: "content",
      content: {
        layout: "image-right",
        title: "Locals Serving Locals",
        text: "We have been serving the Richmond community for over 10 years. We are fully licensed and insured.",
        image:
          "https://images.unsplash.com/photo-1581578014828-569f4c3a2f86?auto=format&fit=crop&q=80",
        alt: "Plumber working under sink",
      },
    },
    {
      id: "contact",
      type: "contact",
      content: {
        title: "Get in Touch",
      },
    },
  ],
};
