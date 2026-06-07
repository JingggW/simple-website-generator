import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/**
 * CHANGE BACKGROUND STYLE SCRIPT
 * 
 * Usage:
 * npx tsx scripts/change-bg-style.ts --style=[zebra|zebra-subtle|zebra-brand|canvas-cards|bordered|flat] --header-bg=[default|muted|surface|primary|secondary] --footer-bg=[default|muted|surface|primary|secondary]
 */

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      if (key && value) {
        acc[key.replace("--", "")] = value.replace(/['"]/g, "");
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const style = args.style; // zebra (subtle) | zebra-brand | canvas-cards | bordered | flat
  const headerBg = args["header-bg"];
  const footerBg = args["footer-bg"];

  if (!style && !headerBg && !footerBg) {
    console.error("❌ No options specified.");
    console.log("Usage: npx tsx scripts/change-bg-style.ts --style=[zebra|zebra-subtle|zebra-brand|canvas-cards|bordered|flat] --header-bg=[default|muted|surface|primary|secondary] --footer-bg=[default|muted|surface|primary|secondary]");
    process.exit(1);
  }

  const configDir = path.join(process.cwd(), "config");
  const pagesDir = path.join(configDir, "pages");

  // 1. Update Header Config if header-bg is passed
  if (headerBg) {
    const headerPath = path.join(configDir, "header.json");
    if (fs.existsSync(headerPath)) {
      const headerData = JSON.parse(fs.readFileSync(headerPath, "utf-8"));
      headerData.background = headerBg;
      fs.writeFileSync(headerPath, JSON.stringify(headerData, null, 2));
      console.log(`✨ Header background updated to: ${headerBg}`);
    }
  }

  // 2. Update Footer Config if footer-bg is passed
  if (footerBg) {
    const footerPath = path.join(configDir, "footer.json");
    if (fs.existsSync(footerPath)) {
      const footerData = JSON.parse(fs.readFileSync(footerPath, "utf-8"));
      footerData.background = footerBg;
      fs.writeFileSync(footerPath, JSON.stringify(footerData, null, 2));
      console.log(`✨ Footer background updated to: ${footerBg}`);
    }
  }

  // 3. Update Sections in Pages if style is passed
  if (style) {
    if (!fs.existsSync(pagesDir)) {
      console.error("❌ config/pages directory not found.");
      process.exit(1);
    }

    const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"));

    for (const file of pageFiles) {
      const filePath = path.join(pagesDir, file);
      const pageData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (!pageData.sections || !pageData.sectionOrder) continue;

      console.log(` Processing page: ${file} (style: ${style})`);

      pageData.sectionOrder.forEach((sectionId: string, index: number) => {
        const section = pageData.sections[sectionId];
        if (!section || !section.props) return;

        // Reset divider lines when changing style to avoid layout confusion
        if (style === "flat" || style === "zebra" || style === "zebra-subtle" || style === "zebra-brand" || style === "canvas-cards") {
          if (section.props.topDivider && section.props.topDivider.type === "line") {
            delete section.props.topDivider;
          }
          if (section.props.bottomDivider && section.props.bottomDivider.type === "line") {
            delete section.props.bottomDivider;
          }
        }

        if (style === "zebra" || style === "zebra-subtle") {
          // Alternate neutral backgrounds: default, muted, default, surface...
          if (index === 0 || section.type === "hero") {
            section.props.background = "default";
          } else {
            const alternateBgs = ["muted", "surface"];
            section.props.background = alternateBgs[(index - 1) % alternateBgs.length];
          }
        } else if (style === "zebra-brand") {
          // Alternate brand/contrast backgrounds: default, secondary, default, primary, default, muted...
          if (index === 0 || section.type === "hero") {
            section.props.background = "default";
          } else {
            const alternateBgs = ["secondary", "muted", "primary"];
            section.props.background = alternateBgs[(index - 1) % alternateBgs.length];
          }
        } else if (style === "canvas-cards") {
          // Set all section backgrounds to default
          section.props.background = "default";
        } else if (style === "bordered") {
          // Set all section backgrounds to default
          section.props.background = "default";
          
          // Add separator line on bottom of all sections except the last one
          const isLastSection = index === pageData.sectionOrder.length - 1;
          if (!isLastSection) {
            section.props.bottomDivider = {
              type: "line",
              color: "default", // Maps to text-secondary/10 (subtle grey divider line)
              height: "sm"
            };
          }
        } else if (style === "flat") {
          section.props.background = "default";
        }
      });

      fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));
    }

    console.log(`✅ All page section backgrounds updated to style: ${style}`);
  }

  // 4. Assemble the site
  console.log("🏗️ Re-assembling website configuration...");
  try {
    execSync("npm run assemble", { stdio: "inherit" });
    console.log("🎉 Site re-assembled successfully with new background designs.");
  } catch (err) {
    console.error("❌ Failed to assemble site:", err);
  }
}

main().catch(console.error);
