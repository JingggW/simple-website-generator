import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
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
    "/services/emergency": {
      seo: {
        title: "Emergency Plumbing Services – Fast & Reliable",
        description:
          "Get emergency plumbing repairs, maintenance, and installations from a trusted local provider.",
      },
      sectionOrder: [
        "hero_main",
        "services_grid",
        "contact_section",
        "philosophy",
        "testimonials_grid",
      ],
      sections: {
        philosophy: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Our Commitment to You",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "At the heart of every service call is a promise: to deliver fast, reliable, and expertly executed plumbing solutions that put our customers first. We combine rigorous quality standards with a genuine, customer‑first mindset, ensuring that every repair, maintenance task, or installation is completed with precision, integrity, and a smile. Trust us to keep your home or business flowing smoothly, day or night.",
              },
            ],
          },
        },
        hero_main: {
          type: "hero",
          variant: "simple",
          props: {
            headline: "Save Time. Fix Problems Fast.",
            subheadline:
              "Experience lightning-fast emergency plumbing services.",
            ctaText: "Get a Quote Now",
            ctaLink: "/contact",
            imageName: "emergency_repair.jpg",
          },
        },
        services_grid: {
          type: "services",
          variant: "grid",
          props: {
            title: "Our Services",
            description:
              "Fast, reliable, and expert plumbing solutions for emergencies.",
            items: [
              {
                icon: "Wrench",
                title: "Emergency Repairs",
                description:
                  "Respond within minutes to fix leaks, bursts, and other plumbing emergencies.",
              },
              {
                icon: "Droplets",
                title: "Maintenance & Installations",
                description:
                  "Ensure optimal system performance with routine checks and professional installations.",
              },
              {
                icon: "Flame",
                title: "Preventive Maintenance",
                description:
                  "Keep your plumbing in top shape with regular inspections and professional services.",
              },
            ],
          },
        },
        contact_section: {
          type: "contact",
          variant: "simple",
          props: {
            title: "Emergency Contact",
            description: "24/7 support for all your plumbing crises.",
            phone: "(555) 123-4567",
            email: "emergencies@luigisplumbing.com",
            address: "123 Main St, Springfield, IL",
          },
        },
        testimonials_grid: {
          type: "testimonials",
          variant: "grid",
          props: {
            title: "What Our Clients Say",
            subtitles: "Trusted by homeowners and businesses alike.",
            items: [
              {
                quote:
                  "Luigi's Plumbing saved my kitchen from disaster. Highly recommend!",
                author: "Sarah J.",
                role: "Homeowner",
              },
              {
                quote:
                  "Quick response and top-notch service. My plumbing is in great hands.",
                author: "Michael T.",
                role: "Business Owner",
              },
            ],
          },
        },
      },
    },
    "/": {
      seo: {
        title: "Urban Plumbers | Fast 24/7 Emergency Repairs",
        description:
          "Professional plumbing services in Point Cook and surrounding areas.",
      },
      sectionOrder: ["hero_home", "services_home", "contact_home"],
      sections: {
        hero_home: {
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
        services_home: {
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
        contact_home: {
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
      },
    },
    "/about": {
      seo: {
        title:
          "About Us | Oceanic Luxe Hair Salon – Miami’s Premier Coastal Luxury Salon",
        description:
          "Discover the story behind Oceanic Luxe, Miami’s elegant coastal hair salon where modern luxury meets serene beach inspiration. Meet our team, our philosophy, and why we’re the ultimate destination for sophisticated style.",
      },
      sectionOrder: [
        "booking_cta",
        "story",
        "philosophy",
        "team",
        "services",
        "visit",
      ],
      sections: {
        booking_cta: {
          type: "hero",
          variant: "simple",
          props: {
            headline: "Book Your Luxury Treatment Now!!!",
            ctaText: "Book Now",
            ctaLink: "/book",
          },
        },
        story: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Our Story",
                level: "h1",
              },
              {
                type: "text",
                content:
                  "At Oceanic Luxe, we blend the calming essence of Miami’s coastline with contemporary elegance to create a sanctuary where every strand is treated like a masterpiece.",
              },
            ],
          },
        },
        philosophy: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Our Philosophy",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "We believe beauty is a ritual, a moment of serenity amidst the vibrant pulse of Miami. Our services are curated to honor the natural flow of your hair, using sustainably sourced, marine-inspired products that protect both your crown and the ocean that inspires us.",
              },
            ],
          },
        },
        team: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Meet the Team",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "Our stylists are hand-picked for their artistic vision, runway-ready technique, and passion for continuous learning. Each brings a unique blend of high-fashion expertise and coastal calm, ensuring every client experiences luxury redefined.",
              },
            ],
          },
        },
        services: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Our Signature Services",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "From sun-lit balayage inspired by Miami’s pastel skies to restorative treatments infused with sea-kelp and marine collagen, our menu blends modern techniques with natural coastal ingredients.",
              },
            ],
          },
        },
        visit: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Visit Us",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "Located in the heart of Miami’s Design District, Oceanic Luxe invites you to experience the perfect harmony of luxury and nature. Step into a world where every detail—from the ocean-blue accents to the whisper of the sea breeze—reinforces our commitment to refined beauty.",
              },
              {
                type: "button",
                label: "Book Your Appointment",
                href: "#",
                variant: "primary",
              },
            ],
          },
        },
      },
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
