import fs from "fs";
import path from "path";
import { refine_page } from "../engine/repair/sanitizer";
import { WebsiteConfig } from "../lib/schema";

const siteTsPath = path.join(process.cwd(), "config/site.ts");
const siteJsonPath = path.join(process.cwd(), "config/site.json");

function extractSiteConfig(fileContent: string): WebsiteConfig | null {
  const jsonMatch = fileContent.match(
    /export const siteConfig: WebsiteConfig = (\{[\s\S]*\});/,
  );
  if (!jsonMatch || !jsonMatch[1]) {
    return null;
  }
  try {
    // Attempt to parse directly
    return JSON.parse(jsonMatch[1]);
  } catch (e) {
    console.error(
      "❌ Failed to parse siteConfig from site.ts directly. Attempting 'eval'.",
      e,
    );
    // Fallback to eval if direct parse fails (e.g., trailing commas, comments)
    try {
      // Caution: eval is dangerous with untrusted input. Here, it's our own generated code.
      return eval(`(${jsonMatch[1]})`);
    } catch (evalError) {
      console.error(
        "❌ Failed to parse siteConfig from site.ts using 'eval'.",
        evalError,
      );
      return null;
    }
  }
}

function runRefineSiteConfig() {
  console.log("🛠️  Running site config refinery on config/site.ts...");

  if (!fs.existsSync(siteTsPath)) {
    console.error(`❌ ${siteTsPath} not found.`);
    return;
  }

  const fileContent = fs.readFileSync(siteTsPath, "utf-8");
  const siteConfig = extractSiteConfig(fileContent);

  if (!siteConfig) {
    console.error(
      "❌ Could not extract siteConfig from config/site.ts. Ensure it's correctly formatted.",
    );
    return;
  }

  const initialConfig = JSON.parse(JSON.stringify(siteConfig)); // Deep clone for comparison

  // Iterate over pages and refine each one, passing the pagePath
  const refinedPages: { [path: string]: any } = {};
  for (const pagePath in siteConfig.pages) {
    const pageData = siteConfig.pages[pagePath];
    // refine_page expects a page object, not the whole config
    // It also needs the theme preset and pagePath for context
    const refinedPageData = refine_page(
      pageData,
      siteConfig.theme.preset,
      pagePath,
    );
    refinedPages[pagePath] = refinedPageData;
  }
  siteConfig.pages = refinedPages;

  // Check if any changes were made before writing
  if (JSON.stringify(initialConfig) === JSON.stringify(siteConfig)) {
    console.log(
      "✅ No changes detected by refinery. config/site.ts is already clean.",
    );
    return;
  }

  // Update file content with refined config
  const newJsonContent = JSON.stringify(siteConfig, null, 2);
  const newFileContent = `import { WebsiteConfig } from "@/lib/schema";

export const siteConfig: WebsiteConfig = ${newJsonContent};
`;

  fs.writeFileSync(siteTsPath, newFileContent);
  console.log("✅ config/site.ts successfully refined and updated.");

  // Also update site.json for consistency
  fs.writeFileSync(siteJsonPath, newJsonContent);
  console.log("✅ config/site.json successfully updated.");
}

runRefineSiteConfig();
