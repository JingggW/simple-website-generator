import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  theme: {
    "mode": "light",
    "colors": {
      "primary": "#1D4ED8",
      "secondary": "#6B7280",
      "background": "#FFFFFF",
      "text": "#111827"
    },
    "fontStyle": "sans",
    "borderRadius": "md"
  },
  header: {
    "title": "Pawsome Grooming",
    "links": [
      { "type": "link", "label": "Home", "href": "/" },
      { "type": "link", "label": "About", "href": "/about" },
      { "type": "link", "label": "Services", "href": "/services" },
      { "type": "link", "label": "Contact", "href": "/contact" }
    ],
    "cta": {
      "type": "link",
      "label": "Book Now",
      "href": "/contact"
    }
  },
  footer: {
    "brand": {
      "title": "Pawsome Grooming",
      "description": "Premium dog grooming and washing services in Point Cook, Melbourne."
    },
    "columns": [
      {
        "title": "Quick Links",
        "links": [
          { "type": "link", "label": "About Us", "href": "/about" },
          { "type": "link", "label": "Services", "href": "/services" },
          { "type": "link", "label": "Contact", "href": "/contact" }
        ]
      }
    ],
    "social": [
      { "platform": "facebook", "url": "https://facebook.com" },
      { "platform": "instagram", "url": "https://instagram.com" }
    ],
    "copyright": "© 2026 Pawsome Grooming. All rights reserved."
  },
  pages: {
    "/": {
      "seo": {
        "title": "Premium Dog Grooming in Point Cook | Luxury Pet Care Melbourne",
        "description": "Experience elegant, professional dog grooming in Point Cook. Trust our expert team to give your pet a fresh, stylish look. Book online today!"
      },
      "sectionOrder": ["hero_main", "services_grid", "testimonials_section", "contact_section"],
      "sections": {
        "hero_main": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "headline": "Elegant Grooming for Your Beloved Companion",
            "subheadline": "Premium dog grooming and washing services in Point Cook, Melbourne.",
            "ctaText": "Book a Grooming Session",
            "ctaLink": "/contact",
            "imageName": "hero-dog-grooming.jpg"
          }
        },
        "services_grid": {
          "type": "services",
          "variant": "grid",
          "props": {
            "title": "Our Premium Services",
            "description": "Tailored grooming solutions for every dog, every need.",
            "items": [
              { "icon": "Wrench", "title": "Luxury Bath", "description": "A thorough, spa-like bath using premium, pet-safe products." },
              { "icon": "Droplets", "title": "Stylish Trimming", "description": "Precise grooming for a polished look." }
            ]
          }
        },
        "testimonials_section": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "title": "What Our Clients Say",
            "items": [
              { "quote": "Excellent service!", "author": "Sarah M." }
            ]
          }
        },
        "contact_section": {
          "type": "contact",
          "variant": "simple",
          "props": {
            "title": "Get in Touch",
            "description": "Book your appointment today.",
            "email": "contact@pawsome.com.au"
          }
        }
      }
    },
    "/about": {
      "seo": {
        "title": "Meet Our Passionate Team | Dog Wash and Grooming Point Cook",
        "description": "Discover the heart behind our premium dog grooming services."
      },
      "sectionOrder": ["brand_story", "philosophy"],
      "sections": {
        "brand_story": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "blocks": [
              { "type": "heading", "text": "Our Story", "level": "h2" },
              { "type": "text", "content": "Born from a love for pets and a commitment to excellence." }
            ]
          }
        },
        "philosophy": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "blocks": [
              { "type": "heading", "text": "Our Philosophy", "level": "h2" },
              { "type": "text", "content": "We believe every pet deserves the spa treatment." }
            ]
          }
        }
      }
    }
  }
}
