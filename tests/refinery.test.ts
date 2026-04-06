import { describe, it, expect } from "vitest";
import { refine_page } from "../engine/repair/sanitizer";
import { PageConfig } from "../lib/schema";

describe("Refine Page CTA Anchor Links", () => {
  it("should convert self-referencing hero CTA to an anchor link if text matches", () => {
    const mockPageConfig: PageConfig = {
      seo: { title: "Team Page", description: "Meet the team" },
      sectionOrder: ["hero_section", "collective_section"],
      sections: {
        hero_section: {
          type: "hero",
          variant: "visual",
          props: {
            headline: "Meet Our Team",
            ctaText: "Meet the Team",
            ctaLink: "/team", // Self-referencing link
            imageName: "team.jpg",
            background: "default",
            animation: "slide-up",
            width: "default",
            padding: "md",
          },
        },
        collective_section: {
          type: "blocks",
          variant: "prose",
          props: {
            blocks: [
              {
                type: "heading",
                text: "Our Collective",
                level: "h2",
                align: "left",
                decoration: "none",
                spacing: "md",
              }
            ],
            background: "default",
            animation: "slide-up",
            width: "default",
            padding: "md",
          },
        },
      },
    };

    // Need to wrap in a full siteConfig structure for refine_page
    const mockSiteConfig = {
        pages: {
            "/team": mockPageConfig
        },
        theme: { preset: "modernSaaS" }, // Dummy theme for isLuxury check
        header: {}, footer: {},
    };

    // Refine only the page itself, passing the pagePath
    const refinedPage = refine_page(mockPageConfig, mockSiteConfig.theme.preset, "/team");

    const heroSection = refinedPage.sections.hero_section;
    expect(heroSection.props.ctaLink).toBe("/team#collective");
    expect(heroSection.props.ctaText).toBe("Meet the Team"); // Text should remain
  });

  it("should remove hero CTA if self-referencing and no semantic match for anchor", () => {
    const mockPageConfig: PageConfig = {
      seo: { title: "About Us", description: "Our story" },
      sectionOrder: ["hero_section", "content_section"],
      sections: {
        hero_section: {
          type: "hero",
          variant: "simple",
          props: {
            headline: "About Our Company",
            ctaText: "Learn More",
            ctaLink: "/about", // Self-referencing link
            background: "default",
            animation: "slide-up",
            width: "default",
            padding: "md",
          },
        },
        content_section: {
            type: "content",
            variant: "simple",
            props: {
                title: "Our Story",
                body: "Lorem ipsum dolor sit amet.",
                background: "default",
                animation: "slide-up",
                width: "default",
                padding: "md",
            }
        }
      },
    };

    const mockSiteConfig = {
        pages: {
            "/about": mockPageConfig
        },
        theme: { preset: "modernSaaS" },
        header: {}, footer: {},
    };

    const refinedPage = refine_page(mockPageConfig, mockSiteConfig.theme.preset, "/about");

    const heroSection = refinedPage.sections.hero_section;
    expect(heroSection.props.ctaLink).toBeUndefined(); // Link should be removed
    expect(heroSection.props.ctaText).toBeUndefined(); // Text should also be removed if link is removed
  });

  it("should not modify CTA if it links to a different page", () => {
    const mockPageConfig: PageConfig = {
      seo: { title: "Home Page", description: "Welcome" },
      sectionOrder: ["hero_section"],
      sections: {
        hero_section: {
          type: "hero",
          variant: "simple",
          props: {
            headline: "Welcome Home",
            ctaText: "Go to Services",
            ctaLink: "/services", // Different page
            background: "default",
            animation: "slide-up",
            width: "default",
            padding: "md",
          },
        },
      },
    };

    const mockSiteConfig = {
        pages: {
            "/": mockPageConfig
        },
        theme: { preset: "modernSaaS" },
        header: {}, footer: {},
    };

    const refinedPage = refine_page(mockPageConfig, mockSiteConfig.theme.preset, "/");

    const heroSection = refinedPage.sections.hero_section;
    expect(heroSection.props.ctaLink).toBe("/services"); // Should remain unchanged
    expect(heroSection.props.ctaText).toBe("Go to Services"); // Should remain unchanged
  });
});
