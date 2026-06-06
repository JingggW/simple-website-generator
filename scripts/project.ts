import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const CONFIG_DIR = path.join(process.cwd(), "config");
const PROJECTS_DIR = path.resolve(process.cwd(), "../propsite-projects");
const CURRENT_PROJECT_FILE = path.join(CONFIG_DIR, ".current-project");

function getActiveProjectName(): string {
  if (fs.existsSync(CURRENT_PROJECT_FILE)) {
    return fs.readFileSync(CURRENT_PROJECT_FILE, "utf-8").trim();
  }
  return "rymee-studio"; // Default name for the original project
}

function saveActiveConfig(projectName: string) {
  const targetDir = path.join(PROJECTS_DIR, projectName);
  
  // Clear the target directory if it exists to avoid keeping deleted files
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });

  // Recursively copy everything from config/ to projects/<projectName>, except the local tracker file
  if (fs.existsSync(CONFIG_DIR)) {
    fs.cpSync(CONFIG_DIR, targetDir, {
      recursive: true,
      filter: (src) => {
        // Do not copy the local current-project tracker
        const relativePath = path.relative(CONFIG_DIR, src);
        return relativePath !== ".current-project";
      }
    });
  }

  fs.writeFileSync(CURRENT_PROJECT_FILE, projectName);
  fs.writeFileSync(path.join(targetDir, ".project-name"), projectName);
  console.log(`💾 Saved active configuration to projects/${projectName}`);
}

function clearActiveConfig() {
  if (fs.existsSync(CONFIG_DIR)) {
    const items = fs.readdirSync(CONFIG_DIR);
    for (const item of items) {
      if (item === ".current-project") continue;
      const itemPath = path.join(CONFIG_DIR, item);
      fs.rmSync(itemPath, { recursive: true, force: true });
    }
  }
}

function loadConfig(projectName: string) {
  const srcDir = path.join(PROJECTS_DIR, projectName);
  if (!fs.existsSync(srcDir)) {
    console.error(`❌ Project '${projectName}' does not exist under projects/`);
    process.exit(1);
  }

  clearActiveConfig();

  // Recursively copy everything back from projects/<projectName> to config/
  fs.cpSync(srcDir, CONFIG_DIR, { recursive: true });

  // Keep .project-name file from copying if it was in the source, but it doesn't hurt
  const redundantProjectFile = path.join(CONFIG_DIR, ".project-name");
  if (fs.existsSync(redundantProjectFile)) {
    fs.unlinkSync(redundantProjectFile);
  }

  fs.writeFileSync(CURRENT_PROJECT_FILE, projectName);
  console.log(`🔌 Loaded configuration from projects/${projectName}`);
}

function assembleSite() {
  console.log("⚙️  Re-assembling site for local rendering...");
  try {
    execSync("npm run assemble", { stdio: "inherit" });
    console.log("✅ Site assembled successfully!");
  } catch (error) {
    console.error("❌ Failed to assemble site:", error);
  }
}

