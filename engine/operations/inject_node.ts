import fs from "fs";
import path from "path";

/**
 * NODE INJECTOR (Surgical Codemod)
 * 
 * Safely inserts or updates a single section (node) inside an existing page.
 * Returns the final sectionOrder array for synchronization.
 */

export function inject_node_to_config(
  pagePath: string,
  nodeId: string,
  nodeConfig: any,
  insertAt?: { before?: string; after?: string }
): string[] {
  const configPath = path.join(process.cwd(), "config/site.ts");
  const content = fs.readFileSync(configPath, "utf-8");

  // 1. Locate the page block (e.g., "/about": { ... })
  const pageStartRegex = new RegExp(`^    "${pagePath}":\\s*{`, "m");
  const pageStartMatch = content.match(pageStartRegex);

  if (!pageStartMatch) {
    throw new Error(`Could not find page at path: ${pagePath} in site.ts`);
  }

  const startIdx = pageStartMatch.index!;
  const restOfFile = content.slice(startIdx);
  const pageEndMatch = restOfFile.match(/^    },/m);
  
  if (!pageEndMatch) {
    throw new Error(`Could not find end of page block for: ${pagePath}`);
  }
  
  const pageEndIdx = startIdx + pageEndMatch.index! + pageEndMatch[0].length;
  let pageBlock = content.slice(startIdx, pageEndIdx);

  // 2. Prepare the new node string
  const nodeJson = JSON.stringify(nodeConfig, null, 2)
    .split("\n")
    .map(line => `        ${line}`)
    .join("\n").trimStart();
  const nodeEntry = `        "${nodeId}": ${nodeJson},`;

  // 3. Inject/Update the node in the 'sections: { ... }' block
  const sectionsRegex = /sections:\s*{/;
  const sectionsMatch = pageBlock.match(sectionsRegex);
  
  if (!sectionsMatch) {
    throw new Error(`Could not find 'sections' dictionary inside page: ${pagePath}`);
  }

  const existingNodeRegex = new RegExp(`^        "${nodeId}":\\s*{[\\s\\S]*?^        },`, "m");
  
  if (existingNodeRegex.test(pageBlock)) {
    console.log(`♻️  Updating existing node: ${nodeId} on page ${pagePath}`);
    pageBlock = pageBlock.replace(existingNodeRegex, nodeEntry);
  } else {
    console.log(`➕ Injecting new node: ${nodeId} into page ${pagePath}`);
    const insertIdx = sectionsMatch.index! + sectionsMatch[0].length;
    pageBlock = pageBlock.slice(0, insertIdx) + "\n" + nodeEntry + pageBlock.slice(insertIdx);
  }

  // 4. Update 'sectionOrder' array
  const orderRegex = /sectionOrder:\s*\[([\s\S]*?)\]/;
  const orderMatch = pageBlock.match(orderRegex);
  let finalOrder: string[] = [];

  if (orderMatch) {
    const rawOrder = orderMatch[1]
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s.replace(/"/g, ''));
    
    finalOrder = [...rawOrder];
    
    if (!finalOrder.includes(nodeId)) {
      console.log(`📐 Updating sectionOrder for node: ${nodeId}`);
      
      if (insertAt?.before) {
        const idx = finalOrder.indexOf(insertAt.before);
        if (idx !== -1) finalOrder.splice(idx, 0, nodeId);
        else finalOrder.push(nodeId);
      } else if (insertAt?.after) {
        const idx = finalOrder.indexOf(insertAt.after);
        if (idx !== -1) finalOrder.splice(idx + 1, 0, nodeId);
        else finalOrder.push(nodeId);
      } else {
        finalOrder.push(nodeId);
      }

      const newOrderString = `\n      ${finalOrder.map(id => `"${id}"`).join(",\n      ")}\n    `;
      pageBlock = pageBlock.replace(orderMatch[1], newOrderString);
    }
  }

  // 5. Write back the whole file
  const finalContent = content.slice(0, startIdx) + pageBlock + content.slice(pageEndIdx);
  fs.writeFileSync(configPath, finalContent);
  
  console.log(`✅ Surgical injection of node '${nodeId}' complete.`);
  return finalOrder;
}
