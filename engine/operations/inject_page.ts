import fs from "fs";
import path from "path";

/**
 * PAGE INJECTOR (Codemod)
 * 
 * Safely inserts or updates a page configuration inside config/site.ts.
 */

export function inject_page_to_config(targetPath: string, pageConfig: any) {
  const configPath = path.join(process.cwd(), "config/site.ts");
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Master config not found at: ${configPath}`);
  }

  const configContent = fs.readFileSync(configPath, "utf-8");

  // 1. Prepare the new entry
  const pageJson = JSON.stringify(pageConfig, null, 2);
  const formattedEntry = `    "${targetPath}": ${pageJson},`;

  // 2. Check if the page already exists (Surgical Replace)
  // Match the key at the start of a line with 4 spaces of indentation
  const existingPageRegex = new RegExp(`^    "${targetPath}":\\s*{[\\s\\S]*?^    },`, "m");
  
  let newContent: string;
  if (existingPageRegex.test(configContent)) {
    console.log(`♻️  Updating existing page entry: ${targetPath}`);
    newContent = configContent.replace(existingPageRegex, formattedEntry);
  } else {
    console.log(`➕ Injecting new page entry: ${targetPath}`);
    // Find the 'pages: {' block to append
    const pagesKeyMatch = /pages:\s*{/;
    const match = configContent.match(pagesKeyMatch);
    
    if (!match) throw new Error("Could not find 'pages' object in site.ts");

    const insertIndex = match.index! + match[0].length;
    newContent = 
      configContent.slice(0, insertIndex) + 
      "\n" + formattedEntry + 
      configContent.slice(insertIndex);
  }

  fs.writeFileSync(configPath, newContent);
  console.log(`✅ config/site.ts updated successfully.`);
}
