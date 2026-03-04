import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = {
  theme: {
    mode: "light",
    colors: {
      primary: "#6B8E23",
      secondary: "#8B4513",
      background: "#FFFFFF",
      text: "#111827",
    },
    fontStyle: "serif",
    borderRadius: "full",
  },
  header: {
    title: "Paws & Co.",
    links: [
      {
        type: "link",
        label: "Home",
        href: "/",
      },
      {
        type: "link",
        label: "About",
        href: "/about",
      },
      {
        type: "link",
        label: "Services",
        href: "/services",
      },
      {
        type: "link",
        label: "Contact",
        href: "/contact",
      },
    ],
    cta: {
      type: "link",
      label: "Book Now",
      href: "/contact",
    },
  },
  footer: {
    brand: {
      title: "Paws & Co.",
      description:
        "Premium professional dog grooming and washing in Point Cook, Melbourne.",
    },
    copyright: "© 2024 Paws & Co. All rights reserved.",
    columns: [
      {
        title: "Quick Links",
        links: [
          {
            type: "link",
            label: "Home",
            href: "/",
          },
          {
            type: "link",
            label: "About",
            href: "/about",
          },
          {
            type: "link",
            label: "Services",
            href: "/services",
          },
          {
            type: "link",
            label: "Contact",
            href: "/contact",
          },
        ],
      },
      {
        title: "Services",
        links: [
          {
            type: "link",
            label: "Grooming",
            href: "/services",
          },
          {
            type: "link",
            label: "Washing",
            href: "/services",
          },
          {
            type: "link",
            label: "Premium Packages",
            href: "/services",
          },
        ],
      },
      {
        title: "Contact",
        links: [
          {
            type: "link",
            label: "Phone",
            href: "tel:+61123456789",
          },
          {
            type: "link",
            label: "Email",
            href: "mailto:info@pawsandco.com.au",
          },
          {
            type: "link",
            label: "Address",
            href: "/contact",
          },
        ],
      },
    ],
    social: [
      {
        platform: "facebook",
        url: "https://facebook.com/pawsandco",
      },
      {
        platform: "instagram",
        url: "https://instagram.com/pawsandco",
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/company/pawsandco",
      },
    ],
  },
  pages: {
    "/": {
      seo: {
        title:
          "Chris Dog Washing – Your Dog's Perfect Spot for Care & Cleanliness",
        description:
          "Discover our modern, pet-friendly washing service in Point Cook. Experience trust, comfort, and expert care for your furry friend. Book today!",
      },
      sectionOrder: ["hero", "services", "testimonials", "contact"],
      sections: {
        hero: {
          type: "hero",
          variant: "split",
          props: {
            headline:
              "Welcome to Chris Dog Washing – Where Modern Pet Care Meets Natural Elegance.",
            subheadline:
              "At Chris Dog Washing, we believe every dog deserves a clean, comfortable, and modern experience.",
            ctaText: "Schedule a Washing Appointment",
            ctaLink: "/booking",
            imageName: "dog-washing-modern-setting",
          },
        },
        services: {
          type: "services",
          variant: "grid",
          props: {
            title:
              "From Spotless Paws to Fresh Scents – Explore Our Premium Washing Solutions.",
            items: [
              {
                icon: "Flame",
                title: "Eco-Friendly Products",
                description:
                  "Premium, eco-friendly products designed with your pet's skin in mind.",
              },
              {
                icon: "HelpCircle",
                title: "Trusted Service",
                description:
                  "Trusted by local pet owners for reliable, stress-free service.",
              },
              {
                icon: "Droplets",
                title: "Expert Cleanings",
                description:
                  "Our expert technicians deliver thorough cleanings tailored to your dog's needs.",
              },
              {
                icon: "Wrench",
                title: "Customized Packages",
                description:
                  "Choose from hand-washing, deep-clearing, and special pet grooming packages.",
              },
            ],
          },
        },
        testimonials: {
          type: "testimonials",
          variant: "grid",
          props: {
            title:
              "Real Results, Real Love – Hear What Our Clients Say About Us.",
            subtitles:
              "Our clients rave about the care, comfort, and quality of service.",
            items: [
              {
                quote:
                  "Chris Dog Washing transformed my dog's grooming experience. The staff is so gentle, and my pup always comes out looking and smelling amazing!",
                author: "Sarah M.",
                role: "Dog Owner",
                avatar: "happy-dog-owner-1",
              },
              {
                quote:
                  "I've tried many pet wash services, but Chris Dog Washing is by far the best. Their attention to detail and love for animals truly shows.",
                author: "Michael T.",
                role: "Dog Owner",
                avatar: "happy-dog-owner-2",
              },
            ],
          },
        },
        contact: {
          type: "contact",
          variant: "simple",
          props: {
            title:
              "Ready for a Spotless Future? Book Your Washing Appointment Now!",
            description:
              "Visit us in Point Cook or book online for convenience.",
            email: "info@chrisdogwashing.com",
            phone: "(03) 1234 5678",
            address: "123 Pet Care Avenue, Point Cook, VIC 3030",
          },
        },
      },
    },
    "/about": {
      seo: {
        title: "About The Groomery – Premium Dog Grooming in Point Cook",
        description:
          "Discover the story behind Melbourne’s most caring dog grooming business. Southern charm meets professional care for your pet.",
      },
      sectionOrder: ["about"],
      sections: {
        about: {
          type: "content",
          variant: "simple",
          props: {
            title: "About The Groomery",
            body: "Discover the story behind Melbourne’s most caring dog grooming business. Southern charm meets professional care for your pet.",
          },
        },
      },
    },
    "/services": {
      seo: {
        title:
          "Premium Dog Grooming & Washing – Your Pup Deserves the Best in Melbourne",
        description:
          "Experience the ultimate blend of professional precision and gentle warmth at our premium dog grooming and washing service in Point Cook, Melbourne. Our spa-like atmosphere ensures every pet feels pampered, while our expert team delivers top-notch results. Discover how we combine clean, refined care with a deep understanding of pet comfort.",
      },
      sectionOrder: [
        "aboutUs",
        "services",
        "whyChooseUs",
        "testimonials",
        "clientTestimonials",
        "cta",
      ],
      sections: {
        aboutUs: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "About Us",
                level: "h1",
              },
              {
                type: "text",
                content:
                  "Our mission is to offer premium, spa-inspired grooming and washing services tailored to every dog's unique needs. With a serene, professional setting, we combine meticulous care with genuine warmth, ensuring you feel confident in your pet's well-being.",
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
                text: "Services",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "Learn how our skilled groomers deliver a spa-like experience, from deep-clean baths to stylish styling.",
              },
              {
                type: "text",
                content:
                  "Each service is customized to suit your pup's breed, age, and personality.",
              },
            ],
          },
        },
        whyChooseUs: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Why Choose Us?",
                level: "h2",
              },
              {
                type: "text",
                content:
                  "Our certified professionals bring years of experience, ensuring safe and effective treatments.",
              },
              {
                type: "text",
                content:
                  "We use only the highest-quality shampoos and conditioners for a flawless finish.",
              },
              {
                type: "text",
                content:
                  "Every detail is designed to make your dog feel at ease.",
              },
            ],
          },
        },
        testimonials: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "What Our Clients Are Saying",
                level: "h3",
              },
              {
                type: "text",
                content:
                  '"Our dog\'s coat looked like it was new, and he seemed so loved!" – Jane D.',
              },
              {
                type: "text",
                content:
                  '"The team was knowledgeable and kind – a true professional."',
              },
            ],
          },
        },
        clientTestimonials: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "text",
                content:
                  '"A spa day for dogs – absolutely worth it!" – Mark T.',
              },
              {
                type: "text",
                content:
                  '"Our pet feels respected and cared for from start to finish." – Sarah L.',
              },
            ],
          },
        },
        cta: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "button",
                label: "Book Your Spa-Day Grooming Today",
                href: "/booking",
                variant: "primary",
              },
            ],
          },
        },
      },
    },
    "/contact": {
      seo: {
        title: "Contact Us - Book Your Dog's Spa Day",
        description:
          "Get in touch with our friendly team to schedule a refreshing dog wash experience that will leave your furry friend looking and feeling their best.",
      },
      sectionOrder: [
        "hero_section",
        "booking_section",
        "contact_info_section",
        "online_booking_section",
        "first_visit_section",
        "special_requests_section",
        "testimonials_section",
        "final_cta_section",
      ],
      sections: {
        hero_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Ready for Your Pup's Spa Day?",
                level: "h1",
              },
              {
                type: "heading",
                text: "Booking is as easy as a belly rub!",
                level: "h2",
              },
              {
                type: "image",
                src: "happy_golden_retriever_grooming_tub",
                alt: "A happy golden retriever sitting in a bright, modern grooming tub with bubbles, looking up at the camera with a playful expression.",
              },
            ],
          },
        },
        booking_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Simple Booking in 3 Easy Steps",
                level: "h2",
              },
              {
                type: "heading",
                text: "1. Choose Your Service",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "Select from our range of dog wash packages - from quick refreshes to full spa treatments.",
              },
              {
                type: "heading",
                text: "2. Pick Your Perfect Time",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "We're open 7 days a week with flexible morning and afternoon slots.",
              },
              {
                type: "image",
                src: "dog_wash_packages_and_calendar",
                alt: "Split-screen image showing various dog wash packages on the left and a calendar with highlighted available slots on the right.",
              },
            ],
          },
        },
        contact_info_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Get in Touch",
                level: "h2",
              },
              {
                type: "heading",
                text: "Call Us",
                level: "h3",
              },
              {
                type: "text",
                content: "(555) 123-PUPS (7877)\nMonday - Sunday: 8 AM - 6 PM",
              },
              {
                type: "heading",
                text: "Email Us",
                level: "h3",
              },
              {
                type: "text",
                content: "info@petsgrooming.com\nResponses within 24 hours",
              },
              {
                type: "heading",
                text: "Visit Us",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "123 Bark Street, Petville, PA 12345\nFree parking available",
              },
              {
                type: "image",
                src: "cozy_reception_area",
                alt: "A cozy reception area with a smiling staff member greeting a customer and their small dog.",
              },
            ],
          },
        },
        online_booking_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Book Online - Instant Confirmation",
                level: "h2",
              },
              {
                type: "heading",
                text: "Skip the wait! Our online booking system lets you:",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "• View real-time availability\n• Choose your preferred groomer\n• Add special requests\n• Get instant confirmation",
              },
              {
                type: "image",
                src: "online_booking_interface",
                alt: "Screenshot of the online booking interface showing available time slots, service selections, and a progress indicator.",
              },
            ],
          },
        },
        first_visit_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Your First Visit",
                level: "h2",
              },
              {
                type: "heading",
                text: "Arrival",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "Just bring your pup and their favorite treats! We'll take care of everything else.",
              },
              {
                type: "heading",
                text: "During the Wash",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "You're welcome to wait in our comfortable lounge or run errands - we'll call when your dog is ready.",
              },
              {
                type: "heading",
                text: "Pick Up",
                level: "h3",
              },
              {
                type: "text",
                content:
                  "Freshly washed, brushed, and smelling wonderful! We'll provide care instructions and grooming tips.",
              },
              {
                type: "image",
                src: "dog_grooming_process_collage",
                alt: "A collage showing the before (dirty dog), during (in the wash), and after (clean, happy dog with a bow) process.",
              },
            ],
          },
        },
        special_requests_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Have Special Needs?",
                level: "h2",
              },
              {
                type: "text",
                content: "We're happy to accommodate:",
              },
              {
                type: "text",
                content: "✓ Senior dogs who need extra gentle handling",
              },
              {
                type: "text",
                content: "✓ Anxious pets who prefer quiet spaces",
              },
              {
                type: "text",
                content: "✓ Medicated baths for skin conditions",
              },
              {
                type: "text",
                content: "✓ Same-day appointments for emergencies",
              },
              {
                type: "image",
                src: "gentle_groomer_with_older_dog",
                alt: "A gentle groomer working with an older dog, demonstrating the careful, patient approach.",
              },
            ],
          },
        },
        testimonials_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "What Our Clients Say",
                level: "h2",
              },
              {
                type: "text",
                content:
                  '"Hands down the best experience! My golden retriever smells amazing and looks like a show dog." - Sarah T.',
              },
              {
                type: "text",
                content:
                  '"The staff are absolute angels with my nervous rescue. I trust them completely." - Mike R.',
              },
              {
                type: "text",
                content:
                  '"Finally found a place that handles my doodle\'s crazy coat. Worth every penny!" - Jennifer L.',
              },
              {
                type: "image",
                src: "satisfied_customers_with_groomed_dogs",
                alt: "Three satisfied customers with their freshly groomed dogs, each showing off their happy pets.",
              },
            ],
          },
        },
        final_cta_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Ready to Pamper Your Pup?",
                level: "h2",
              },
              {
                type: "heading",
                text: "Don't wait to give your dog the spa treatment they deserve!",
                level: "h3",
              },
              {
                type: "button",
                label: "Book Your Dog's Wash Now",
                href: "/booking",
                variant: "primary",
              },
              {
                type: "button",
                label: "View All Services",
                href: "/services",
                variant: "secondary",
              },
              {
                type: "image",
                src: "happy_dog_running_clean_fur",
                alt: "A happy dog running through a field with fresh, clean fur flying, capturing the joy of a great grooming experience.",
              },
            ],
          },
        },
      },
    },
  },
};
