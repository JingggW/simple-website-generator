import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  "theme": {
    "mode": "light",
    "colors": {
      "primary": "#FF6F91",
      "secondary": "#6B7280",
      "background": "#FAF9F6",
      "surface": "#F5F0F5",
      "muted": "#F9FAFB",
      "accent": "#F59E0B",
      "text": "#2C1B18"
    },
    "fontStyle": "sans",
    "borderRadius": "md"
  },
  "header": {
    "title": "Christine's Bra Studio",
    "links": [
      {
        "type": "link",
        "label": "Home",
        "href": "/"
      },
      {
        "type": "link",
        "label": "Products",
        "href": "/products"
      },
      {
        "type": "link",
        "label": "About",
        "href": "/about"
      },
      {
        "type": "link",
        "label": "Blog",
        "href": "/blog"
      },
      {
        "type": "link",
        "label": "Contact",
        "href": "/contact"
      }
    ],
    "cta": {
      "type": "link",
      "label": "Shop Now",
      "href": "/products"
    }
  },
  "footer": {
    "brand": {
      "title": "Christine's Bra Studio",
      "description": "Handcrafted premium bras in Point Cook, Melbourne."
    },
    "columns": [
      {
        "title": "Shop",
        "links": [
          {
            "type": "link",
            "label": "Products",
            "href": "/products"
          },
          {
            "type": "link",
            "label": "Pricing",
            "href": "/pricing"
          }
        ]
      },
      {
        "title": "About",
        "links": [
          {
            "type": "link",
            "label": "About",
            "href": "/about"
          },
          {
            "type": "link",
            "label": "Blog",
            "href": "/"
          }
        ]
      },
      {
        "title": "Contact",
        "links": [
          {
            "type": "link",
            "label": "Contact",
            "href": "/contact"
          }
        ]
      }
    ],
    "social": [
      {
        "platform": "instagram",
        "url": "https://instagram.com/christinesbrastudio"
      },
      {
        "platform": "facebook",
        "url": "https://facebook.com/christinesbrastudio"
      }
    ],
    "copyright": "© 2026 Christine's Bra Studio. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Elegant Bespoke Bras | Personalized Fit & Style",
        "description": "Explore our collection of handcrafted bras designed for every moment. Discover perfect fit, luxurious comfort, and timeless elegance."
      },
      "sectionOrder": [
        "hero",
        "services",
        "testimonials",
        "form",
        "pricing",
        "map"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Discover Perfect Bras for Every Moment",
            "subheadline": "Step into timeless elegance with our craftsmanship. Experience comfort, confidence, and style seamlessly. Your ideal fit awaits.",
            "ctaText": "Shop Now",
            "ctaLink": "/products",
            "imageName": "https://loremflickr.com/1600/900/discover,perfect/all"
          }
        },
        "services": {
          "type": "services",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Shop Our Top Picks",
            "description": "Discover curated options tailored to your needs. Whether casual wear or special occasions, our team ensures perfection.",
            "items": [
              {
                "icon": "Wrench",
                "title": "Fit Guide",
                "description": "Find your perfect size with easy guides."
              },
              {
                "icon": "Droplets",
                "title": "Custom Sizing",
                "description": "Personalized measurements for ultimate comfort."
              },
              {
                "icon": "Flame",
                "title": "Fast Shipping",
                "description": "Quick delivery to your doorstep."
              }
            ]
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "What Our Clients Say",
            "items": [
              {
                "quote": "The fit transformed my confidence!",
                "author": "Jane R.",
                "role": "Verified Buyer",
                "avatar": "jane.jpg"
              }
            ]
          }
        },
        "form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Contact Us for Guidance",
            "description": "Need personalized advice? Reach out today. We’re here to help tailor your experience.",
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
              },
              {
                "name": "message",
                "label": "Message",
                "type": "textarea",
                "required": false
              }
            ],
            "submitLabel": "Submit"
          }
        },
        "pricing": {
          "type": "pricing",
          "variant": "detailed",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Transparent Pricing",
            "description": "Explore cost-effective options from premium to budget-friendly. No hidden fees, just value.",
            "categories": [
              {
                "name": "Bras",
                "items": [
                  {
                    "label": "Everyday Bra",
                    "price": "$45",
                    "details": "Soft, everyday wear"
                  },
                  {
                    "label": "Luxury Bra",
                    "price": "$85",
                    "details": "Premium lace, perfect fit"
                  },
                  {
                    "label": "Sports Bra",
                    "price": "$35",
                    "details": "High support"
                  }
                ]
              }
            ]
          }
        },
        "map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Our Headquarters",
            "address": "123 Fashion Lane, Paris, France",
            "zoom": 12
          }
        }
      }
    },
    "/products": {
      "seo": {
        "title": "Customized Bras for Every Body",
        "description": "Discover personalized, comfortable bras designed to celebrate your unique shape and style with customizable options for size, color, and support."
      },
      "sectionOrder": [
        "hero",
        "blocks1",
        "services",
        "blocks2"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Customized Bras for Every Body",
            "subheadline": "Discover the perfect fit with our customizable bras designed to celebrate your unique shape and style.",
            "ctaText": "Explore",
            "ctaLink": "/products",
            "imageName": "custom-bra-model"
          }
        },
        "blocks1": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Find Your Perfect Fit",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Explore our range of sizes and styles to find the bra that suits your body and lifestyle.",
                "align": "left",
                "spacing": "lg"
              },
              {
                "type": "image",
                "src": "bra-styles-gallery",
                "alt": "Various bra styles and sizes",
                "spacing": "md"
              }
            ]
          }
        },
        "services": {
          "type": "services",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Our Customization Options",
            "description": "Select your size, color, and support level to create a bra that's as unique as you are.",
            "items": [
              {
                "icon": "Droplets",
                "title": "Size",
                "description": "Choose from a wide range of sizes to ensure perfect fit"
              },
              {
                "icon": "Flame",
                "title": "Color",
                "description": "Select from our curated palette including the signature #FF6F91 pink"
              },
              {
                "icon": "Truck",
                "title": "Support",
                "description": "Customize support levels for optimal comfort and structure"
              }
            ]
          }
        },
        "blocks2": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Accessories to Complement Your Look",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Pair your custom bra with our matching panties and accessories for a complete look.",
                "align": "left",
                "spacing": "lg"
              },
              {
                "type": "image",
                "src": "accessories-gallery",
                "alt": "Matching panties and accessories",
                "spacing": "md"
              },
              {
                "type": "button",
                "label": "View Collection",
                "href": "/products/blocks2",
                "variant": "primary",
                "align": "left",
                "spacing": "sm"
              }
            ],
            "ctaLink": "/products/blocks2"
          }
        }
      }
    },
    "/about": {
      "seo": {
        "title": "Christine Customised Bras Co. | Bespoke Bras for Every Woman",
        "description": "Discover Christine Customised Bras Co., where bespoke craftsmanship meets compassionate care. Handmade with organic materials for unique comfort and confidence."
      },
      "sectionOrder": [
        "hero",
        "meetChristine",
        "qualityCommitment",
        "form"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "default",
            "headline": "Crafting Comfort, Confidence & Connection",
            "subheadline": "Christine Customised Bras Co. reimagines intimate apparel through bespoke craftsmanship and compassionate care. Each piece is designed for your unique silhouette, celebrating your individuality with precision and passion.",
            "ctaText": "Request Your Custom Bra Consultation",
            "ctaLink": "/contact",
            "imageName": "crafting-bra"
          }
        },
        "meetChristine": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Meet Christine",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "As a survivor of breast cancer and a passionate advocate for body positivity, Christine founded this brand to empower women through beautifully made, medically supportive lingerie. Her journey from patient to pioneer fuels every stitch.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        },
        "qualityCommitment": {
          "type": "blocks",
          "variant": "wide",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "columns",
                "layout": "split",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "fabric-closeup",
                        "alt": "Organic cotton fabric",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "final-product",
                        "alt": "Customised bra in natural light",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "heading",
                "text": "Our Commitment to Quality",
                "level": "h3",
                "align": "left",
                "spacing": "lg"
              },
              {
                "type": "text",
                "content": "Every Christine bra is handcrafted in small batches using certified organic cotton, seamless construction, and hypoallergenic materials. Our rigorous quality checks ensure durability and comfort that lasts.",
                "align": "center",
                "spacing": "md"
              }
            ]
          }
        },
        "form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Request Your Custom Bra Consultation",
            "description": "Ready to experience the Christine difference? Complete this form to schedule a personalized fitting and discover how our bespoke bras can transform your comfort and confidence.",
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
              },
              {
                "name": "message",
                "label": "Your Preferences",
                "type": "textarea",
                "required": true
              }
            ],
            "submitLabel": "Request Consultation"
          }
        }
      }
    },
    "/contact": {
      "seo": {
        "title": "Premium Design Haven"
      },
      "sectionOrder": [
        "Hero",
        "Form",
        "Map",
        "Contact"
      ],
      "sections": {
        "Hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Elegant studio shot with gold accents",
            "subheadline": "Premium Design Haven",
            "ctaText": "Get Started",
            "imageName": "https://loremflickr.com/1600/900/elegant,studio/all",
            "ctaLink": "/contact"
          }
        },
        "Form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Custom fitting consultation process",
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
                "name": "message",
                "label": "Message",
                "type": "textarea",
                "required": true
              }
            ],
            "submitLabel": "Submit"
          }
        },
        "Map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Local showroom location details",
            "address": "123 Design Street, Creative City, CA 90210",
            "zoom": 14
          }
        },
        "Contact": {
          "type": "contact",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Contact information section",
            "email": "contact@premiumdesignhaven.com",
            "phone": "+1 (555) 123-4567",
            "address": "123 Design Street, Creative City, CA 90210"
          }
        }
      }
    },
    "/pricing": {
      "seo": {
        "title": "Pricing Page",
        "description": "Our pricing plans and options"
      },
      "sectionOrder": [
        "Hero",
        "Services",
        "Testimonials",
        "Form",
        "Map",
        "Contact",
        "Content",
        "TestimonialsSection",
        "BlockSection"
      ],
      "sections": {
        "Hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "headline": "Our Pricing Plans",
            "subheadline": "Choose the plan that works best for you",
            "ctaText": "Get Started",
            "imageName": "https://loremflickr.com/1600/900/our,pricing/all",
            "ctaLink": "#form"
          }
        },
        "Services": {
          "type": "services",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Our Services",
            "description": "We offer a wide range of services",
            "items": [
              {
                "icon": "service1",
                "title": "Service 1",
                "description": "Description of service 1"
              },
              {
                "icon": "service2",
                "title": "Service 2",
                "description": "Description of service 2"
              }
            ]
          }
        },
        "Testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "What Our Clients Say",
            "items": [
              {
                "quote": "Great service and support!",
                "author": "John Doe",
                "role": "Client"
              },
              {
                "quote": "Highly recommend their services.",
                "author": "Jane Smith",
                "role": "Client"
              }
            ]
          }
        },
        "Form": {
          "type": "form",
          "variant": "contact",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Contact Us",
            "description": "Fill out the form below",
            "fields": [
              {
                "name": "name",
                "label": "Name",
                "type": "text",
                "required": true
              },
              {
                "name": "email",
                "label": "Email",
                "type": "email",
                "required": true
              }
            ],
            "submitLabel": "Submit"
          }
        },
        "Map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Our Location",
            "address": "123 Main St, City, State",
            "zoom": 14
          }
        },
        "Contact": {
          "type": "contact",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Contact Information",
            "description": "Get in touch with us",
            "email": "contact@example.com",
            "phone": "123-456-7890",
            "address": "123 Main St, City, State"
          }
        },
        "Content": {
          "type": "content",
          "variant": "simple",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "About Our Pricing",
            "body": "Learn more about our pricing plans and what they include."
          }
        },
        "TestimonialsSection": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "Client Testimonials",
            "items": [
              {
                "quote": "Excellent service and support!",
                "author": "Alice Johnson",
                "role": "Client"
              },
              {
                "quote": "Very professional and reliable.",
                "author": "Bob Williams",
                "role": "Client"
              }
            ]
          }
        },
        "BlockSection": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Additional Information",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "This is some additional information about our pricing and services.",
                "align": "left",
                "spacing": "md"
              }
            ]
          }
        }
      }
    },
    "/products/blocks2": {
      "seo": {
        "title": "Discover Your Perfect Fit | Christine Customised Bras Co.",
        "description": "Experience luxury that moves with you. Christine Customised Bras Co. merges science and craftsmanship to create bras that adapt to your body, not the other way around."
      },
      "sectionOrder": [
        "hero",
        "blocks2",
        "testimonials",
        "pricing",
        "map",
        "form"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "split",
          "props": {
            "background": "primary",
            "animation": "zoom-in",
            "width": "wide",
            "headline": "Discover Your Perfect Fit",
            "subheadline": "Experience luxury that moves with you. Christine Customised Bras Co. merges science and craftsmanship to create bras that adapt to your body, not the other way around. Our patented 3D mapping technology ensures zero digging, zero bouncing, and zero compromise.",
            "ctaText": "Get Started",
            "ctaLink": "/pricing",
            "imageName": "https://loremflickr.com/1600/900/discover,your/all"
          }
        },
        "blocks2": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "muted",
            "animation": "fade",
            "width": "default",
            "blocks": [
              {
                "type": "text",
                "content": "Our bras are engineered using biomechanical data from 10,000+ body scans. Each cup is molded to your unique shape, with strategically placed compression zones that distribute weight evenly. The result? All-day support that feels like a second skin.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "image",
                "src": "https://loremflickr.com/1600/900/3d,body/all",
                "alt": "3D body scan and bra internal structure",
                "caption": "Split-screen infographic: left side shows a 3D body scan, right side displays the bra's internal structure",
                "spacing": "lg"
              }
            ]
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "carousel",
          "props": {
            "background": "surface",
            "animation": "none",
            "width": "default",
            "title": "Real Women, Real Results",
            "subtitles": "",
            "items": [
              {
                "quote": "Finally, a bra that doesn't leave marks! I wear mine to spin class and hiking—no more readjusting.",
                "author": "Sarah K., NYC",
                "role": "",
                "avatar": ""
              },
              {
                "quote": "Christine's attention to detail is unmatched. The custom fit changed my relationship with lingerie.",
                "author": "Priya M., London",
                "role": "",
                "avatar": ""
              }
            ]
          }
        },
        "pricing": {
          "type": "pricing",
          "variant": "detailed",
          "props": {
            "background": "surface",
            "animation": "none",
            "width": "default",
            "title": "Investment in Your Comfort",
            "description": "",
            "categories": [
              {
                "name": "Single",
                "items": [
                  {
                    "label": "£199",
                    "price": "",
                    "details": "Includes: 2 custom fittings, 1 free replacement within 12 months"
                  }
                ]
              },
              {
                "name": "Subscription",
                "items": [
                  {
                    "label": "£179/month",
                    "price": "4-month commitment",
                    "details": "Includes: 2 custom fittings, 1 free replacement within 12 months"
                  }
                ]
              }
            ]
          }
        },
        "map": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "default",
            "title": "Find Your Local Partner",
            "address": "",
            "zoom": 14
          }
        },
        "form": {
          "type": "form",
          "variant": "request",
          "props": {
            "background": "surface",
            "animation": "slide-up",
            "width": "default",
            "title": "Book Your Custom Fitting",
            "description": "Complete your Christine journey. Our stylists will contact you within 24 hours to schedule your 3D scan.",
            "fields": [
              {
                "name": "name",
                "label": "Name",
                "type": "text",
                "required": true
              },
              {
                "name": "email",
                "label": "Email",
                "type": "email",
                "required": true
              },
              {
                "name": "preferredDate",
                "label": "Preferred Date",
                "type": "text",
                "required": true
              }
            ],
            "submitLabel": "Book Fitting"
          }
        }
      }
    },
    "/blog": {
      "seo": {
        "title": "Christine Customised Bras Co. – Blog",
        "description": "Explore expert tips, trend insights, and behind‑the‑scenes stories about custom‑fit lingerie from Christine Customised Bras Co."
      },
      "sectionOrder": [
        "hero",
        "blocks",
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
            "headline": "Discover the Art of Custom Fit",
            "subheadline": "Welcome to Christine Customised Bras Co.’s blog, where we explore the science and style behind perfectly fitted lingerie.",
            "ctaText": "Read More",
            "ctaLink": "#",
            "imageName": "hero-image"
          }
        },
        "blocks": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "blocks": [
              {
                "type": "heading",
                "text": "Bra Care 101: Extending the Life of Your Favorite Pieces",
                "level": "h2",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "In this post we share five essential tips for caring for your bespoke bras: gentle hand‑washing techniques, smart storage solutions, and how to rotate styles for optimal elasticity. Learn how to keep your custom fit looking fresh for years.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "image",
                "src": "bra-care-flatlay",
                "alt": "Flat‑lay of assorted custom bras with soap and dryer bag",
                "caption": "Caring for your custom bras",
                "spacing": "md"
              }
            ]
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "default",
            "animation": "slide-up",
            "width": "default",
            "title": "What Our Clients Say",
            "subtitles": "Join the Conversation",
            "items": [
              {
                "quote": "The fit is unlike anything I’ve experienced – truly made for me.",
                "author": "Emma L.",
                "role": "Client",
                "avatar": "emma-avatar"
              },
              {
                "quote": "Quality and comfort combined; my go‑to lingerie now.",
                "author": "Sofia R.",
                "role": "Client",
                "avatar": "sofia-avatar"
              }
            ]
          }
        }
      }
    }
  }
};