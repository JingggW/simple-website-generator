# CONTEXT: PropSite Engine Workflow

## Generation Entry Point
The main orchestrator for the entire generation process is **`engine/index.ts`**.

### Usage
This file contains the `PropSiteEngine` class which manages the end-to-end lifecycle:
1. **Blueprint Phase**: Planning the sitemap and theme.
2. **Production Phase**: Generating individual pages and nodes.
3. **Auto-Repair Phase**: Fixing broken links and ensuring schema integrity.

To trigger a new site generation for testing or production, you can execute this file directly (e.g., via `tsx engine/index.ts`). The `runPoC()` function at the bottom is the current demonstration entry point.
