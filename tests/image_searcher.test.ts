import { describe, it, expect } from "vitest";
import { get_placeholder_url, auto_fill_placeholders } from "../engine/generators/image_searcher";

describe("Image Searcher Utility", () => {
  it("should generate a valid LoremFlickr URL with max 2 quality keywords", () => {
    const query = "Sourdough-Bread-Bakery";
    const url = get_placeholder_url(query, 1600, 900);
    expect(url).toBe("https://loremflickr.com/1600/900/sourdough,bread");
  });

  it("should filter out stop words like 'elevate' and 'your'", () => {
    const query = "Elevate Your Sourdough Experience";
    const url = get_placeholder_url(query);
    // 'elevate', 'your', 'experience' are stop words. Only 'sourdough' remains.
    expect(url).toBe("https://loremflickr.com/1600/900/sourdough");
  });

  it("should pick keywords from headline first", () => {
    const props = { headline: "Baking Artisan Bread", title: "Something else" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("baking,artisan");
  });

  it("should fallback to title if headline is missing and limit keywords", () => {
    const props = { title: "Local Bakery Shop" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("local,bakery");
  });

  it("should fallback to 'business' if no source available", () => {
    const props = {};
    const url = auto_fill_placeholders(props);
    expect(url).toBe("https://loremflickr.com/1600/900/business");
  });

  it("should fallback to src if other fields are missing", () => {
    const props = { src: "bra-styles-gallery" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("bra,styles");
  });

  it("should filter out path-like words from src", () => {
    const props = { src: "/images/core-collection.jpg" };
    const url = auto_fill_placeholders(props);
    // 'images' and 'jpg' should be filtered out. 'core' and 'collection' remain.
    expect(url).toContain("core,collection");
  });
});
