# PropSite Engine: Project Roadmap

## 🚀 Active Backlog (To-Do)

### 📥 Phase 1: Structured Ingestion (Current Focus)
- [ ] **Define Ingestion Schema**: Create a formal Zod schema for `BusinessProfile` (Services, USP, Suburb, Contact, Socials, Vibe).
- [ ] **Engine Refactor (Context-Aware)**: Update `PropSiteEngine.generateFullWebsite` to accept a `BusinessProfile` object instead of a raw string.
- [ ] **Prompt Engineering (Data-Injection)**: Update `site-architect.md` and `master-ui-designer.md` to surgically use fields from the Profile (e.g., specific service names).
- [ ] **Sample Onboarding Generator**: Create a script to generate a "Gold Standard" site using a structured JSON input.

### 🎨 UI/UX & Design Polish
- [ ] **Dynamic Padding Controls**: Embed global padding/spacing adjustments into the frontend `ThemePicker.tsx`.
- [ ] **Global Shadow Controls**: Implement a systematic way to control shadow depth and intensity (e.g., none, soft, deep, neon) across buttons and containers, with potential frontend picker integration.
- [ ] **Configurable Hero Corners**: Add support for toggling border-radius on Hero sections (e.g., bleed vs contained with rounded corners).
- [ ] **Transition Animation Polish**: Debug `SectionDivider` animations.

### 🔥 High Priority: Infrastructure & Deployment
- [ ] **Deployment Automation**: Refine and finalize the deployment script for automated Vercel/Cloudflare pushes.
- [ ] **Multi-tenant Routing**: Implement `middleware.ts` for dynamic hostname-based routing.
- [ ] **Dynamic Client Page**: Create `app/[client_id]/[[...slug]]/page.tsx` to render client-specific `site_full.json`.
- [ ] **Google Sheet Client Registry**: Build the fetcher for the hostname-to-`client_id` mapping.

### 🤖 Advanced AI & SEO
- [ ] **Systematic SEO Automation**:
    - [ ] **JSON-LD Generator**: Automate `LocalBusiness` schema injection in `layout.tsx`.
    - [ ] **Dynamic Meta Formula**: Implement formulaic `generateMetadata`.
- [ ] **Admin Dashboard (Lite)**: Build a simple UI for users to trigger "Natural Language" edits.
- [ ] **Visual Differentiation Testing**: Verify the "Brand Angle" rules across similar businesses.

### 🏗️ Architecture & Technical Debt
- [ ] **Refactor Icon Management System**:
    *   **Current State**: We use a "Fuzzy String" approach. AI picks a name -> `icon_repairer.ts` semantically maps it (e.g., "money" -> "DollarSign") and normalizes it to PascalCase -> `IconMap.tsx` tries to find it in `lucide-react`. 
    *   **Pain Points**: The `SEMANTIC_MAP` in `icon_repairer.ts` requires constant manual updates for each new industry, and string-based mapping is fragile (case-sensitivity issues).
    *   **Goal**: Move to a more rigid, automated system (e.g., a verified icon manifest for the AI to choose from, or a dedicated icon-selection sub-agent).

---

## ⏸️ Parked Tasks
- [ ] **CRM / Apps Script Refinement**: (Visual Pipeline, Overdue Alerts, Mailing List Sync).
- [ ] **Engine ContentUpdater**: (Syncing content edits from Sheets back to JSON).
- [ ] **Extended Ecosystem**: (Outbound Sales, City Lead Dashboards, Affiliate Portal, Invoice PDF).

---

## ✅ Archive (Completed Tasks)
- [x] **New Section Types**: Accordion, Tabs, Gallery, Carousel.
- [x] **Intelligent Node Placement**: LLM-based `insert-node` positioning.
- [x] **Natural Language CLI**: `insert-node` and `remove-node` functionality.
- [x] **Self-Healing Config**: Auto-regeneration of `site.ts` from `site.json`.