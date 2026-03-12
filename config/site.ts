import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  "theme": {
    "mode": "light",
    "colors": {
      "primary": "#FF6B6B",
      "secondary": "#E6E6E6",
      "background": "#F8F9F9",
      "surface": "#F3F4F6",
      "muted": "#EDEDED",
      "accent": "#F59E0B",
      "text": "#111827"
    },
    "fontStyle": "sans",
    "borderRadius": "md"
  },
  "header": {
    "title": "Christine Bra",
    "links": [
      {
        "type": "link",
        "label": "Shop",
        "href": "/products"
      },
      {
        "type": "dropdown",
        "label": "Collections",
        "items": [
          {
            "type": "link",
            "label": "Bra Styles",
            "href": "/products"
          },
          {
            "type": "link",
            "label": "Activewear",
            "href": "/products"
          }
        ]
      },
      {
        "type": "link",
        "label": "About",
        "href": "/about"
      },
      {
        "type": "link",
        "label": "Contact",
        "href": "/contact"
      }
    ],
    "cta": {
      "type": "link",
      "label": "Explore Collections",
      "href": "/products"
    }
  },
  "footer": {
    "brand": {
      "title": "Christine Bra",
      "description": "Premium, professionally designed bras crafted in Point Cook, Melbourne."
    },
    "columns": [
      {
        "title": "Company",
        "links": [
          {
            "type": "link",
            "label": "About",
            "href": "/about"
          },
          {
            "type": "link",
            "label": "Contact",
            "href": "/contact"
          }
        ]
      },
      {
        "title": "Services",
        "links": [
          {
            "type": "link",
            "label": "Bra Fitting",
            "href": "/services"
          }
        ]
      }
    ],
    "social": [
      {
        "platform": "instagram",
        "url": "https://instagram.com/christinebra"
      },
      {
        "platform": "facebook",
        "url": "https://facebook.com/christinebra"
      }
    ],
    "copyright": "© 2026 Christine Bra. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Christine Customised Bras Co. – Custom Fit, Every Curve Celebrated",
        "description": "Discover luxurious, hand‑crafted bras tailored to your exact measurements for ultimate comfort and confidence."
      },
      "sectionOrder": [
        "hero",
        "testimonials",
        "blocks"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "fade",
            "width": "full",
            "headline": "Custom Fit, Every Curve Celebrated",
            "subheadline": "At Christine Customised Bras Co., we believe every woman deserves lingerie that fits like a second skin. Hand‑crafted to your exact measurements, our bras blend luxurious fabrics with innovative support so you feel confident from sunrise to sunset.",
            "ctaText": "Get Started",
            "imageName": "https://loremflickr.com/1600/900/fit,curve"
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "carousel",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "prose",
            "title": "What Our Clients Say",
            "subtitles": "Hear from women who finally found a bra that moves with them. Their stories highlight the perfect fit, lasting comfort, and the confidence that comes from truly customized lingerie.",
            "items": [
              {
                "quote": "I finally found a bra that stays put all day – the fit is miraculous!",
                "author": "Maya, 34"
              },
              {
                "quote": "The custom fit made me feel confident and comfortable all day long.",
                "author": "Jessica, 28"
              },
              {
                "quote": "I love how the bra moves with me, no pinching or slipping.",
                "author": "Aisha, 42"
              }
            ]
          }
        },
        "blocks": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "surface",
            "animation": "zoom-in",
            "width": "wide",
            "blocks": [
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/summer,bloom",
                        "alt": "Summer Bloom collection lifestyle shot",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Summer Bloom",
                        "level": "h3",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "View Collection",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/midnight,luxe",
                        "alt": "Midnight Luxe collection lifestyle shot",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Midnight Luxe",
                        "level": "h3",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "View Collection",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/active,grace",
                        "alt": "Active Grace collection lifestyle shot",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Active Grace",
                        "level": "h3",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "View Collection",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    },
    "/products": {
      "seo": {
        "title": "Christine Customised Bras Collection",
        "description": "Discover the Christine Customised Bras Collection. From everyday essentials to luxurious statement pieces, our bras are engineered for comfort, support, and style. Explore the full range and find the perfect fit that moves with you."
      },
      "sectionOrder": [
        "hero_1",
        "blocks_1"
      ],
      "sections": {
        "hero_1": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "full",
            "headline": "Discover the Christine Customised Bras Collection",
            "subheadline": "From everyday essentials to luxurious statement pieces, our bras are engineered for comfort, support, and style. Explore the full range and find the perfect fit that moves with you.",
            "ctaText": "",
            "imageName": "https://loremflickr.com/1600/900/christine,customised"
          }
        },
        "blocks_1": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Explore Our Range",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Use the intuitive filters to narrow by size, support level, fabric, and occasion. Each product card showcases key specs, material composition, and care instructions, giving you all the details you need to make an informed choice.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/everyday,bra",
                        "alt": "Everyday Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Everyday Comfort",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Wire-Free • Moisture-Wicking",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$49.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/sports,bra",
                        "alt": "Sports Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Active Support",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "High Impact • Breathable • Seamless",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$59.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/luxury,bra",
                        "alt": "Luxury Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Luxe Lace",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Handcrafted • Silk Detail • Limited Edition",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$129.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/seamless,bra",
                        "alt": "Seamless Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Invisible Comfort",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "T-Shirt Ready • No Lines • Soft Edge",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$44.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/maternity,bra",
                        "alt": "Maternity Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Nursing Essential",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Easy Access • Soft Cotton • Adaptive Fit",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$54.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/minimizer,bra",
                        "alt": "Minimizer Bra",
                        "spacing": "sm"
                      },
                      {
                        "type": "heading",
                        "text": "Smooth Silhouette",
                        "level": "h3",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Full Coverage • Back Smoothing • Minimizing",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "$64.99",
                        "align": "left",
                        "spacing": "sm"
                      },
                      {
                        "type": "button",
                        "label": "Quick View",
                        "href": "#",
                        "variant": "outline",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    },
    "/about": {
      "seo": {
        "title": "Christine Customised Bras Co. – Bespoke Lingerie",
        "description": "Discover handcrafted, perfectly fitted bras that blend luxury, sustainability, and personal style."
      },
      "sectionOrder": [
        "hero_section",
        "artisanal_journey",
        "christine_difference",
        "sustainable_luxury",
        "experience_difference"
      ],
      "sections": {
        "hero_section": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Crafting Confidence, One Stitch at a Time",
            "subheadline": "Welcome to Christine Customised Bras Co., where every woman deserves lingerie that fits perfectly and feels extraordinary. Founded on the belief that comfort and beauty should never be compromised, we create bespoke bras tailored to your unique shape, lifestyle, and style preferences.",
            "ctaText": "Get Started",
            "ctaLink": "/",
            "imageName": "https://loremflickr.com/1600/900/crafting,confidence"
          }
        },
        "artisanal_journey": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/journey",
                "alt": "Artisanal journey",
                "caption": "Our Artisanal Journey",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "At Christine Customised Bras Co., we believe that true luxury lies in the details. Our Melbourne workshop is where traditional craftsmanship meets modern innovation, creating pieces that celebrate the individuality of every woman.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        },
        "christine_difference": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/consultation,final",
                "alt": "Consultation and final product",
                "caption": "The Christine Difference",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Every bra we create is more than just lingerie – it's a statement of self-care and self-love. Our meticulous process begins with a personal consultation, where we listen to your needs and measure with precision. From there, our skilled artisans handcraft each piece using premium materials sourced from sustainable suppliers.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        },
        "sustainable_luxury": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/sustainable,materials",
                "alt": "Sustainable materials",
                "caption": "Sustainable Luxury",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "We're committed to creating beautiful bras without compromising our planet. Our sustainable practices include using eco-friendly fabrics, minimizing waste through precision cutting, and ensuring fair wages for our artisans. When you choose Christine Customised Bras Co., you're investing in lingerie that's as kind to the Earth as it is to your body.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        },
        "experience_difference": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/workshop,entrance",
                "alt": "Workshop entrance",
                "caption": "Experience the Difference",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Ready to discover what truly personalized lingerie feels like? Visit our Melbourne workshop or book a virtual consultation to begin your journey toward bras that fit like they were made just for you – because they are.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        }
      }
    },
    "/services": {
      "seo": {
        "title": "Crafted for You: Bespoke Bras Designed to Your Measurements",
        "description": "At Christine Customised Bras Co., every detail is tailored to your unique silhouette. Our expert fitters combine artistry with precision to create bras that adapt to your lifestyle, comfort, and aesthetic."
      },
      "sectionOrder": [
        "hero",
        "pricing",
        "blocks"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "split",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Crafted for You: Bespoke Bras Designed to Your Measurements",
            "subheadline": "At Christine Customised Bras Co., every detail is tailored to your unique silhouette. Our expert fitters combine artistry with precision to create bras that adapt to your lifestyle, comfort, and aesthetic.",
            "ctaText": "Get Started",
            "ctaLink": "/pricing",
            "imageName": "https://loremflickr.com/1600/900/crafted,bras"
          }
        },
        "pricing": {
          "type": "pricing",
          "variant": "detailed",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Elevate Your Comfort: Tailored Packages for Every Need",
            "description": "Choose a package that aligns with your priorities: Essentials, Luxury, or Custom.",
            "categories": [
              {
                "name": "Essentials",
                "items": [
                  {
                    "label": "Eco-friendly fabric",
                    "price": "$75",
                    "details": "Basic design with signature sustainable material"
                  }
                ]
              },
              {
                "name": "Luxury",
                "items": [
                  {
                    "label": "Silk lining",
                    "price": "$120",
                    "details": "Premium detailing with adjustable straps"
                  }
                ]
              },
              {
                "name": "Custom",
                "items": [
                  {
                    "label": "Full personalization",
                    "price": "Quote required",
                    "details": "Includes fabric choice, color, and embellishments"
                  }
                ]
              }
            ]
          }
        },
        "blocks": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Your Fabric, Your Style: Choose What Matters Most",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Select from our curated collection of fabrics - Silk, Organic Cotton, or Recycled Polyester - each designed for specific needs.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/fabric,swatch",
                "alt": "Fabric swatch collection",
                "caption": "Textured close-ups of each fabric type",
                "spacing": "md"
              },
              {
                "type": "button",
                "label": "Start Customization",
                "href": "/pricing",
                "variant": "primary",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        }
      }
    }
  }
};