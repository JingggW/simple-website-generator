# DESIGN LIBRARY: LAYOUTS

// --- START SPLIT ---

## Pattern: Modern Split

A 50/50 side-by-side layout commonly used for pairing text with a high-impact image.

### Visual Rule

- Desktop: Two equal columns.
- Mobile: Stacks vertically (Image usually on top).

### Required JSON (Block Type: 'columns')

```json
{
  "type": "columns",
  "layout": "split",
  "items": [
    {
      "blocks": [
        /* Text/Heading blocks */
      ]
    },
    {
      "blocks": [
        /* Image block */
      ]
    }
  ]
}
```

// --- END SPLIT ---

// --- START FEATURE_GRID ---

## Pattern: Feature Grid

A 3-column grid used for listing benefits, values, or small service highlights.

### Visual Rule

- Desktop: 3 columns with equal spacing.
- Mobile: 1 column.

### Required JSON (Block Type: 'columns')

```json
{
  "type": "columns",
  "layout": "3-col",
  "items": [
    { "blocks": [ ... ] },
    { "blocks": [ ... ] },
    { "blocks": [ ... ] }
  ]
}
```

// --- END FEATURE_GRID ---

// --- START ALTERNATING_SPLIT ---

## Pattern: Alternating Split

A series of split layouts where the image and text alternate sides (Image Left, Text Right -> Text Left, Image Right).
This creates a rhythmic flow for "Process" or "Features" sections.

### Visual Rule

- Use multiple 'columns' blocks with layout 'split-left' or 'split-right' to achieve the alternating effect.

### Required JSON (Block Type: 'columns')

```json
[
  {
    "type": "columns",
    "layout": "split-left",
    "items": [
      { "blocks": [ { "type": "image", ... } ] },
      { "blocks": [ { "type": "heading", ... }, { "type": "text", ... } ] }
    ]
  },
  {
    "type": "columns",
    "layout": "split-right",
    "items": [
      { "blocks": [ { "type": "heading", ... }, { "type": "text", ... } ] },
      { "blocks": [ { "type": "image", ... } ] }
    ]
  }
]
```

// --- END ALTERNATING_SPLIT ---

// --- START ASYMMETRIC_SPLIT ---

## Pattern: Asymmetric Focus

Focuses heavily on one side (usually text) with a supporting side (usually a small image or extra detail).

### Required JSON (Block Type: 'columns')

- Use 'split-left' (2fr 1fr) or 'split-right' (1fr 2fr).

```json
{
  "type": "columns",
  "layout": "split-left",
  "items": [
    { "blocks": [ { "type": "heading", ... }, { "type": "text", ... } ] },
    { "blocks": [ { "type": "image", ... } ] }
  ]
}
```

// --- END ASYMMETRIC_SPLIT ---

// --- START DYNAMIC_FEATURE_GRID ---

## Pattern: Dynamic Feature Grid

A highly flexible grid (3 or 4 columns) where each item is a 'container' acting as a card.
Use this for Services, Features, or Why Us sections.

### Visual Rule

- Use 'columns' with '3-col' or '4-col'.
- Each column item should be a 'container' block for a card-like appearance.
- Inside the container, lead with an 'icon' or 'image'.

### Required JSON Example

```json
{
  "type": "columns",
  "layout": "3-col",
  "items": [
    {
      "blocks": [
        {
          "type": "container",
          "background": "surface",
          "padding": "md",
          "blocks": [
            { "type": "icon", "name": "Zap", "size": "md", "color": "primary" },
            { "type": "heading", "text": "Fast Performance", "level": "h3" },
            { "type": "text", "content": "Lightning fast load times for all users." }
          ]
        }
      ]
    },
    ...
  ]
}
```

// --- END DYNAMIC_FEATURE_GRID ---

// --- START ICON_LIST ---

## Pattern: Icon List

A vertical list of items, each starting with an icon. Good for "What's Included" or "Checklists".

### Required JSON Example

```json
{
  "type": "container",
  "blocks": [
    {
      "type": "columns",
      "layout": "split",
      "items": [
        { "blocks": [{ "type": "icon", "name": "Check", "size": "sm" }] },
        { "blocks": [{ "type": "text", "content": "Premium Fabric" }] }
      ]
    }
  ]
}
```

// --- END ICON_LIST ---

// --- START BOUTIQUE_PRICE_LIST ---

## Pattern: Boutique Price List

A structured menu of services and prices, commonly used for salons, spas, or specialized workshops.

### Visual Rule

- Use the 'price-list' block directly.
- Each category creates a distinct card-like section.
- Dotted line connectors automatically join labels and prices.

### Required JSON Example

```json
{
  "type": "price-list",
  "variant": "default",
  "categories": [
    {
      "name": "Hair Services",
      "items": [
        { "label": "Signature Cut", "price": "From $90", "details": "Includes wash and style." },
        { "label": "Balayage", "price": "From $250" }
      ]
    }
  ]
}
```

