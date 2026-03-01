# CONTEXT: Normalized Page Architecture

## Pattern: The "Index Dictionary"
Our website pages do not use a flat array of sections. Instead, they use a **Normalized Node Structure** to allow for surgical AI updates and precise layout control.

## Structure Overview
A page config consists of two main parts:
1. **`sectionOrder`**: An ordered array of unique strings (IDs) that defines the vertical layout of the page.
2. **`sections`**: A dictionary (Record) where each key is a unique ID from the `sectionOrder` and each value is the full section configuration.

## Example JSON
```json
{
  "seo": { "title": "Home", "description": "..." },
  "sectionOrder": ["hero_01", "services_01"],
  "sections": {
    "hero_01": {
      "type": "hero",
      "variant": "split",
      "props": { ... }
    },
    "services_01": {
      "type": "services",
      "variant": "grid",
      "props": { ... }
    }
  }
}
```

## AI Instructions for this Architecture
- **When creating a page**: You must invent descriptive, unique IDs (e.g., `hero_main`, `about_story_01`).
- **When updating a page**:
  - To change the **order**, only modify the `sectionOrder` array.
  - To change **content**, only modify the specific key in the `sections` dictionary.
  - To **insert** a section, add a new ID to `sectionOrder` and a new entry in `sections`.

## Benefits
- **Surgical Precision**: AI can edit one section without seeing or breaking others.
- **Context Efficiency**: We can send only one "node" (section) to an LLM to save tokens and improve accuracy.
- **Flexible Layout**: Moving a section is as simple as moving a string in an array.
