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
