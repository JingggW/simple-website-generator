import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

// Helper to look up local project configuration dynamically
function getProjectSiteConfig(projectName: string): any | null {
  const localDir = path.resolve(process.cwd(), "../propsite-projects", projectName);
  const generatedDir = path.resolve(process.cwd(), "generated", projectName);

  let siteJsonPath = "";
  if (fs.existsSync(path.join(localDir, "site.json"))) {
    siteJsonPath = path.join(localDir, "site.json");
  } else if (fs.existsSync(path.join(generatedDir, "site_full.json"))) {
    siteJsonPath = path.join(generatedDir, "site_full.json");
  }

  if (siteJsonPath) {
    try {
      return JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));
    } catch (e) {
      console.error(`Error reading site config for project ${projectName}:`, e);
    }
  }
  return null;
}

// Next.js 15+ Catch-all Pattern
export default async function DynamicPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slugArray = params.slug;

  if (slugArray.length === 0) {
    notFound();
  }

  const firstSegment = slugArray[0];
  const projectConfig = getProjectSiteConfig(firstSegment);

  if (projectConfig) {
    // This is a tenant site path preview!
    const remainingSegments = slugArray.slice(1);
    const pagePath = remainingSegments.length === 0 ? "/" : `/${remainingSegments.join("/")}`;
    const page = projectConfig.pages[pagePath];

    if (!page) {
      notFound();
    }

    return (
      <ThemeProvider theme={projectConfig.theme} restoreOnUnmount={true}>
        <Navbar config={projectConfig.header} />
        <main>
          {page.sectionOrder.map((sectionId: string) => {
            const section = page.sections[sectionId];
            if (!section) return null;
            return <SectionRenderer key={sectionId} sectionId={sectionId} section={section} />;
          })}
        </main>
        <Footer config={projectConfig.footer} />
      </ThemeProvider>
    );
  }

  // Fallback to the currently active project config (e.g. rymee-studio)
  const path = `/${slugArray.join("/")}`;
  const page = siteConfig.pages[path];

  if (!page) {
    notFound();
  }

  return (
    <ThemeProvider theme={siteConfig.theme}>
      <Navbar config={siteConfig.header} />
      <main>
        {page.sectionOrder.map((sectionId) => {
          const section = page.sections[sectionId];
          if (!section) return null;
          // PASS sectionId HERE
          return <SectionRenderer key={sectionId} sectionId={sectionId} section={section} />;
        })}
      </main>
      <Footer config={siteConfig.footer} />
    </ThemeProvider>
  );
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // 1. Add pages of the main site config
  Object.keys(siteConfig.pages)
    .filter((path) => path !== "/")
    .forEach((p) => {
      params.push({
        slug: p.split("/").filter(Boolean),
      });
    });

  // 2. Add pages of other projects if they exist locally
  const localProjectsDir = path.resolve(process.cwd(), "../propsite-projects");
  if (fs.existsSync(localProjectsDir)) {
    const projects = fs.readdirSync(localProjectsDir).filter((file) => {
      return fs.statSync(path.join(localProjectsDir, file)).isDirectory();
    });

    for (const proj of projects) {
      const siteJsonPath = path.join(localProjectsDir, proj, "site.json");
      if (!fs.existsSync(siteJsonPath)) continue;
      try {
        const projConfig = JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));
        if (projConfig?.pages) {
          for (const pagePath of Object.keys(projConfig.pages)) {
            const relativeSlug = pagePath.split("/").filter(Boolean);
            params.push({
              slug: [proj, ...relativeSlug],
            });
          }
        }
      } catch (e) {}
    }
  }

  // 3. Add pages of generated directory if exists
  const generatedDir = path.resolve(process.cwd(), "generated");
  if (fs.existsSync(generatedDir)) {
    const generatedProjects = fs.readdirSync(generatedDir).filter((file) => {
      return fs.statSync(path.join(generatedDir, file)).isDirectory();
    });

    for (const proj of generatedProjects) {
      const siteJsonPath = path.join(generatedDir, proj, "site_full.json");
      if (!fs.existsSync(siteJsonPath)) continue;
      try {
        const projConfig = JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));
        if (projConfig?.pages) {
          for (const pagePath of Object.keys(projConfig.pages)) {
            const relativeSlug = pagePath.split("/").filter(Boolean);
            const slug = [proj, ...relativeSlug];
            const exists = params.some((p) => p.slug.join("/") === slug.join("/"));
            if (!exists) {
              params.push({ slug });
            }
          }
        }
      } catch (e) {}
    }
  }

  return params;
}
