import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  "theme": {
    "mode": "light",
    "preset": "ecoGrowth",
    "colors": {
      "primary": "#065F46",
      "secondary": "#D97706",
      "background": "#F0F4F1",
      "surface": "#FFFFFF",
      "muted": "#D1FAE5",
      "accent": "#10B981",
      "text": "#065F46"
    },
    "fontStyle": "sans",
    "typographyScale": "standard",
    "borderRadius": "md",
    "containerStyle": "default"
  },
  "header": {
    "title": "PurePaws Mobile Grooming",
    "variant": "default",
    "links": [
      {
        "type": "link",
        "label": "Home",
        "href": "/"
      },
      {
        "type": "dropdown",
        "label": "Services",
        "items": [
          {
            "type": "link",
            "label": "Full Grooming",
            "href": "/services#services"
          },
          {
            "type": "link",
            "label": "Breed-Specific Styling",
            "href": "/services#services"
          },
          {
            "type": "link",
            "label": "Organic Skincare Treatments",
            "href": "/services#services"
          }
        ]
      },
      {
        "type": "link",
        "label": "Booking",
        "href": "/booking"
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
      "label": "Book Now",
      "href": "/booking"
    }
  },
  "footer": {
    "brand": {
      "title": "PurePaws Mobile Grooming",
      "description": "Stress-free, breed-specific grooming and organic skincare delivered to your door in our fully equipped mobile van."
    },
    "columns": [
      {
        "title": "Services",
        "links": [
          {
            "type": "link",
            "label": "Full Grooming",
            "href": "/services#services"
          },
          {
            "type": "link",
            "label": "Breed Styling",
            "href": "/services#services"
          },
          {
            "type": "link",
            "label": "Organic Treatments",
            "href": "/services#services"
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
            "label": "Contact",
            "href": "/contact"
          }
        ]
      },
      {
        "title": "Support",
        "links": [
          {
            "type": "link",
            "label": "FAQ",
            "href": "/contact#blocks_contact_info"
          },
          {
            "type": "link",
            "label": "Privacy Policy",
            "href": "/about"
          }
        ]
      }
    ],
    "social": [
      {
        "platform": "instagram",
        "url": "https://instagram.com/purepawsgrooming"
      },
      {
        "platform": "facebook",
        "url": "https://facebook.com/purepawsgrooming"
      }
    ],
    "copyright": "© 2026 PurePaws Mobile Grooming. All rights reserved."
  },
  "pages": {
    "/": {
      "seo": {
        "title": "Chris & Bruce Pet Spa - Stress-Free Mobile Grooming in NYC",
        "description": "Premium mobile pet grooming service in New York City. Certified groomers, organic products, and climate-controlled van. Book your pet's stress-free spa day today."
      },
      "sectionOrder": [
        "hero",
        "testimonials",
        "process",
        "features"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "full",
            "padding": "lg",
            "headline": "Stress-Free Grooming, Delivered to Your Door.",
            "subheadline": "Chris & Bruce Pet Spa brings the salon experience to your driveway. Our mobile grooming van eliminates the stress of cages and loud salons, using only organic, gentle products. Book your pet's spa day today and watch them shine.",
            "ctaText": "Book Your Pet's Spa Day",
            "ctaLink": "/booking",
            "imageName": "https://loremflickr.com/1600/900/stress?lock=224901"
          }
        },
        "testimonials": {
          "type": "testimonials",
          "variant": "grid",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "title": "Pets & Parents Rave About Us.",
            "subtitles": "See why pet parents across the city trust us with their furry family members.",
            "items": [
              {
                "quote": "The attention to detail here is unmatched. My anxious rescue dog actually wagged his tail when the groomer opened the van door. Truly transformative!",
                "author": "Sarah Mitchell",
                "role": "Owner of Winston (Golden Retriever)",
                "avatar": "testimonial-winston"
              },
              {
                "quote": "Finally, a grooming service that understands cats! The gentle approach and organic products made all the difference. Luna came back calm and gorgeous.",
                "author": "James Chen",
                "role": "Parent of Luna (Turkish Van)",
                "avatar": "testimonial-luna"
              },
              {
                "quote": "The mobile van is spotless and smells amazing. No more dragging my nervous terrier into a noisy salon. Worth every penny for the peace of mind.",
                "author": "Elena Rodriguez",
                "role": "Owner of Peanut (Jack Russell)",
                "avatar": "testimonial-peanut"
              },
              {
                "quote": "Chris and Bruce are magicians. My high-maintenance poodle looks better than ever, and the bandana was a lovely touch. Absolutely recommend!",
                "author": "Michael Thompson",
                "role": "Parent of Coco (Poodle)",
                "avatar": "testimonial-coco"
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
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "The Gentle Grooming Journey",
                "level": "h2",
                "align": "center",
                "decoration": "line-bottom",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Every pet receives individualized, low-stress care from our certified groomers. We use only certified organic, hypoallergenic products to ensure the safest experience.",
                "align": "center",
                "spacing": "lg"
              },
              {
                "type": "columns",
                "layout": "split-left",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/gentle?lock=454551",
                        "alt": "Gentle groomer kneeling to greet a shy dog at the mobile van door",
                        "aspect": "video",
                        "spacing": "none"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "1. Calm Arrival",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Your pet is welcomed into our climate-controlled van for a stress-free start. We let them explore and settle at their own pace before any grooming begins.",
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
                        "text": "2. Organic Bath",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "We lather up with soothing, plant-based shampoos that clean without irritants. All products are certified organic and pH-balanced for sensitive skin.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/close?lock=402245",
                        "alt": "Close-up of gentle hands lathering with organic shampoo",
                        "aspect": "video",
                        "spacing": "none"
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
                        "src": "https://loremflickr.com/1600/900/patient?lock=750172",
                        "alt": "Patient groomer carefully trimming a cat's nails with focused expression",
                        "aspect": "video",
                        "spacing": "none"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "3. Precision Styling",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Our expert groomers trim and style with patience and care. Whether it's a breed-specific cut or a simple tidy, we work at your pet's comfort level.",
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
                        "text": "4. Happy Pickup",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "sm"
                      },
                      {
                        "type": "text",
                        "content": "Your fresh, relaxed pet is ready to go home, often with a complimentary bandana. We share grooming notes and tips for maintaining their look between visits.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/happy?lock=428806",
                        "alt": "Happy poodle wearing a bandana being gently handed to owner",
                        "aspect": "video",
                        "spacing": "none"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "features": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "none",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Your Neighborhood, Our Mobile Spa",
                "level": "h2",
                "align": "center",
                "decoration": "line-bottom",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "We bring the spa to you. Our mobile van is equipped with everything needed for a premium grooming experience, and we serve all of New York City's key neighborhoods.",
                "align": "center",
                "spacing": "lg"
              },
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "container",
                        "variant": "card",
                        "position": "relative",
                        "background": "surface",
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Mappin",
                            "title": "Manhattan",
                            "description": "Upper East Side to SoHo.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
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
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Mappin",
                            "title": "Brooklyn",
                            "description": "Williamsburg, Park Slope, and more.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
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
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Mappin",
                            "title": "Queens",
                            "description": "Long Island City, Astoria, and beyond.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "spacer",
                "size": "lg"
              },
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "container",
                        "variant": "card",
                        "position": "relative",
                        "background": "surface",
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Van",
                            "title": "Climate-Controlled Van",
                            "description": "Temperature-regulated for comfort year-round.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
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
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Bottle",
                            "title": "Organic Products",
                            "description": "All shampoos and conditioners are certified organic.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
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
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Paw",
                            "title": "No-Cage Wait",
                            "description": "Pets relax freely in the van during grooming.",
                            "variant": "vertical",
                            "align": "center",
                            "spacing": "sm"
                          }
                        ],
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
        "title": "Services | Chris & Bruce Pet Spa",
        "description": "Expert grooming services for dogs, cats, and small animals. Organic treatments, breed-specific styling, and transparent pricing by pet size."
      },
      "sectionOrder": [
        "hero",
        "services",
        "pricing",
        "story"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "slide-up",
            "width": "wide",
            "padding": "sm",
            "headline": "Expert Grooming for Every Paw, Scale & Feather.",
            "subheadline": "From a refreshing bath to a breed-standard cut, we provide compassionate, professional care for dogs, cats, and small animals. Your pet's comfort is our highest priority.",
            "ctaText": "Book Now",
            "ctaLink": "/booking",
            "imageName": "https://loremflickr.com/1600/900/expert?lock=626712"
          }
        },
        "services": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "default",
            "animation": "fade",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Our Service Menu",
                "level": "h2",
                "align": "left",
                "decoration": "line-left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Choose a full-service package or à la carte options. Every service includes a gentle consultation, coat assessment, and a stress-free experience.",
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
                        "type": "feature",
                        "icon": "Droplet",
                        "title": "Washing",
                        "description": "Gentle baths with organic, hypoallergenic shampoos and conditioners.",
                        "variant": "vertical",
                        "align": "center",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Scissors",
                        "title": "Styling",
                        "description": "Breed-specific cuts and stylish trims tailored to your pet's lifestyle.",
                        "variant": "vertical",
                        "align": "center",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Leaf",
                        "title": "Organic Treatments",
                        "description": "Natural conditioners and skin-soothing therapies for sensitive coats.",
                        "variant": "vertical",
                        "align": "center",
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "pricing": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "muted",
            "animation": "zoom-in",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Simple Pricing by Size",
                "level": "h2",
                "align": "left",
                "decoration": "line-left",
                "spacing": "md"
              },
              {
                "type": "text",
                "content": "Our base bath & brush service is priced by your pet's weight. Add-ons like deshedding, nail trimming, and teeth brushing are listed below.",
                "align": "left",
                "spacing": "md"
              },
              {
                "type": "icon",
                "name": "Scale",
                "size": "md",
                "color": "primary",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "price-list",
                "variant": "minimal",
                "categories": [
                  {
                    "name": "Bath & Brush",
                    "items": [
                      {
                        "label": "Small (<20lbs)",
                        "price": "$40"
                      },
                      {
                        "label": "Medium (21-50lbs)",
                        "price": "$60"
                      },
                      {
                        "label": "Large (>50lbs)",
                        "price": "$80"
                      }
                    ]
                  },
                  {
                    "name": "Deshedding Treatment",
                    "items": [
                      {
                        "label": "Small",
                        "price": "$30"
                      },
                      {
                        "label": "Medium",
                        "price": "$45"
                      },
                      {
                        "label": "Large",
                        "price": "$60"
                      }
                    ]
                  },
                  {
                    "name": "Nail Trim",
                    "items": [
                      {
                        "label": "Small",
                        "price": "$15"
                      },
                      {
                        "label": "Medium",
                        "price": "$20"
                      },
                      {
                        "label": "Large",
                        "price": "$25"
                      }
                    ]
                  },
                  {
                    "name": "Teeth Brushing",
                    "items": [
                      {
                        "label": "Small",
                        "price": "$10"
                      },
                      {
                        "label": "Medium",
                        "price": "$15"
                      },
                      {
                        "label": "Large",
                        "price": "$20"
                      }
                    ]
                  }
                ],
                "spacing": "md"
              }
            ]
          }
        },
        "story": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "surface",
            "animation": "none",
            "width": "wide",
            "padding": "lg",
            "blocks": [
              {
                "type": "heading",
                "text": "The Chris & Bruce Difference: Science & Soul",
                "level": "h2",
                "align": "left",
                "decoration": "line-left",
                "spacing": "lg"
              },
              {
                "type": "columns",
                "layout": "split-right",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Organic Wellness",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "We believe grooming is part of holistic pet wellness. Our organic, hypoallergenic products soothe sensitive skin and promote a healthy coat without harsh chemicals.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/professional?lock=686926",
                        "alt": "Professional groomer gently applying organic coconut-oil conditioner to a dog's coat",
                        "aspect": "video",
                        "spacing": "md"
                      },
                      {
                        "type": "testimonial-card",
                        "quote": "My dog has allergies and the organic products made all the difference. No more itching after visits!",
                        "author": "Sarah J.",
                        "role": "Happy Client",
                        "spacing": "md",
                        "avatar": "https://loremflickr.com/1600/900/business?lock=544811"
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
                        "src": "https://loremflickr.com/1600/900/before?lock=616751",
                        "alt": "Before and after shot of a poodle receiving a neat, breed-standard clip",
                        "aspect": "video",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Breed-Perfect Styling",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "We honor breed standards while ensuring each cut suits your pet's unique lifestyle and personality. Every trim is a custom collaboration.",
                        "align": "left",
                        "spacing": "md"
                      },
                      {
                        "type": "testimonial-card",
                        "quote": "My show poodle always comes back perfectly styled. They really understand the breed standard and what works for my dog's coat type.",
                        "author": "Michael T.",
                        "role": "Show Dog Owner",
                        "spacing": "md",
                        "avatar": "https://loremflickr.com/1600/900/business?lock=416455"
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
    "/booking": {
      "seo": {
        "title": "Pet Spa Day Booking | Mobile Grooming Services",
        "description": "Book your pet's spa day with our boutique mobile grooming service. Easy online booking, professional care, and stress-free experience for your furry friends."
      },
      "sectionOrder": [
        "hero",
        "form",
        "blocks"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "slide-up",
            "width": "full",
            "padding": "md",
            "headline": "Book Your Pet’s Spa Day in Seconds",
            "subheadline": "Reserve a grooming appointment for your furry friend. Choose a service, pick a time, and we’ll handle the rest.",
            "ctaText": "Book Appointment",
            "ctaLink": "/booking#form",
            "imageName": "https://loremflickr.com/1600/900/book?lock=395632"
          }
        },
        "form": {
          "type": "form",
          "variant": "request",
          "props": {
            "background": "muted",
            "animation": "fade",
            "width": "prose",
            "padding": "md",
            "title": "Schedule Your Appointment",
            "description": "Fill out the details below to book your pet’s grooming session. We’ll confirm via email or phone within 2 hours.",
            "fields": [
              {
                "name": "ownerName",
                "label": "Your Name",
                "type": "text",
                "required": true
              },
              {
                "name": "ownerEmail",
                "label": "Email Address",
                "type": "email",
                "required": true
              },
              {
                "name": "ownerPhone",
                "label": "Phone Number",
                "type": "text",
                "required": true
              },
              {
                "name": "petName",
                "label": "Pet's Name",
                "type": "text",
                "required": true
              },
              {
                "name": "petType",
                "label": "Pet Type",
                "type": "select",
                "options": [
                  "Dog",
                  "Cat",
                  "Other"
                ],
                "required": true
              },
              {
                "name": "petBreed",
                "label": "Breed",
                "type": "text",
                "required": true
              },
              {
                "name": "service",
                "label": "Service",
                "type": "select",
                "options": [
                  "Bath & Brush",
                  "Full Groom",
                  "Nail Trim",
                  "Teeth Cleaning",
                  "De-shedding Treatment"
                ],
                "required": true
              },
              {
                "name": "appointmentDate",
                "label": "Preferred Date",
                "type": "text",
                "required": true
              },
              {
                "name": "appointmentTime",
                "label": "Preferred Time",
                "type": "text",
                "required": true
              }
            ],
            "submitLabel": "Book Appointment"
          }
        },
        "blocks": {
          "type": "blocks",
          "variant": "full",
          "props": {
            "background": "default",
            "animation": "none",
            "width": "full",
            "padding": "none",
            "blocks": [
              {
                "type": "container",
                "variant": "default",
                "position": "relative",
                "background": "surface",
                "padding": "md",
                "blocks": [
                  {
                    "type": "heading",
                    "text": "How It Works",
                    "level": "h2",
                    "align": "center",
                    "decoration": "line-bottom",
                    "spacing": "md"
                  },
                  {
                    "type": "columns",
                    "layout": "3-col",
                    "items": [
                      {
                        "blocks": [
                          {
                            "type": "container",
                            "variant": "default",
                            "position": "relative",
                            "background": "surface",
                            "padding": "md",
                            "blocks": [
                              {
                                "type": "icon",
                                "name": "Listchecks",
                                "size": "lg",
                                "color": "primary",
                                "align": "center",
                                "spacing": "md"
                              },
                              {
                                "type": "heading",
                                "text": "Choose Service",
                                "level": "h3",
                                "align": "center",
                                "decoration": "none",
                                "spacing": "sm"
                              },
                              {
                                "type": "text",
                                "content": "Browse our grooming menu and select the perfect treatment for your pet’s coat and needs.",
                                "align": "center",
                                "spacing": "none"
                              }
                            ],
                            "spacing": "md"
                          }
                        ]
                      },
                      {
                        "blocks": [
                          {
                            "type": "container",
                            "variant": "default",
                            "position": "relative",
                            "background": "surface",
                            "padding": "md",
                            "blocks": [
                              {
                                "type": "icon",
                                "name": "Calendar",
                                "size": "lg",
                                "color": "primary",
                                "align": "center",
                                "spacing": "md"
                              },
                              {
                                "type": "heading",
                                "text": "Pick a Time",
                                "level": "h3",
                                "align": "center",
                                "decoration": "none",
                                "spacing": "sm"
                              },
                              {
                                "type": "text",
                                "content": "View real-time availability and choose a convenient appointment slot.",
                                "align": "center",
                                "spacing": "none"
                              }
                            ],
                            "spacing": "md"
                          }
                        ]
                      },
                      {
                        "blocks": [
                          {
                            "type": "container",
                            "variant": "default",
                            "position": "relative",
                            "background": "surface",
                            "padding": "md",
                            "blocks": [
                              {
                                "type": "icon",
                                "name": "Shieldcheck",
                                "size": "lg",
                                "color": "primary",
                                "align": "center",
                                "spacing": "md"
                              },
                              {
                                "type": "heading",
                                "text": "Confirm & Pay",
                                "level": "h3",
                                "align": "center",
                                "decoration": "none",
                                "spacing": "sm"
                              },
                              {
                                "type": "text",
                                "content": "Securely complete your booking online with instant email confirmation.",
                                "align": "center",
                                "spacing": "none"
                              }
                            ],
                            "spacing": "md"
                          }
                        ]
                      }
                    ]
                  }
                ],
                "spacing": "lg"
              },
              {
                "type": "container",
                "variant": "default",
                "position": "relative",
                "background": "secondary",
                "padding": "lg",
                "blocks": [
                  {
                    "type": "columns",
                    "layout": "split-right",
                    "items": [
                      {
                        "blocks": [
                          {
                            "type": "heading",
                            "text": "Before Your Appointment",
                            "level": "h2",
                            "align": "left",
                            "decoration": "none",
                            "spacing": "md"
                          },
                          {
                            "type": "text",
                            "content": "To ensure a smooth, stress-free experience, please brush your pet thoroughly before arrival and ensure they’ve relieved themselves. Bring any vaccination records if your pet is new to us.",
                            "align": "left",
                            "spacing": "none"
                          }
                        ]
                      },
                      {
                        "blocks": [
                          {
                            "type": "image",
                            "src": "https://loremflickr.com/1600/900/calm?lock=698786",
                            "alt": "Calm pet being gently brushed at home by owner with natural lighting",
                            "aspect": "video",
                            "spacing": "none"
                          }
                        ]
                      }
                    ]
                  }
                ],
                "spacing": "lg"
              },
              {
                "type": "container",
                "variant": "default",
                "position": "relative",
                "background": "none",
                "padding": "md",
                "blocks": [
                  {
                    "type": "heading",
                    "text": "Loved by Local Pet Parents",
                    "level": "h2",
                    "align": "center",
                    "decoration": "line-bottom",
                    "spacing": "md"
                  },
                  {
                    "type": "testimonial-card",
                    "quote": "The online booking was so simple, and my nervous pup came back looking happier than ever. Chris & Bruce truly understand anxious pets!",
                    "author": "Maya T.",
                    "role": "owner of Milo the anxious Poodle",
                    "avatar": "https://loremflickr.com/1600/900/maya?lock=958508",
                    "spacing": "none"
                  }
                ],
                "spacing": "lg"
              }
            ]
          }
        }
      }
    },
    "/about": {
      "seo": {
        "title": "About Us | Chris & Bruce Pet Spa - Mobile Grooming with Heart",
        "description": "Learn about Chris & Bruce Pet Spa, your trusted mobile grooming service. We bring the spa experience to your doorstep with certified groomers and a custom mobile van for stress-free pet care."
      },
      "sectionOrder": [
        "hero",
        "features",
        "process"
      ],
      "sections": {
        "hero": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "full",
            "padding": "md",
            "headline": "Chris & Bruce Pet Spa: Mobile Grooming with Heart",
            "subheadline": "We bring the spa experience directly to your doorstep, ensuring every pet feels relaxed and loved. Our mission is to provide stress-free grooming with a personal touch.",
            "ctaText": "Book Your Pet's Spa Day",
            "ctaLink": "/booking",
            "imageName": "https://loremflickr.com/1600/900/chris?lock=100358"
          }
        },
        "features": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "default",
            "padding": "md",
            "blocks": [
              {
                "type": "heading",
                "text": "Expertise on Wheels",
                "level": "h2",
                "align": "center",
                "decoration": "line-bottom",
                "spacing": "lg"
              },
              {
                "type": "text",
                "content": "Our team combines professional certifications with a custom-equipped mobile van to deliver top-tier grooming in the comfort of your home.",
                "align": "center",
                "spacing": "md"
              },
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "container",
                        "variant": "default",
                        "position": "relative",
                        "background": "surface",
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Award",
                            "title": "Certified Groomers",
                            "description": "Our team holds IPG and NDGAA certifications, ensuring the highest standards.",
                            "variant": "vertical",
                            "align": "center",
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
                        "type": "container",
                        "variant": "default",
                        "position": "relative",
                        "background": "surface",
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "feature",
                            "icon": "Van",
                            "title": "Custom Mobile Van",
                            "description": "Equipped with hydro-bath and climate control for your pet's comfort.",
                            "variant": "vertical",
                            "align": "center",
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
                        "type": "container",
                        "variant": "default",
                        "position": "relative",
                        "background": "surface",
                        "padding": "md",
                        "blocks": [
                          {
                            "type": "image",
                            "src": "https://loremflickr.com/1600/900/non?lock=40303",
                            "alt": "Non-slip floors and secure restraints in the mobile van",
                            "aspect": "square",
                            "spacing": "sm"
                          },
                          {
                            "type": "heading",
                            "text": "Safety First",
                            "level": "h3",
                            "align": "center",
                            "decoration": "none",
                            "spacing": "sm"
                          },
                          {
                            "type": "text",
                            "content": "Non-slip floors and secure restraints ensure your pet's safety during grooming.",
                            "align": "center",
                            "spacing": "md"
                          }
                        ],
                        "spacing": "md"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        "process": {
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
                "text": "The Stress-Free Difference",
                "level": "h2",
                "align": "center",
                "decoration": "line-bottom",
                "spacing": "lg"
              },
              {
                "type": "text",
                "content": "From gentle handling to calming techniques, we prioritize pet wellness at every step. See what our clients say about the transformation.",
                "align": "center",
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
                        "text": "Gentle Handling",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "We use soft, reassuring touches to calm even the most anxious pets.",
                        "align": "left",
                        "spacing": "lg"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/bruce?lock=26458",
                        "alt": "Bruce softly brushing an anxious pup",
                        "aspect": "video",
                        "spacing": "lg"
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
                        "src": "https://loremflickr.com/1600/900/chris?lock=456724",
                        "alt": "Chris using low-noise tools on a small dog",
                        "aspect": "video",
                        "spacing": "lg"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "Quiet Clippers & Soothing Sounds",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Our low-noise tools and calming music create a peaceful grooming environment.",
                        "align": "left",
                        "spacing": "lg"
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
                        "text": "Home Environment Benefits",
                        "level": "h3",
                        "align": "left",
                        "decoration": "none",
                        "spacing": "md"
                      },
                      {
                        "type": "text",
                        "content": "Grooming in the comfort of home reduces stress and allows for a more personalized experience.",
                        "align": "left",
                        "spacing": "lg"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "image",
                        "src": "https://loremflickr.com/1600/900/cat?lock=110681",
                        "alt": "A cat relaxing in a mobile van cabin",
                        "aspect": "video",
                        "spacing": "lg"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "testimonial-card",
                "quote": "They turned my nervous dog into a happy, clean best friend—without leaving our driveway!",
                "author": "Sarah J.",
                "role": "Golden Retriever Mom",
                "avatar": "https://loremflickr.com/1600/900/client?lock=314076",
                "spacing": "lg"
              }
            ]
          }
        }
      }
    },
    "/contact": {
      "seo": {
        "title": "Contact Us - Chris & Bruce Pet Spa | Mobile Grooming",
        "description": "Get in touch with Chris & Bruce Pet Spa. Book mobile pet grooming, view service area, hours, and FAQs. We bring professional care to your doorstep."
      },
      "sectionOrder": [
        "hero_contact",
        "map_service_area",
        "blocks_contact_info"
      ],
      "sections": {
        "hero_contact": {
          "type": "hero",
          "variant": "simple",
          "props": {
            "background": "primary",
            "animation": "fade",
            "width": "default",
            "padding": "lg",
            "headline": "Ready for a Spa Day?",
            "subheadline": "Chris & Bruce Pet Spa comes to you. Book an appointment for mobile grooming in your neighborhood or send us a message with your questions.",
            "ctaText": "Book Now",
            "ctaLink": "/booking",
            "imageName": "https://loremflickr.com/1600/900/ready?lock=101891"
          }
        },
        "map_service_area": {
          "type": "map",
          "variant": "embedded",
          "props": {
            "background": "muted",
            "animation": "slide-up",
            "width": "full",
            "padding": "md",
            "title": "Our Service Area",
            "address": "We service the greater Melbourne region. Our mobile van is based in Carlton and travels to your home. Enter your zip code on the booking page to confirm availability.",
            "zoom": 12
          }
        },
        "blocks_contact_info": {
          "type": "blocks",
          "variant": "prose",
          "props": {
            "background": "surface",
            "animation": "zoom-in",
            "width": "default",
            "padding": "lg",
            "blocks": [
              {
                "type": "columns",
                "layout": "3-col",
                "items": [
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Phone",
                        "title": "Call Us",
                        "description": "(03) 1234 5678",
                        "variant": "horizontal",
                        "align": "center",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Mail",
                        "title": "Email Us",
                        "description": "hello@chrisandbruce.com.au",
                        "variant": "horizontal",
                        "align": "center",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Messagecircle",
                        "title": "Text Us",
                        "description": "Respond within 2 hours",
                        "variant": "horizontal",
                        "align": "center",
                        "spacing": "md"
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
                        "type": "feature",
                        "icon": "Clock",
                        "title": "Mon-Fri",
                        "description": "9:00 AM - 5:00 PM",
                        "variant": "compact",
                        "align": "center",
                        "spacing": "none"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Clock",
                        "title": "Saturday",
                        "description": "9:00 AM - 3:00 PM",
                        "variant": "compact",
                        "align": "center",
                        "spacing": "none"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "feature",
                        "icon": "Clock",
                        "title": "Sunday",
                        "description": "Closed",
                        "variant": "compact",
                        "align": "center",
                        "spacing": "none"
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
                        "text": "What areas do you service?",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "We cover the greater Melbourne metropolitan area, including inner suburbs up to 15km from Carlton. Specific suburbs include Carlton, Fitzroy, Brunswick, Richmond, South Yarra, and parts of St Kilda. Use our booking tool to check your exact postcode.",
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
                        "type": "text",
                        "content": "Appointments must be booked at least 48 hours in advance. Same-day bookings are rarely available due to our scheduled routes. For urgent matters, please call us directly to check for cancellations.",
                        "align": "left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "heading",
                        "text": "How far in advance should I book?",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
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
                        "text": "What payment methods do you accept?",
                        "level": "h3",
                        "align": "left",
                        "decoration": "line-left",
                        "spacing": "md"
                      }
                    ]
                  },
                  {
                    "blocks": [
                      {
                        "type": "text",
                        "content": "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and cash. Payment is due at the time of service. We also offer gift vouchers for purchase.",
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
    }
  }
};