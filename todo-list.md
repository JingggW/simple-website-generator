# PropSite Engine Todo List

## High Priority
- [ ] **Infrastructure**: Refactor `getSystemContext` out of `generate_single_page.ts` and into a dedicated `engine/lib/utils.ts` or `engine/utils/context.ts` folder.
- [ ] **Storage Strategy**: Finalize the `generated/` folder structure to store all JSON and HTML outputs, ensuring they are easily accessible for future "Mover" or "Deployer" prompts.
- [ ] **Image Pipeline**: Integrate the `image-inserter.md` prompt into the `generate_single_page.ts` orchestration script.

## Core Features
- [ ] **Global Planner**: Implement the `master-planner.md` orchestration to handle multi-page sitemaps and global themes.
- [ ] **Site Factory**: Build the script to "clone" the Next.js viewer into a new directory and inject the generated `config.json`.
- [ ] **Validation Layer**: Add a post-generation step to validate the JSON against the Zod schema before saving.

## UX/UI (Future)
- [ ] **Dashboard**: Build a simple React-based UI to trigger the generation engine and preview the results.
- [ ] **Style Variations**: Create specialized CSS themes for different business types (e.g., "Industrial", "Luxury", "Friendly").
