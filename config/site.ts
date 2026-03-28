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
    "fontStyle": "sans",
    "typographyScale": "standard",
    "borderRadius": "md",
    "containerStyle": "default"
  },
  "header": {
    "title": "Chris Cafetaria",
    "variant": "centered",
    "announcement": "Now Open in Melbourne",
    "links": [
      {
        "type": "link",
        "label": "Menu",
        "href": "/menu"
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
      "label": "Order Online",
      "href": "/#"
    }
  },
  "footer": {
    "brand": {
      "title": "Chris Cafetaria",
      "description": "Artisanal coffee & gourmet pastries in a cozy Melbourne haven"
    },
    "columns": [
      {
        "title": "Menu",
        "links": [
          {
            "type": "link",
            "label": "Coffee",
            "href": "/menu#coffee"
          },
          {
            "type": "link",
            "label": "Pastries",
            "href": "/menu#pastries"
          },
          {
            "type": "link",
            "label": "Specials",
            "href": "/menu#specials"
          }
        ]
      },
      {
        "title": "About",
        "links": [
          {
            "type": "link",
            "label": "Our Story",
            "href": "/about#story"
          },
          {
            "type": "link",
            "label": "Team",
            "href": "/about#team"
          },
          {
            "type": "link",
            "label": "Sustainability",
            "href": "/about#sustainability"
          }
        ]
      },
      {
        "title": "Contact",
        "links": [
          {
            "type": "link",
            "label": "Location",
            "href": "/contact#location"
          },
          {
            "type": "link",
            "label": "Hours",
            "href": "/contact#hours"
          },
          {
            "type": "link",
            "label": "Email",
            "href": "mailto:info@chriscafetaria.com"
          }
        ]
      }
    ],
    "social": [
      {
        "platform": "instagram",
        "url": "https://instagram.com/chriscafetaria"
      },
      {
        "platform": "facebook",
        "url": "https://facebook.com/chriscafetaria"
      }
    ],
    "copyright": "© 2026 Chris Cafetaria. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Chris Cafetaria - Handcrafted Coffee & Artisanal Pastries",
        "description": "Experience boutique coffee culture in Point Cook. Small-batch roasted, community-driven café serving specialty brews and curated pastries."
      },
      "sectionOrder": [
        "hero-section",
        "testimonials-section",
        "signature-brews",
        "point-cook-story"
      ],
      "sections": {
        "hero-section": {
          "type": "hero",
          "variant": "visual",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "full",
            "padding": "md",
            "headline": "Brewed with Craft, Served with Soul",
            "subheadline": "At Chris Cafetaria, we're obsessed with crafting coffee that tells a story. From our Point Cook roastery to your cup, every bean is handpicked, roasted small-batch, and served with passion. Explore our menu or find us locally—your next great coffee moment starts here.",
            "ctaText": "Explore Menu",
            "ctaLink": "/menu",
            "imageName": "https://loremflickr.com/1600/900/brewed?lock=563923",
            "imagePosition": "right"
          }
        },
        "testimonials-section": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "What Our Customers Say",
            "subtitles": "",
            "items": [
              {
                "quote": "A little paradise in Point Cook. The espresso here is life-changing, and the pastries are too good to resist!",
                "author": "Sarah L.",
                "role": "Local Resident"
              },
              {
                "quote": "Cozy, community-driven spot with the best flat white in town. Highly recommend!",
                "author": "James T.",
                "role": "Regular Customer"
              },
              {
                "quote": "The attention to detail here is unmatched. My go-to for bespoke leather goods.",
                "author": "Marcus Aurelius",
                "role": "Frequent Traveler"
              }
            ]
          }
        },
        "signature-brews": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "surface",
            "animation": "zoom-in",
            "width": "wide",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Our Signature Flavors",
                "level": "display",
                "align": "center",
                "decoration": "line-bottom",
                "spacing": "lg"
              },
              {
                "type": "feature",
                "icon": "Coffee",
                "title": "EspressoBlend 92",
                "description": "A bold, velvety espresso with notes of dark chocolate. Perfect for late-night productivity.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "feature",
                "icon": "Cup",
                "title": "Sunrise Pastry Box",
                "description": "A curated assortment of almond croissants, fruit tarts, and honey drizzle donuts.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "image-grid",
                "images": [
                  {
                    "src": "https://loremflickr.com/1600/900/close?lock=174410",
                    "alt": "Close-up of premium coffee beans",
                    "caption": "Handpicked Beans"
                  },
                  {
                    "src": "https://loremflickr.com/1600/900/pastry?lock=278093",
                    "alt": "Artisanal pastry assortment",
                    "caption": "Fresh Pastries"
                  },
                  {
                    "src": "https://loremflickr.com/1600/900/barista?lock=253201",
                    "alt": "Barista creating latte art",
                    "caption": "Crafted with Care"
                  }
                ],
                "columns": "3",
                "gap": "md",
                "aspect": "square",
                "spacing": "lg"
              }
            ]
          }
        },
        "point-cook-story": {
          "type": "blocks",
          "variant": "full",
          "props": {
            "background": "secondary",
            "animation": "slide-up",
            "width": "full",
            "padding": "md",
            "blocks": [
              {
                "type": "columns",
                "layout": "split",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Where Flavor Meets Community",
                        "level": "display",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "lg"
                      },
                      {
                        "type": "text",
                        "content": "Nestled in the heart of Point Cook, our café is more than a place to grab coffee—it's a hub for local artists, remote workers, and coffee lovers. With outdoor seating under string lights and a chalkboard menu updated weekly, it's where stories brew.",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "icon",
                        "name": "Mappin",
                        "size": "md",
                        "color": "primary",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "123 Coffee Lane, Point Cook VIC 3030",
                        "align": "left",
                        "spacing": "sm"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/chris?lock=939569",
                        "alt": "Chris Cafetaria exterior with string lights and outdoor seating",
                        "aspect": "video",
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
    "/menu": {
      "seo": {
        "title": "Chris Cafetaria Menu",
        "description": "Discover our menu at Chris Cafetaria, featuring expertly roasted coffees, house-baked pastries, and seasonal specials made with fresh, local ingredients."
      },
      "sectionOrder": [
        "hero",
        "coffee",
        "pastries",
        "meals"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "visual",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Explore Our Full Menu",
            "subheadline": "From expertly roasted coffees to house-baked pastries and seasonal bites, discover everything Chris Cafetaria has to offer.",
            "ctaText": "Explore Our Full Menu",
            "ctaLink": "#menu",
            "imageName": "https://loremflickr.com/1600/900/full?lock=851873",
            "imagePosition": "right"
          }
        },
        "coffee": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "icon",
                        "name": "EspressoCup",
                        "size": "md",
                        "color": "primary",
                        "align": "left",
                        "spacing": "none"
                      },
                      {
                        "type": "heading",
                        "text": "Espresso Blends",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Expertly crafted espresso blends for a rich, bold flavor.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "Single-Origin Beans",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Single-Origin Beans",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Sourced from the finest global coffee regions.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "Pour-Over Methods",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Pour-Over Methods",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Freshly brewed pour-over coffee for a smooth, clean taste.",
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
        "pastries": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "icon",
                        "name": "Croissant",
                        "size": "md",
                        "color": "primary",
                        "align": "left",
                        "spacing": "none"
                      },
                      {
                        "type": "heading",
                        "text": "Freshly Baked Pastries",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Daily baked with premium ingredients and seasonal flavors.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "Seasonal Bakes",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Seasonal Bakes",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Rotating selection of gourmet pastries and baked goods.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "Gourmet Fillings",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "heading",
                        "text": "Gourmet Fillings",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Handcrafted fillings for a taste of artisanal quality.",
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
        "meals": {
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
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/quinoa?lock=157185",
                        "alt": "Quinoa Black Bean Bowl",
                        "caption": "Quinoa Black Bean Bowl with citrus vinaigrette",
                        "aspect": "portrait",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Light Meals & Seasonal Specials",
                        "level": "display",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Enjoy nourishing bowls, salads, and rotating specials that highlight fresh, local produce.",
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
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/seasonal?lock=271575",
                        "alt": "Seasonal Salad",
                        "caption": "Seasonal Greens Salad with citrus vinaigrette",
                        "aspect": "portrait",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Rotating Specials",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Explore our current specials featuring local, seasonal ingredients.",
                        "align": "left",
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
    "/about": {
      "seo": {
        "title": "Chris Cafetaria – About Us",
        "description": "Discover the artisanal coffee, handcrafted pastries, and passionate team behind Chris Cafetaria's unique café experience."
      },
      "sectionOrder": [
        "hero",
        "coffee-features",
        "pastry-craft",
        "team-testimonials"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "visual",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "headline": "Where Coffee Meets Craftsmanship",
            "subheadline": "At Chris Cafetaria, every cup tells a story. Since 2010, we’ve blended passion for quality beans, artisanal roasting, and community spirit into every sip.",
            "ctaText": "Explore Our Story",
            "ctaLink": "#about",
            "imageName": "https://loremflickr.com/1600/900/where?lock=740379",
            "imagePosition": "right"
          }
        },
        "coffee-features": {
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
                "icon": "Globe",
                "title": "Direct Trade Relationships",
                "description": "We source beans from small-scale farmers in Colombia and Ethiopia, ensuring fair wages and sustainable practices.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "feature",
                "icon": "Flame",
                "title": "Small-Batch Roasting",
                "description": "Our slow-roast process in Brooklyn preserves each bean’s unique flavor profile, avoiding mass production shortcuts.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "feature",
                "icon": "Clock",
                "title": "Freshness Guaranteed",
                "description": "Beans are roasted daily and ground-to-order, ensuring peak aroma and taste in every cup.",
                "variant": "vertical",
                "align": "center",
                "spacing": "md"
              }
            ]
          }
        },
        "pastry-craft": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "columns",
                "layout": "split-right",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Sweet Science: Baking with Purpose",
                        "level": "h2",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "none"
                      },
                      {
                        "type": "text",
                        "content": "Every morning, our pastry team hand‑kneads dough using heirloom recipes passed down through generations. From sourdough croissants to seasonal fruit tarts, we prioritize texture and flavor balance.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/freshly?lock=898811",
                        "alt": "Freshly baked croissant",
                        "caption": "Golden croissant on marble counter",
                        "aspect": "square",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "team-testimonials": {
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
                "quote": "I’ve been crafting latte art since 2015. My favorite part? Seeing customers’ faces light up when they taste our honey‑lavender espresso.",
                "author": "María",
                "role": "Head Barista",
                "spacing": "md",
                "avatar": "https://loremflickr.com/1600/900/business?lock=518661"
              },
              {
                "type": "testimonial-card",
                "quote": "Baking isn’t just a job—it’s therapy. My goal is to make someone’s day better with a perfectly flaky danish.",
                "author": "James",
                "role": "Pastry Chef",
                "spacing": "md",
                "avatar": "https://loremflickr.com/1600/900/business?lock=87887"
              }
            ]
          }
        }
      }
    },
    "/contact": {
      "seo": {
        "title": "Chris Cafetaria | Contact",
        "description": "Reach out to Chris Cafetaria for catering, general inquiries, or feedback. Located in Point Cook with parking details."
      },
      "sectionOrder": [
        "hero",
        "map",
        "contact-form",
        "contact-info"
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
            "headline": "Let's Connect Over Coffee",
            "subheadline": "Reach out to our friendly team at Chris Cafetaria. We're here to answer your questions, discuss catering options, or simply chat about our passion for great food and exceptional coffee.",
            "ctaText": "Get Started",
            "ctaLink": "#contact-form",
            "imageName": "https://loremflickr.com/1600/900/let?lock=149220",
            "imagePosition": "right"
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
            "address": "Chris Cafetaria, 123 Boutique Lane, Point Cook, VIC 3000",
            "zoom": 14
          }
        },
        "contact-form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Get In Touch",
            "description": "Have questions, feedback, or catering needs? Fill out the form below and we'll get back to you as soon as possible.",
            "fields": [
              {
                "name": "name",
                "label": "Your Name",
                "type": "text",
                "required": true
              },
              {
                "name": "email",
                "label": "Your Email",
                "type": "email",
                "required": true
              },
              {
                "name": "subject",
                "label": "Subject",
                "type": "text",
                "required": true
              },
              {
                "name": "message",
                "label": "Message",
                "type": "textarea",
                "required": true
              }
            ],
            "submitLabel": "Submit",
            "imageName": "https://loremflickr.com/1600/900/get?lock=638655"
          }
        },
        "contact-info": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "padding": "lg",
            "blocks": [
              {
                "type": "feature",
                "icon": "Clock",
                "title": "Business Hours",
                "description": "Monday to Friday: 7:00 AM - 5:00 PMSaturday & Sunday: 8:00 AM - 4:00 PM",
                "variant": "vertical",
                "align": "left",
                "spacing": "none"
              },
              {
                "type": "feature",
                "icon": "Phone",
                "title": "Call Us",
                "description": "(03) 1234 5678",
                "variant": "vertical",
                "align": "left",
                "spacing": "none"
              },
              {
                "type": "feature",
                "icon": "Socialmedia",
                "title": "Follow Us",
                "description": "Stay updated with our latest offerings and special events on social media.",
                "variant": "vertical",
                "align": "left",
                "spacing": "none"
              }
            ]
          }
        }
      }
    }
  }
};