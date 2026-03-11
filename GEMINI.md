# PropSite Engine: AI-Driven Website Architecture

PropSite Engine is a specialized AI-powered orchestrator for generating highly structured, consistent, and self-healing business websites. It bridges the gap between LLM creativity and rigid structural integrity using Zod-enforced schemas and a multi-phase generation lifecycle.

## 🏗️ Core Architecture

The system operates on a **Research -> Strategy -> Execution -> Validation** cycle, materialized through the following layers:

### 1. The Engine (`/engine`)
- **Orchestrator (`PropSiteEngine`):** Manages the full lifecycle from blueprinting to production and auto-repair.
- **Generators (`/generators`):** Specialized agents (Site Architect, Theme Designer, Page Generator, etc.) that handle specific domain logic.
- **Operations (`/operations`):** Post-generation checks for link integrity, orphan pages, and visual consistency.
- **Repair (`/repair`):** Self-healing logic to fix schema violations and "hallucinated" components.

### 2. Schema as Source of Truth (`/lib/schema.ts`)
- Every visual element is governed by a **Zod Schema**.
- Generators never "hallucinate" raw HTML; they generate JSON that strictly adheres to these schemas.
- **Recursive Blocks:** Supports complex layouts via a recursive `BlockSchema` (Columns, Text, Image, Button).

### 3. Component Library (`/components/sections`)
- Modular React components mapped 1:1 with schema types.
- **SectionRenderer:** The bridge that maps JSON section types to their corresponding React implementations.
- **Layout:** Standardized `Navbar`, `Footer`, and `ThemeProvider`.

### 4. Persistence (`/generated`)
- Full site configurations are saved as `site_full.json`.
- Individual pages are exported for static or dynamic consumption.

## 🛠️ Engineering Standards

### TypeScript & Typing
- **Strict Mode:** All new code must be fully typed. Avoid `any` except in legacy interop.
- **Zod Inference:** Prefer `z.infer<typeof Schema>` for defining data models.

### AI Interaction
- **Content-First Strategy:** Always generate copy/content before assembling the final JSON schema.
- **Surgical Extraction:** Provide only the relevant Zod rules to generators to reduce token usage and improve accuracy.
- **Sanitization:** Programmatically strip `<script>`, `<form>`, and other unsafe tags from LLM outputs.

### Development Workflow
- **Empirical Reproduction:** Before fixing an engine bug, reproduce it with a test case or by mocking the LLM failure.
- **Validation Mandate:** Any change to the engine must be validated by running a PoC generation (e.g., `npm run generate`).
- **Component Consistency:** When adding new sections, ensure they follow the `props` pattern and are registered in `SectionRenderer.tsx`.

### Visual Guidelines (2026 Standards)
- **Modern Aesthetics:** Prioritize clean spacing, interactive feedback, and platform-appropriate design (Next.js/React).
- **Vanilla CSS / Tailwind:** Use Tailwind for utility styling but keep core design patterns in `components/ui`.

## 🚀 Key Commands
- `npm run generate`: Triggers the `runPoC` in `engine/index.ts` to build a full site.
- `npm run dev`: Starts the Next.js development server to preview generated sites.
- `npm run lint`: Ensures code quality and schema alignment.

---
*Note: This file is a foundational mandate for Gemini CLI and takes precedence over general defaults.*
