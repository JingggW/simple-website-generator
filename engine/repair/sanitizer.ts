/**
 * PROGRAMMATIC SANITIZER
 */

export function sanitize_json_structure(data: any): any {
  if (!data || typeof data !== "object") return data;

  const sanitized = JSON.parse(JSON.stringify(data));

  const walk = (obj: any) => {
    if (!obj || typeof obj !== "object") return;

    for (const key in obj) {
      // 1. STRIP RAW HTML FROM ALL STRINGS (Prevention of <form> hallucinations)
      if (typeof obj[key] === "string") {
        const hasHtml = /<[a-z][\s\S]*>/i.test(obj[key]);
        if (hasHtml) {
          // If we find HTML, strip tags but keep inner text
          obj[key] = obj[key].replace(/<[^>]*>?/gm, '');
        }
      }

      // 2. Auto-map 'url' -> 'href'
      if (key === "url" && !obj.href) obj.href = obj[key];

      // 3. Fix Form Field Types
      if (obj.type && typeof obj.type === "string") {
        const t = obj.type.toLowerCase();
        if (obj.label && obj.name) {
          const validTypes = ["text", "email", "textarea", "select"];
          if (!validTypes.includes(t)) {
            if (t.includes("mail")) obj.type = "email";
            else if (t.includes("area") || t.includes("message")) obj.type = "textarea";
            else if (t.includes("select") || t.includes("option")) obj.type = "select";
            else obj.type = "text";
          }
        }
      }

      // 4. Fix Missing Alignment
      if (["heading", "text", "button"].includes(obj.type)) {
        if (obj.align === undefined) obj.align = "left";
      }

      // 5. Fix Section Variants
      if (key === "variant" && obj.type === "blocks") {
        const valid = ["prose", "wide", "full"];
        if (!valid.includes(obj[key])) obj[key] = "prose";
      }

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
