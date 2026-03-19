import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  "theme": {
    "mode": "light",
    "preset": "elegantMinimal",
    "colors": {
      "primary": "#171717",
      "secondary": "#525252",
      "background": "#FAFAFA",
      "surface": "#FFFFFF",
      "muted": "#F5F5F5",
      "accent": "#A3A3A3",
      "text": "#171717"
    },
    "fontStyle": "serif",
    "typographyScale": "editorial",
    "borderRadius": "sm",
    "containerStyle": "default"
  },
  "header": {
    "title": "Timber & Light",
    "variant": "default",
    "links": [
      {
        "type": "link",
        "label": "Home",
        "href": "/"
      },
      {
        "type": "link",
        "label": "About",
        "href": "/about"
      },
      {
        "type": "link",
        "label": "Collections",
        "href": "/collections"
      },
      {
        "type": "link",
        "label": "Services",
        "href": "/services"
      },
      {
        "type": "link",
        "label": "Contact",
        "href": "/contact"
      }
    ],
    "cta": {
      "type": "link",
      "label": "View Portfolio",
      "href": "/collections"
    }
  },
  "footer": {
    "brand": {
      "title": "Timber & Light",
      "description": "Bespoke timber furniture and artisanal lighting, handcrafted for contemporary living."
    },
    "columns": [
      {
        "title": "Collections",
        "links": [
          {
            "type": "link",
            "label": "Dining Tables",
            "href": "/collections"
          },
          {
            "type": "link",
            "label": "Seating",
            "href": "/collections"
          },
          {
            "type": "link",
            "label": "Lighting",
            "href": "/collections"
          },
          {
            "type": "link",
            "label": "Custom Work",
            "href": "/services"
          }
        ]
      },
      {
        "title": "Company",
        "links": [
          {
            "type": "link",
            "label": "About Us",
            "href": "/about"
          },
          {
            "type": "link",
            "label": "Our Process",
            "href": "/services/process"
          },
          {
            "type": "link",
            "label": "Sustainability",
            "href": "/about"
          }
        ]
      },
      {
        "title": "Connect",
        "links": [
          {
            "type": "link",
            "label": "Contact",
            "href": "/contact"
          },
          {
            "type": "link",
            "label": "Book Consultation",
            "href": "/contact#form"
          },
          {
            "type": "link",
            "label": "Showroom",
            "href": "/collections"
          }
        ]
      }
    ],
    "social": [
      {
        "platform": "twitter",
        "url": "https://twitter.com/timberandlight"
      },
      {
        "platform": "instagram",
        "url": "https://instagram.com/timberandlight"
      },
      {
        "platform": "linkedin",
        "url": "https://linkedin.com/company/timberandlight"
      }
    ],
    "copyright": "© 2025 Timber & Light. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Timeless Craftsmanship Meets Modern Living | Chris & Co. Furniture",
        "description": "Discover handcrafted timber furniture and bespoke lighting designed to elevate your home. Explore our curated collection inspired by traditional craftsmanship and contemporary minimalism."
      },
      "sectionOrder": [
        "hero",
        "testimonials",
        "storytelling",
        "gallery"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "split",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Timeless Craftsmanship Meets Modern Living",
            "subheadline": "Discover handcrafted timber furniture and bespoke lighting designed to elevate your home.",
            "ctaText": "Explore Collection",
            "ctaLink": "/collections",
            "imageName": "https://loremflickr.com/1600/900/timeless?lock=642587"
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "What Our Clients Say",
            "items": [
              {
                "quote": "Working with Chris & Co. was a dream. Their attention to detail and quality craftsmanship transformed our office space into a masterpiece.",
                "author": "Sarah L.",
                "role": "Interior Designer"
              },
              {
                "quote": "The attention to detail here is unmatched. My go-to for bespoke leather goods.",
                "author": "Marcus Aurelius",
                "role": "Frequent Traveler"
              }
            ]
          }
        },
        "storytelling": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Crafted with Intention",
                "level": "display",
                "align": "center",
                "decoration": "none",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Since 1998, Chris & Co. has blended traditional woodworking techniques with contemporary design. Each piece is a testament to our commitment to sustainability and artistry.",
                "align": "center",
                "spacing": "lg"
              },
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/chris?lock=748430",
                "alt": "Chris & Co. woodworking workshop",
                "aspect": "portrait",
                "spacing": "md"
              }
            ]
          }
        },
        "gallery": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "image-grid",
                "images": [
                  {
                    "src": "https://loremflickr.com/1600/900/signature?lock=633201",
                    "alt": "Signature Dining Table",
                    "caption": "Luxury Finish"
                  },
                  {
                    "src": "https://loremflickr.com/1600/900/handcrafted?lock=88428",
                    "alt": "Handcrafted Coffee Table",
                    "caption": "Natural Grain"
                  },
                  {
                    "src": "https://loremflickr.com/1600/900/pendant?lock=923222",
                    "alt": "Pendant Lighting",
                    "caption": "Modern Elegance"
                  },
                  {
                    "src": "https://loremflickr.com/1600/900/cabinetry?lock=698326",
                    "alt": "Custom Cabinetry",
                    "caption": "Bespoke Design"
                  }
                ],
                "columns": "4",
                "gap": "lg",
                "aspect": "square",
                "spacing": "md"
              }
            ]
          }
        }
      }
    },
    "/about": {
      "seo": {
        "title": "Discover Craftsmanship Meets Comfort | Chris & Co. Furniture",
        "description": "At Chris & Co. Furniture, we blend timeless design with modern functionality. Explore our collection of bespoke pieces crafted for those who value quality and precision."
      },
      "sectionOrder": [
        "hero",
        "form",
        "blocks",
        "map",
        "testimonials"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Discover Craftsmanship Meets Comfort",
            "subheadline": "At Chris & Co. Furniture, we blend timeless design with modern functionality. Explore our collection of bespoke pieces crafted for those who value quality and precision.",
            "ctaText": "Get Started",
            "ctaLink": "/contact#form",
            "imageName": "https://loremflickr.com/1600/900/craftsmanship?lock=461620"
          }
        },
        "form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "muted",
            "animation": "fade",
            "width": "default",
            "padding": "sm",
            "title": "Share Your Vision",
            "fields": [
              {
                "name": "name",
                "label": "Your Name",
                "type": "text",
                "required": true
              },
              {
                "name": "email",
                "label": "Email Address",
                "type": "email",
                "required": true
              }
            ],
            "submitLabel": "Submit"
          }
        },
        "blocks": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Our Strengths Unfold",
                "level": "h2",
                "align": "center",
                "decoration": "none",
                "spacing": "lg"
              },
              {
                "type": "feature",
                "icon": "Zap",
                "title": "Fast Performance",
                "description": "Lightning fast load times for all users.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "feature",
                "icon": "Mappin",
                "title": "Visit Us",
                "description": "123 Boutique Lane, Melbourne VIC 3000",
                "variant": "compact",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "feature",
                "icon": "Check",
                "title": "Premium Fabric",
                "description": "Includes wash and style.",
                "variant": "horizontal",
                "align": "center",
                "spacing": "md"
              }
            ]
          }
        },
        "map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "primary",
            "animation": "slide-up",
            "width": "wide",
            "padding": "none",
            "title": "Rooted in Community",
            "address": "123 Boutique Lane, Melbourne VIC 3000",
            "zoom": 14
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "secondary",
            "animation": "slide-up",
            "width": "default",
            "padding": "sm",
            "title": "Client Impact",
            "items": [
              {
                "quote": "This furniture is exactly what we needed for our home.",
                "author": "Sarah T.",
                "role": "Customer",
                "avatar": "sarah.jpg"
              },
              {
                "quote": "The craftsmanship and attention to detail are exceptional.",
                "author": "Mike R.",
                "role": "Client",
                "avatar": "mike.jpg"
              }
            ]
          }
        }
      }
    },
    "/collections": {
      "seo": {
        "title": "Discover the Art of Living - Curated Timber Furniture Collections",
        "description": "Explore hand-picked timber furniture collections blending craftsmanship with contemporary design. Discover modern lounges, rustic offices, and elegant dining sets for your home."
      },
      "sectionOrder": [
        "hero",
        "portfolio",
        "inspiration"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "default",
            "padding": "sm",
            "headline": "Discover the Art of Living",
            "subheadline": "From sleek sofas to timeless dining sets, explore hand-picked collections that blend craftsmanship with contemporary design.",
            "ctaText": "Explore Collections",
            "imageName": "https://loremflickr.com/1600/900/art?lock=766615",
            "ctaLink": "/collections#portfolio"
          }
        },
        "portfolio": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "container",
                "variant": "card",
                "position": "relative",
                "background": "surface",
                "padding": "md",
                "blocks": [
                  {
                    "type": "image",
                    "src": "https://loremflickr.com/1600/900/lounge?lock=27275",
                    "alt": "Modern lounge collection featuring sleek sofas and contemporary design",
                    "caption": "Modern Living",
                    "aspect": "video",
                    "spacing": "md"
                  },
                  {
                    "type": "feature",
                    "icon": "Zap",
                    "title": "Modern Collection",
                    "description": "Clean lines and minimalist forms for contemporary spaces",
                    "variant": "compact",
                    "align": "left",
                    "spacing": "sm"
                  },
                  {
                    "type": "text",
                    "content": "Sleek sofas, modular seating, and statement coffee tables crafted from premium timbers.",
                    "align": "left",
                    "spacing": "sm"
                  }
                ],
                "spacing": "md"
              },
              {
                "type": "container",
                "variant": "card",
                "position": "relative",
                "background": "surface",
                "padding": "md",
                "blocks": [
                  {
                    "type": "image",
                    "src": "https://loremflickr.com/1600/900/heritage?lock=548021",
                    "alt": "Heritage collection featuring rustic timber dining set and classic designs",
                    "caption": "Heritage Living",
                    "aspect": "video",
                    "spacing": "md"
                  },
                  {
                    "type": "feature",
                    "icon": "Star",
                    "title": "Heritage Collection",
                    "description": "Timeless pieces with traditional craftsmanship and warm timbers",
                    "variant": "compact",
                    "align": "left",
                    "spacing": "sm"
                  },
                  {
                    "type": "text",
                    "content": "Rustic dining tables, classic armchairs, and heirloom-quality storage solutions.",
                    "align": "left",
                    "spacing": "sm"
                  }
                ],
                "spacing": "md"
              },
              {
                "type": "container",
                "variant": "card",
                "position": "relative",
                "background": "surface",
                "padding": "md",
                "blocks": [
                  {
                    "type": "image",
                    "src": "https://loremflickr.com/1600/900/boutique?lock=725943",
                    "alt": "Boutique collection featuring hand-woven rug and unique accent pieces",
                    "caption": "Boutique Living",
                    "aspect": "video",
                    "spacing": "md"
                  },
                  {
                    "type": "feature",
                    "icon": "Palette",
                    "title": "Boutique Collection",
                    "description": "Artisan-crafted statement pieces and unique design accents",
                    "variant": "compact",
                    "align": "left",
                    "spacing": "sm"
                  },
                  {
                    "type": "text",
                    "content": "Hand-woven textiles, sculptural lighting, and bespoke accessories for distinctive interiors.",
                    "align": "left",
                    "spacing": "sm"
                  }
                ],
                "spacing": "md"
              }
            ]
          }
        },
        "inspiration": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "surface",
            "animation": "zoom-in",
            "width": "default",
            "padding": "lg",
            "blocks": [
              {
                "type": "columns",
                "layout": "split",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/home?lock=321185",
                        "alt": "Modern home office with timber furniture and natural lighting",
                        "caption": "Inspired Spaces",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "container",
                        "variant": "card",
                        "position": "relative",
                        "background": "surface",
                        "padding": "lg",
                        "blocks": [
                          {
                            "type": "heading",
                            "text": "The Material Story",
                            "level": "h3",
                            "align": "left",
                            "decoration": "line-left",
                            "spacing": "md"
                          },
                          {
                            "type": "text",
                            "content": "Every timber piece tells a story of sustainable forests and skilled craftsmanship. Our American Oak is quarter-sawn for stability, revealing distinctive grain patterns that make each table unique. The natural oil finish enhances the wood's character while providing lasting protection.",
                            "align": "left",
                            "spacing": "md"
                          },
                          {
                            "type": "spacer",
                            "size": "sm"
                          },
                          {
                            "type": "text",
                            "content": "We partner with family-owned mills committed to responsible forestry. This means your furniture not only looks beautiful but also supports healthy forest ecosystems for generations to come.",
                            "align": "left",
                            "spacing": "md"
                          }
                        ],
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "container",
                        "variant": "card",
                        "position": "relative",
                        "background": "surface",
                        "padding": "lg",
                        "blocks": [
                          {
                            "type": "heading",
                            "text": "Artisan Details",
                            "level": "h3",
                            "align": "left",
                            "decoration": "line-left",
                            "spacing": "md"
                          },
                          {
                            "type": "text",
                            "content": "The beauty lies in the details—hand-turned legs, dovetail joinery, and carefully matched wood grain. Our craftspeople spend years perfecting techniques that machines cannot replicate, ensuring each piece carries the mark of human artistry.",
                            "align": "left",
                            "spacing": "md"
                          },
                          {
                            "type": "spacer",
                            "size": "sm"
                          },
                          {
                            "type": "text",
                            "content": "From traditional mortise and tenon to modern hidden hardware, every joint serves both form and function. This dedication to craft means your furniture will last generations while maintaining its aesthetic appeal.",
                            "align": "left",
                            "spacing": "md"
                          }
                        ],
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/close?lock=618139",
                        "alt": "Close-up macro shot of timber grain and hand-finished surface",
                        "caption": "Craftsmanship Close-Up",
                        "aspect": "portrait",
                        "spacing": "md"
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
    "/services": {
      "seo": {
        "title": "Chris & Co. Furniture | Bespoke Custom Furniture",
        "description": "Chris & Co. Furniture transforms your ideas into heirloom-quality, custom pieces. From initial sketch to final installation, we partner with you to create furniture that’s uniquely yours."
      },
      "sectionOrder": [
        "hero",
        "services",
        "process",
        "caseStudy"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "full",
            "padding": "sm",
            "headline": "Your Vision, Masterfully Crafted",
            "subheadline": "Chris & Co. Furniture transforms your ideas into heirloom-quality, custom pieces. From initial sketch to final installation, we partner with you to create furniture that’s uniquely yours.",
            "ctaText": "",
            "imageName": "https://loremflickr.com/1600/900/vision?lock=152723"
          }
        },
        "services": {
          "type": "services",
          "variant": "grid",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Our Bespoke Services",
            "items": [
              {
                "icon": "Pencil",
                "title": "Bespoke Design Consultations",
                "description": "Collaborative sessions to explore layouts, materials, and finishes—all personalized to your home."
              },
              {
                "icon": "Wrench",
                "title": "Custom Furniture Creation",
                "description": "From sofas to dining tables, each piece is handcrafted in our workshop using sustainably sourced, premium materials."
              },
              {
                "icon": "Lightbulb",
                "title": "Lighting & Accessory Installations",
                "description": "Seamless integration of curated lighting, hardware, and accessories to elevate your custom pieces."
              }
            ]
          }
        },
        "process": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "surface",
            "animation": "zoom-in",
            "width": "wide",
            "padding": "lg",
            "blocks": [
              {
                "type": "heading",
                "text": "The Chris & Co. Process",
                "level": "h2",
                "align": "left",
                "decoration": "none",
                "spacing": "none"
              },
              {
                "type": "text",
                "content": "A transparent, collaborative journey from concept to completion.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "columns",
                "layout": "split-right",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "1. Discovery",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "none"
                      },
                      {
                        "type": "text",
                        "content": "We listen—to your needs, space, and inspiration—laying the foundation for a truly personalized design.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/design?lock=667410",
                        "alt": "Design meeting with client",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split-left",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/sketches?lock=667969",
                        "alt": "Sketches and material samples",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "2. Design",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "none"
                      },
                      {
                        "type": "text",
                        "content": "Detailed renderings, material boards, and 3D models bring your vision to life for approval.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split-right",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "3. Crafting",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "none"
                      },
                      {
                        "type": "text",
                        "content": "Our artisans meticulously build your piece in-house, with progress updates at every stage.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/artisans?lock=911567",
                        "alt": "Artisans crafting furniture in workshop",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split-left",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/installation?lock=502005",
                        "alt": "Installation of furniture in home",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "4. Installation",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "none"
                      },
                      {
                        "type": "text",
                        "content": "White-glove delivery and installation, ensuring a perfect fit and finish in your home.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "caseStudy": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "secondary",
            "animation": "none",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Project Spotlight: The Rivera Family Library",
                "level": "h2",
                "align": "left",
                "decoration": "none",
                "spacing": "none"
              },
              {
                "type": "text",
                "content": "A custom-built, floor-to-ceiling library that blends traditional craftsmanship with modern functionality.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "testimonial-card",
                "quote": "They didn’t just build shelves—they created a legacy room. Every curve, every wood choice felt like it was made for our family.",
                "author": "Elena Rivera",
                "role": "Custom Home Library",
                "avatar": "https://loremflickr.com/1600/900/elena?lock=643467",
                "spacing": "md"
              },
              {
                "type": "testimonial-card",
                "quote": "The team’s attention to detail was extraordinary. They hid wiring for lighting, integrated a ladder system, and used wood from our own land.",
                "author": "Miguel Rivera",
                "role": "Custom Home Library",
                "avatar": "https://loremflickr.com/1600/900/miguel?lock=838648",
                "spacing": "none"
              }
            ]
          }
        }
      }
    },
    "/contact": {
      "seo": {
        "title": "Contact Chris & Co. Furniture | Bespoke Luxury Timber Design",
        "description": "Experience timeless craftsmanship and bespoke timber furniture. Schedule a consultation or visit our showroom in Melbourne. Discover our collection of luxury pieces today."
      },
      "sectionOrder": [
        "hero",
        "map",
        "form",
        "testimonials"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "split",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Bring Your Vision to Life with Chris & Co. Furniture",
            "subheadline": "Where Style Meets Craft",
            "ctaText": "Get Started",
            "ctaLink": "/contact/consultation",
            "imageName": "https://loremflickr.com/1600/900/bring?lock=748997"
          }
        },
        "map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Showroom Location",
            "address": "123 Boutique Lane, Melbourne VIC 3000",
            "zoom": 14
          }
        },
        "form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Request a Custom Quote",
            "description": "Tell us about your project and receive a personalized quote within 24 hours.",
            "fields": [
              {
                "name": "name",
                "label": "Full Name",
                "type": "text",
                "required": true
              },
              {
                "name": "email",
                "label": "Email Address",
                "type": "email",
                "required": true
              },
              {
                "name": "projectType",
                "label": "Project Type",
                "type": "select",
                "options": [
                  "Custom Furniture",
                  "Renovation",
                  "Restoration"
                ],
                "required": true
              }
            ],
            "submitLabel": "Send Request"
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "What Our Clients Say",
            "items": []
          }
        }
      }
    },
    "/services/process": {
      "seo": {
        "title": "Crafting Spaces, Step by Step",
        "description": "Explore the art of handcrafted furniture with Chris & Co. Discover our process from concept to delivery, blending traditional craftsmanship with modern minimalism."
      },
      "sectionOrder": [
        "hero",
        "blocks"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Crafting Spaces, Step by Step",
            "subheadline": "Discover how Chris & Co. Furniture turns your ideas into handcrafted pieces, from first sketch to final placement.",
            "ctaText": "Get Started",
            "ctaLink": "/contact#form",
            "imageName": "https://loremflickr.com/1600/900/crafting?lock=975256"
          }
        },
        "blocks": {
          "type": "services",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Our Process",
            "items": [
              {
                "icon": "Lightbulb",
                "title": "Concept",
                "description": "We sit down, listen, and map your style."
              },
              {
                "icon": "Blueprint",
                "title": "Design",
                "description": "Detailed sketches and 3D models bring ideas to life."
              },
              {
                "icon": "Hammerchisel",
                "title": "Craft",
                "description": "Master artisans hand-craft each piece with premium materials."
              },
              {
                "icon": "Truck",
                "title": "Delivery",
                "description": "Thoughtful logistics and flawless setup complete the journey."
              }
            ]
          }
        }
      }
    },
    "/contact/consultation": {
      "seo": {
        "title": "Your Furniture Vision, Realized | Chris & Co.",
        "description": "Schedule a personalized consultation to explore custom furniture solutions tailored to your space and style. Experience the Chris & Co. difference with expert guidance and no-obligation design consultations."
      },
      "sectionOrder": [
        "hero",
        "blocks_1",
        "blocks_2",
        "blocks_3",
        "blocks_4",
        "blocks_5"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Your Furniture Vision, Realized",
            "subheadline": "Schedule a personalized consultation to explore custom solutions tailored to your space and style",
            "ctaText": "Schedule Consultation",
            "ctaLink": "/contact#form",
            "imageName": "https://loremflickr.com/1600/900/furniture?lock=793087"
          }
        },
        "blocks_1": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "feature",
                "icon": "Check",
                "title": "Tailored to Your Vision",
                "description": "Every consultation is customized to your unique style, space, and budget. Your vision comes first—no pressure, just possibilities.",
                "variant": "vertical",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        },
        "blocks_2": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "columns",
                "layout": "split-left",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Discovery Call",
                        "level": "h2",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "We start with a conversation to understand your needs, style preferences, and project scope.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/designer?lock=824908",
                        "alt": "Designer and client discussing furniture options",
                        "aspect": "portrait",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split-right",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "In-Home or Showroom Visit",
                        "level": "h2",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "We assess your space in person or welcome you to our showroom to explore fabrics, finishes, and furniture.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/client?lock=561666",
                        "alt": "Client and designer reviewing fabrics in a showroom",
                        "aspect": "portrait",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "columns",
                "layout": "split-left",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Custom Proposal",
                        "level": "h2",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Within 48 hours, you’ll receive a detailed proposal with design concepts, quotes, and timelines.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/designer?lock=460605",
                        "alt": "Designer presenting furniture proposal to client",
                        "aspect": "portrait",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "blocks_3": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "testimonial-card",
                "quote": "The attention to detail here is unmatched. My go-to for bespoke leather goods.",
                "author": "Sarah T.",
                "role": "Satisfied Client",
                "spacing": "md",
                "avatar": "https://loremflickr.com/1600/900/business?lock=114664"
              }
            ]
          }
        },
        "blocks_4": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "price-list",
                "variant": "minimal",
                "categories": [
                  {
                    "name": "Consultation Inclusions",
                    "items": [
                      {
                        "label": "1-hour personalized consultation",
                        "price": ""
                      },
                      {
                        "label": "Custom mood board",
                        "price": ""
                      },
                      {
                        "label": "Fabric and finish samples",
                        "price": ""
                      },
                      {
                        "label": "Detailed project quote",
                        "price": ""
                      },
                      {
                        "label": "30-day design support",
                        "price": ""
                      }
                    ]
                  }
                ],
                "spacing": "md"
              }
            ]
          }
        },
        "blocks_5": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "feature",
                "icon": "Zap",
                "title": "Why Choose a Chris & Co. Consultation?",
                "description": "Our consultations are more than meetings—they’re collaborative journeys from vision to reality. Discover how we make the process seamless and inspiring.",
                "variant": "vertical",
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