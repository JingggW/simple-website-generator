/**
 * PROGRAMMATIC SANITIZER
 * 
 * Brute-forces common AI schema hallucinations into valid structures.
 */

export function sanitize_json_structure(data: any): any {
  if (!data || typeof data !== "object") return data;

  const sanitized = JSON.parse(JSON.stringify(data));

  const walk = (obj: any) => {
    if (!obj || typeof obj !== "object") return;

    for (const key in obj) {
      // 1. Auto-map 'url' to 'href'
      if (key === "url" && !obj.href) obj.href = obj[key];

      // 2. Fix Section Variants (brute-force valid options)
      if (key === "variant" && obj.type === "blocks") {
        const valid = ["prose", "wide", "full"];
        if (!valid.includes(obj[key])) obj[key] = "prose";
      }
      
      if (key === "variant" && obj.type === "hero") {
        const valid = ["simple", "split"];
        if (!valid.includes(obj[key])) obj[key] = "simple";
      }

      // 3. Prevent 'undefined' for required fields (fill with placeholder)
      // For Headings
      if (obj.type === "heading" && obj.text === undefined) obj.text = "Untitled Section";
      // For Text
      if (obj.type === "text" && obj.content === undefined) obj.content = "";
      // For Buttons
      if (obj.type === "button") {
        if (obj.label === undefined) obj.label = "Click Here";
        if (obj.href === undefined) obj.href = "#";
        if (!["primary", "secondary", "outline"].includes(obj.variant)) obj.variant = "primary";
      }

      // 4. Ensure props exist
      if (obj.type && !obj.props) obj.props = {};

      walk(obj[key]);
    }
  };

  walk(sanitized);
  return sanitized;
}

export function unwrap_page_root(data: any): any {
  if (data.page && data.page.sections) return data.page;
  if (data.pages && typeof data.pages === "object") return Object.values(data.pages)[0];
  return data;
}
