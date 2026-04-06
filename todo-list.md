# PropSite Engine Todo List

## 🔥 High Priority
- [ ] **CRM / Apps Script Fixes**: Resolve reported issues with Google Apps Script (Email/Calendar/Security).
- [ ] **Multi-tenant Routing**: Implement `middleware.ts` for dynamic hostname-based routing to client-specific sites.
- [ ] **Dynamic Client Page**: Create `app/[client_id]/[[...slug]]/page.tsx` to load and render client-specific `site_full.json` configurations.
- [ ] **Google Sheet Client Registry**: Define structure and implement fetching for a Google Sheet that maps hostnames to `client_id`s.
- [ ] **Engine ContentUpdater**: Develop a new Engine capability to fetch, merge, and validate content updates from Google Sheets into `site_full.json`.
- [ ] **CRM Multi-Sheet Management**: Automate creation of "Marketing List," "Revenue," and "Analytics" tabs for Google Sheets.
- [x] **In-Memory State**: Standardized `site.json` as source of truth (Completed).
- [x] **Link Integrity**: Recursive scanning for nav and CTA buttons (Completed).
- [x] **Self-Healing**: 3-retry loop with specific Zod error feedback (Completed).
- [x] **Global UI/UX Design**: Refactor to design visual brief ONCE per site (Completed).
- [x] **HTML Injection Guard**: Programmatic stripping of `<form>` and other tags (Completed).
- [x] **Programmatic Section Repair**: Convert block-hallucinations (like text-based price lists) into real components (Completed).
- [x] **Luxury Layouts**: Implemented Victor Churchill style alternating split list (Completed).
- [x] **Preset-Driven UI**: Site Architect now enforces exact colors from presets (Completed).
- [x] **Design Auto-Repair**: Programmatic enforcement of "Golden Rules" (padding, brightness) (Completed).
- [x] **Spreadsheet CRM**: Secure lead capture with Calendar sync and Email alerts (Completed).

## 🛠️ Core Engine Features
- [ ] **Carousel/Slider Section**: Implement a new section type for dynamic content display (images, testimonials).
- [ ] **Accordion/FAQ Section**: Implement a new section type for collapsible content.
- [ ] **Tabbed Content Section**: Implement a new section type for organizing content into tabs.
- [ ] **Gallery/Portfolio Section**: Implement a new section type for advanced image/portfolio display.
- [x] **Site Architect**: Structural Blueprinting (Sitemap + Page Plans) (Completed).
- [x] **Surgical Schema Extraction**: Generators only see relevant Zod rules (Completed).
- [x] **Master UI Designer**: Centralized branding and navigation planning (Completed).
- [x] **Heading Decorations**: Added line-left, line-bottom, and underline for blocks (Completed).
- [x] **Section Dividers**: Artistic SVG transitions between sections (Waves, Slants) (Completed).

## 🎨 UI/UX & Design
- [x] **Layout Versatility**: Section Widths and Block Spacing (Completed).
- [x] **Scroll Animations**: Add interaction layer with framer-motion (Completed).
- [x] **Expanded Color Palette**: Added surface, muted, and accent colors (Completed).
- [x] **Accessibility (A11y)**: Automated contrast ratio checker (Completed).
- [x] **Unified Layout**: Standardized section padding and rhythmic spacing (Completed).
- [x] **Modern Aesthetic Library**: Added `boutiqueAtelier` for high-end retail (Completed).
- [x] **Theme Picker UI**: Simple UI to dynamically change color schemes and modes for demo (Completed).

## 🤖 Advanced AI Workflow
- [x] **Agentic Failure Recovery**: Self-healing link repair system (Completed).
- [ ] **Natural Language CLI**: Translator for intent-based commands.
- [x] **Content-First Strategy**: Copy generation before JSON assembly (Completed).
- [x] **Context-Aware Assets**: Automated placeholder image search (Completed).
- [x] **Single-Word Keywords**: Optimized image search for better relevance (Completed).
