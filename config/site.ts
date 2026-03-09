import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  "theme": {
    "mode": "light",
    "colors": {
      "primary": "#2563EB",
      "secondary": "#10B981",
      "background": "#FFFFFF",
      "text": "#111827"
    },
    "fontStyle": "sans",
    "borderRadius": "md"
  },
  "header": {
    "title": "Point Cook Cosplay Cleaning",
    "links": [
      { "type": "link", "label": "Home", "href": "/" },
      {
        "type": "dropdown",
        "label": "Services",
        "items": [
          { "type": "link", "label": "Our Services", "href": "/services" },
          { "type": "link", "label": "Cosplay Costume Cleaning", "href": "/cosplay-costume-cleaning" }
        ]
      },
      { "type": "link", "label": "Gallery", "href": "/gallery" },
      { "type": "link", "label": "Contact", "href": "/contact" }
    ],
    "cta": { "type": "link", "label": "Book Now", "href": "/contact" }
  },
  "footer": {
    "brand": {
      "title": "Point Cook Cosplay Cleaning",
      "description": "Premium professional cleaning for cosplay costumes in Melbourne."
    },
    "columns": [
      {
        "title": "Quick Links",
        "links": [
          { "type": "link", "label": "Services", "href": "/services" },
          { "type": "link", "label": "Gallery", "href": "/gallery" }
        ]
      }
    ],
    "social": [
      { "platform": "facebook", "url": "https://facebook.com" },
      { "platform": "instagram", "url": "https://instagram.com" }
    ],
    "copyright": "© 2026 Point Cook Cosplay Cleaning. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Point Cook Cosplay Cleaning | Expert Costume Care",
        "description": "Professional cleaning and restoration for cosplay artistry."
      },
      "sectionOrder": ["hero", "services", "form"],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "headline": "Where Cosplay Meets Immaculate Clean",
            "subheadline": "Preserving your artistry with expert care.",
            "ctaText": "Get a Quote",
            "ctaLink": "/contact"
          }
        },
        "services": {
          "type": "services",
          "variant": "grid",
          "props": {
            "title": "Specialized Care",
            "items": [
              { "icon": "Droplets", "title": "Deep Clean", "description": "Gentle hand-washing." }
            ]
          }
        },
        "form": {
          "type": "form",
          "variant": "request",
          "props": {
            "title": "Book Your Session",
            "fields": [
              { "name": "name", "label": "Name", "type": "text", "required": true }
            ]
          }
        }
      }
    },
    "/gallery": {
      "seo": {
        "title": "Gallery | Cosplay Restorations",
        "description": "See the results of our meticulous cleaning."
      },
      "sectionOrder": ["hero", "gallery_grid"],
      "sections": {
        "hero": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "blocks": [
              { "type": "heading", "text": "Our Best Work", "level": "h1" }
            ]
          }
        },
        "gallery_grid": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "blocks": [
              { "type": "heading", "text": "Featured Restorations", "level": "h2" }
            ]
          }
        }
      }
    }
  }
}
