import { describe, it, expect } from "vitest";
import { get_placeholder_url, auto_fill_placeholders } from "../engine/generators/image_searcher";

describe("Image Searcher Utility", () => {
  it("should generate a valid LoremFlickr URL with max 2 keywords", () => {
    const query = "Sourdough-Bread-Bakery";
    const url = get_placeholder_url(query, 1600, 900);
    expect(url).toBe("https://loremflickr.com/1600/900/sourdough,bread/all");
  });

  it("should handle special characters and spaces in keywords and limit to 2", () => {
    const query = "Fresh Sourdough & Pastries!";
    const url = get_placeholder_url(query);
    expect(url).toBe("https://loremflickr.com/1600/900/fresh,sourdough/all");
  });

  it("should pick keywords from headline first", () => {
    const props = { headline: "Artisan Bread", title: "Something else" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("artisan,bread");
  });

  it("should fallback to title if headline is missing and limit keywords", () => {
    const props = { title: "Local Bakery Shop" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("local,bakery");
    expect(url).not.toContain("shop");
  });

  it("should fallback to 'business' if no source available", () => {
    const props = {};
    const url = auto_fill_placeholders(props);
    expect(url).toBe("https://loremflickr.com/1600/900/business/all");
  });

  it("should fallback to src if other fields are missing", () => {
    const props = { src: "bra-styles-gallery" };
    const url = auto_fill_placeholders(props);
    expect(url).toContain("bra,styles");
  });
});
