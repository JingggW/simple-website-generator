import fs from "fs";
import path from "path";

/**
 * PAGE INJECTOR (Codemod)
 * 
 * Safely inserts or updates a page configuration inside config/site.ts.
 */

export function inject_page_to_config(targetPath: string, pageConfig: any) {
  const configPath = path.join(process.cwd(), "config/site.ts");
  const configContent = fs.readFileSync(configPath, "utf-8");

  // 1. Prepare the new entry
  const pageJson = JSON.stringify(pageConfig, null, 2);
  const formattedEntry = `    "${targetPath}": ${pageJson},`;

  // 2. Locate the 'pages: {' block
  const pagesKeyMatch = /pages:\s*{/;
  const match = configContent.match(pagesKeyMatch);
  
  if (!match) throw new Error("Could not find 'pages' object in site.ts");

  const startIdx = match.index! + match[0].length;
  
  // 3. Surgical Replace or Append
  const existingPageRegex = new RegExp(`^    "${targetPath}":\\s*{[\\s\\S]*?^    },`, "m");
  
  let newContent: string;
  if (existingPageRegex.test(configContent)) {
    console.log(`♻️  Updating existing page: ${targetPath}`);
    newContent = configContent.replace(existingPageRegex, formattedEntry);
  } else {
    console.log(`➕ Injecting new page: ${targetPath}`);
    // Insert at the very beginning of the pages object for reliability
    newContent = 
      configContent.slice(0, startIdx) + 
      "\n" + formattedEntry + 
      configContent.slice(startIdx);
  }

  fs.writeFileSync(configPath, newContent);
  console.log(`✅ config/site.ts updated successfully.`);
}
