# PropSite Engine Todo List

## 🔥 High Priority
- [ ] **Link Integrity Guard**: Auto-repair missing pages (Integrity check done, repair loop done).
- [ ] **Surgical Context Fix**: Update generators to include "PRICING", "FORM", and "MAP" in the `getSchemaSection` extraction.
- [ ] **Prompt Flexibility**: Revisit `node-strategist` to allow for more creative layout choices while maintaining schema safety.
- [ ] **Unified Block Design**: Rethink the "Component vs. Block" architecture. Should Pricing/Form just be sophisticated atoms inside the `blocks` system instead of top-level sections?

## 🛠️ Core Engine Features
- [x] **In-Memory Orchestrator**: Atomic state management (Completed).
- [x] **Self-Healing Guard**: Programmatic + LLM repair loop (Completed).
- [x] **Reliable Storage**: Switched to `site.json` as the primary state source.

## 🤖 Advanced AI Workflow
- [ ] **Natural Language CLI**: Translating intent to engine calls.
- [ ] **Layout Versatility**: Support Split/Grid layouts in `BlockSection.tsx`.

## 🎨 UI/UX improvements
- [x] **New Components**: PricingList, RequestForm, MapEmbedded (Completed).
- [x] **Premium Blocks**: Redesigned flexible block system (Completed).
