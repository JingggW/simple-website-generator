# PropSite Engine: Project Roadmap

## 🚀 Active Backlog (To-Do)

### 📥 Phase 1: Structured Ingestion (Current Focus)
- [ ] **Define Ingestion Schema**: Create a formal Zod schema for `BusinessProfile` (Services, USP, Suburb, Contact, Socials, Vibe).
- [ ] **Engine Refactor (Context-Aware)**: Update `PropSiteEngine.generateFullWebsite` to accept a `BusinessProfile` object instead of a raw string.
- [ ] **Prompt Engineering (Data-Injection)**: Update `site-architect.md` and `master-ui-designer.md` to surgically use fields from the Profile (e.g., specific service names).
- [ ] **Sample Onboarding Generator**: Create a script to generate a "Gold Standard" site using a structured JSON input.

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