function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  const projectName = args[1];

  if (!action) {
    console.log(`
ℹ️ Project Manager Usage:
  npx tsx scripts/project.ts save <project-name>   - Save current config to projects/<project-name>
  npx tsx scripts/project.ts switch <project-name> - Switch to projects/<project-name>
  npx tsx scripts/project.ts create <project-name> - Create a new blank project starter
  npx tsx scripts/project.ts list                  - List all projects
    `);
    process.exit(0);
  }

  // Ensure projects base directory exists
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }

  const currentProject = getActiveProjectName();

  if (action === "list") {
    const projects = fs.readdirSync(PROJECTS_DIR).filter(f => 
      fs.statSync(path.join(PROJECTS_DIR, f)).isDirectory()
    );

    console.log("\n📁 Available Projects:");
    if (projects.length === 0) {
      console.log("  (No projects saved yet. Current active configs are treated as 'rymee-studio')");
    } else {
      for (const p of projects) {
        if (p === currentProject) {
          console.log(`  🌟 ${p} (active)`);
        } else {
          console.log(`  📁 ${p}`);
        }
      }
    }
    console.log(`\nActive Project Name: ${currentProject}\n`);
    return;
  }

  if (!projectName) {
    console.error("❌ Please provide a project name.");
    process.exit(1);
  }

  const sanitizedProjectName = projectName.toLowerCase().replace(/[^a-z0-9-_]/g, "-");

  if (action === "save") {
    saveActiveConfig(sanitizedProjectName);
    console.log(`✅ Saved current configuration under project: '${sanitizedProjectName}'`);
  } else if (action === "switch") {
    // 1. Auto-save current project to preserve progress
    console.log(`💾 Auto-saving current active project '${currentProject}'...`);
    saveActiveConfig(currentProject);

    // 2. Load the requested project
    loadConfig(sanitizedProjectName);
    assembleSite();
    console.log(`✅ Successfully switched to project: '${sanitizedProjectName}'`);
  } else if (action === "create") {
    // 1. Auto-save current project to preserve progress
    console.log(`💾 Auto-saving current active project '${currentProject}'...`);
    saveActiveConfig(currentProject);

    // 2. Create directories for new project
    const targetDir = path.join(PROJECTS_DIR, sanitizedProjectName);
    if (fs.existsSync(targetDir)) {
      console.error(`❌ Project '${sanitizedProjectName}' already exists under projects/`);
      process.exit(1);
    }

    console.log(`✨ Creating new project '${sanitizedProjectName}'...`);
    clearActiveConfig();

    // 3. Write default starters to config/
    const defaultTheme = {
      mode: "light",
      preset: "modernSaaS",
      colors: {
        primary: "#4F46E5",
        secondary: "#0F172A",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        muted: "#E2E8F0",
        accent: "#818CF8",
        text: "#0F172A"
      },
      fontStyle: "sans",
      typographyScale: "standard",
      borderRadius: "md",
      containerStyle: "default",
      equalHeightColumns: true,
      dividerStyle: "none"
    };

    const defaultHeader = {
      title: projectName,
      variant: "default",
      announcement: `Welcome to ${projectName}.`,
      links: [
        {
          type: "link",
          label: "Home",
          href: "/"
        }
      ],
      cta: {
        type: "link",
        label: "Contact",
        href: "/contact"
      }
    };

    const defaultFooter = {
      brand: {
        title: projectName,
        description: "Boutique digital design and development."
      },
      columns: [
        {
          title: "Links",
          links: [
            {
              type: "link",
              label: "Home",
              href: "/"
            }
          ]
        }
      ],
      copyright: `© 2026 ${projectName}. All rights reserved.`
    };

    const defaultHome = {
      seo: {
        title: `Home | ${projectName}`,
        description: `Welcome to ${projectName} website.`
      },
      sectionOrder: [
        "hero"
      ],
      sections: {
        hero: {
          type: "hero",
          variant: "simple",
          props: {
            background: "default",
            animation: "slide-up",
            width: "default",
            padding: "md",
            hookLine: "Hello World",
            coreValueProp: `Welcome to ${projectName}`,
            subText: "This website was created using PropSite Engine. Start adding pages or run the generator to customize.",
            primaryCTA: "Learn More",
            ctaLink: "/"
          }
        }
      }
    };

    fs.writeFileSync(path.join(CONFIG_DIR, "theme.json"), JSON.stringify(defaultTheme, null, 2));
    fs.writeFileSync(path.join(CONFIG_DIR, "header.json"), JSON.stringify(defaultHeader, null, 2));
    fs.writeFileSync(path.join(CONFIG_DIR, "footer.json"), JSON.stringify(defaultFooter, null, 2));

    const pagesDir = path.join(CONFIG_DIR, "pages");
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }
    fs.writeFileSync(path.join(pagesDir, "home.json"), JSON.stringify(defaultHome, null, 2));
    fs.writeFileSync(CURRENT_PROJECT_FILE, sanitizedProjectName);

    // 4. Save this fresh state to projects/
    saveActiveConfig(sanitizedProjectName);
    assembleSite();
    console.log(`✅ Created and switched to new project: '${sanitizedProjectName}'`);
  } else {
    console.error(`❌ Unknown action: ${action}`);
    process.exit(1);
  }
}

main();
