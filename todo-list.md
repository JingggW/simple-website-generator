# PropSite Engine: Project Roadmap

## 🚀 Active Backlog (To-Do)

### 🔥 High Priority: Infrastructure & Multi-tenancy
- [ ] **Multi-tenant Routing**: Implement `middleware.ts` for dynamic hostname-based routing.
- [ ] **Dynamic Client Page**: Create `app/[client_id]/[[...slug]]/page.tsx` to render client-specific `site_full.json`.
- [ ] **Google Sheet Client Registry**: Build the fetcher for the hostname-to-`client_id` mapping.
- [ ] **Deployment & Hosting**: Configure Cloudflare/Vercel for production and automated SSL.
- [ ] **Online Demo**: Setup a live environment to showcase generated sites.

### 🤖 Advanced AI & Editing
- [ ] **Systematic SEO Automation**:
    - [ ] **JSON-LD Generator**: Automate `LocalBusiness` schema injection in `layout.tsx` (NAP, Operating Hours, and Map Pack optimization).
    - [ ] **Dynamic Meta Formula**: Implement formulaic `generateMetadata`: `[Keyword] [Primary Service] | [Suburb] | [Brand Name]`.
    - [ ] **Automated SEO Assets**: Integrate `next-sitemap` for automated `sitemap.xml` and `robots.txt` generation.
    - [ ] **Localized Image Alts**: Implement fallback formula for missing alt tags: `[Brand] [Section Context] in [Suburb]`.
    - [ ] **CWV Performance Pitch**: Verify 100/100 Lighthouse scores to leverage the "Next.js vs WordPress" speed advantage.
- [ ] **Admin Dashboard (Lite)**: Build a simple UI for users to trigger "Natural Language" edits (Insert/Remove) without the CLI.
- [ ] **Engine ContentUpdater**: Capability to sync specific content edits from Google Sheets back into `site_full.json`.
- [ ] **Visual Differentiation Testing**: Run 5+ similar businesses (e.g., 5 hair salons) to verify the new "Brand Angle" and "Variance" rules.

### 📊 CRM & Apps Script
- [ ] **CRM Security Hardening**: Finalize Google Apps Script security and OAuth scopes.
- [ ] **Sales Pipeline View**: Implement automated dropdown statuses and conditional formatting in the Lead sheet.
- [ ] **Insights & Analytics Tab**: Automate lead velocity and source tracking within the CRM sheet.

### 🌐 Extended Ecosystem (Sheet-Powered)
- [ ] **Outbound Sales Engine**: Apps Script capability to generate and send personalized outbound emails from prospect lists in Sheets.
- [ ] **City Lead Event Dashboard**: A specialized sheet structure and automation for managing localized events and attendee comms.
- [ ] **Affiliate/Partnership Portal**: A "vibe-coded" frontend page that connects to a Google Sheet to track partner performance and program details.

---

## ✅ Archive (Completed Tasks)

### 🛠️ Core Engine & Components
- [x] **New Section Types**: Carousel, Accordion, Tabs, and Gallery implemented with full AI assembly support.
- [x] **Intelligent Node Placement**: `insert-node.ts` now uses LLM to find the best position (before/after/start).
- [x] **Natural Language CLI**: Translator for intent-based commands (Implemented via `insert-node`/`remove-node`).
- [x] **Site Architect**: Structural Blueprinting (Sitemap + Page Plans).
- [x] **Master UI Designer**: Centralized branding and visual strategy (with new Brand Angle logic).
- [x] **Section Dividers**: Artistic SVG transitions between sections.
- [x] **Heading Decorations**: Added line-left, line-bottom, and underline for blocks.

### 🎨 UI/UX & Design
- [x] **Theme Picker UI**: Tool to dynamically change color schemes and modes for demo.
- [x] **Modern Aesthetic Library**: Added `boutiqueAtelier` and high-end presets.
- [x] **Accessibility (A11y)**: Automated contrast ratio enforcement in the engine.
- [x] **Scroll Animations**: Interaction layer with framer-motion.
- [x] **Unified Layout**: Standardized section padding and rhythmic spacing.

### ⚙️ Stability & Self-Healing
- [x] **Self-Healing Config**: `insert-node` now automatically fixes corrupted `site.ts` from `site.json`.
- [x] **Agentic Failure Recovery**: Self-healing link repair system.
- [x] **In-Memory State**: Standardized `site.json` as source of truth.
- [x] **HTML Injection Guard**: Programmatic stripping of unsafe tags.
- [x] **Surgical Schema Extraction**: Generators only see relevant Zod rules.
- [x] **Design Auto-Repair**: Programmatic enforcement of "Golden Rules" (padding, brightness).
