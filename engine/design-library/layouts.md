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
    { "blocks": [ /* Text/Heading blocks */ ] },
    { "blocks": [ /* Image block */ ] }
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