// --- END BOUTIQUE_PRICE_LIST ---

// --- START MINIMAL_PRICE_LIST ---

## Pattern: Minimal Price List

A cleaner, editorial version of the price list without card backgrounds. Ideal for luxury boutique feel where typography is the focus.

### Required JSON Example

```json
{
  "type": "price-list",
  "variant": "minimal",
  "categories": [
    {
      "name": "The Essentials",
      "items": [
        { "label": "Consultation", "price": "Complimentary" },
        { "label": "Precision Trim", "price": "$120" }
      ]
    }
  ]
}
```

// --- END MINIMAL_PRICE_LIST ---

// --- START BOUTIQUE_TESTIMONIAL ---

## Pattern: Boutique Testimonial Card

A stylized quote block that can be placed anywhere within columns or containers.

### Required JSON Example

```json
{
  "type": "testimonial-card",
  "quote": "The attention to detail here is unmatched. My go-to for bespoke leather goods.",
  "author": "Marcus Aurelius",
  "role": "Frequent Traveler"
}
```

// --- END BOUTIQUE_TESTIMONIAL ---

// --- START IMAGE_GRID ---

## Pattern: Image Showcase / Gallery

A dedicated grid for showcasing work, products, or portfolios. Ideal for small businesses like photographers, builders, or salons.

### Required JSON Example

```json
{
  "type": "image-grid",
  "images": [
    { "src": "gallery-item-1", "alt": "Project A Result", "caption": "Luxury Finish" },
    { "src": "gallery-item-2", "alt": "Project B Result" },
    { "src": "gallery-item-3", "alt": "Project C Result" }
  ],
  "columns": "3",
  "gap": "md",
  "aspect": "square"
}
```

// --- END IMAGE_GRID ---

// --- START FEATURE_BLOCK ---

A cohesive unit combining an icon, title, and description. Use this instead of separate blocks for a cleaner, more stable layout.

### Visual Rule

- Use 'vertical' variant for grids.
- Use 'horizontal' variant for lists or wide columns.
- Use 'compact' variant for high-density information (like small sidebars).

### Required JSON Example

```json
{
  "type": "feature",
  "icon": "MapPin",
  "title": "Visit Us",
  "description": "123 Boutique Lane, Melbourne VIC 3000",
  "variant": "vertical",
  "align": "center"
}
```

// --- END FEATURE_BLOCK ---

// --- START OVERlapping_STORY ---

## Pattern: The Layered Overlap

A luxury layout where a text container partially overlaps an image. Creates high visual depth.

### Visual Rule
- Use `columns` with `split`. 
- One column contains an `image` (aspect: 'portrait' or 'video').
- The other column contains a `container` with `variant: 'card'`, `background: 'surface'`, and `position: 'relative'`.

```json
{
  "type": "columns",
  "layout": "split",
  "items": [
    { "blocks": [{ "type": "image", "src": "...", "aspect": "portrait" }] },
    { 
      "blocks": [{
        "type": "container",
        "variant": "card",
        "background": "surface",
        "padding": "lg",
        "blocks": [
          { "type": "heading", "text": "Our Heritage", "decoration": "line-left" },
          { "type": "text", "content": "..." }
        ]
      }]
    }
  ]
}
```

// --- END OVERlapping_STORY ---

// --- START CINEMATIC_FOCUS ---

## Pattern: Cinematic Focus

A high-impact section with a full-bleed image and a centered floating text box.

### Visual Rule
- Use a `container` with `background: 'none'`.
- Inside, use an `image` (aspect: 'cinematic').
- Inside that same section (or nested), use a `container` with `position: 'absolute-center'`.

```json
{
  "type": "container",
  "background": "none",
  "blocks": [
    { "type": "image", "src": "...", "aspect": "cinematic" },
    {
      "type": "container",
      "position": "absolute-center",
      "variant": "glass",
      "padding": "lg",
      "blocks": [
        { "type": "heading", "text": "The Philosophy", "align": "center" },
        { "type": "text", "content": "...", "align": "center" }
      ]
    }
  ]
}
```

// --- END CINEMATIC_FOCUS ---

// --- START EDITORIAL_STACK ---

## Pattern: Asymmetric Editorial

Magazine-style layout with uneven columns (1/3 vs 2/3).

### Visual Rule
- Use `layout: 'split-right'` or `'split-left'`.
- Use `typographyScale: 'editorial'` for the heading.

```json
{
  "type": "columns",
  "layout": "split-right",
  "items": [
    { "blocks": [ { "type": "heading", "text": "Signature Style", "level": "display" } ] },
    { "blocks": [ { "type": "image", "src": "...", "aspect": "video" }, { "type": "text", "content": "..." } ] }
  ]
}
```

// --- END EDITORIAL_STACK ---
