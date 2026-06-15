import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/integrations/whatsapp/WhatsAppWidget";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

// Helper to look up local project configuration dynamically
function getProjectSiteConfig(projectName: string): any | null {
  // Sanitize project name to prevent path traversal
  const sanitized = projectName.toLowerCase().replace(/[^a-z0-9-_]/g, "");
  if (!sanitized) return null;

  let siteJsonPath = "";

  // Only allow looking outside the workspace in local development mode
  if (process.env.NODE_ENV === "development") {
    const localDir = path.resolve(process.cwd(), "../propsite-projects", sanitized);
    if (fs.existsSync(path.join(localDir, "site.json"))) {
      siteJsonPath = path.join(localDir, "site.json");
    }
  }

  // Fallback to local generated folder (safe in both dev and prod)
  if (!siteJsonPath) {
    const generatedDir = path.resolve(process.cwd(), "generated", sanitized);
    if (fs.existsSync(path.join(generatedDir, "site_full.json"))) {
      siteJsonPath = path.join(generatedDir, "site_full.json");
    }
  }

  if (siteJsonPath) {
    try {
      const rawConfig = JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));
      // Rewrite internal links so they remain within the subpath context (e.g. /apex-strength)
      return rewriteProjectLinks(rawConfig, `/${sanitized}`);
    } catch (e) {
      console.error(`Error reading site config for project ${sanitized}:`, e);
    }
  }
  return null;
}

// Helper to recursively rewrite internal links (href/ctaLink) to include the project subpath prefix
function rewriteProjectLinks(obj: any, prefix: string): any {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => rewriteProjectLinks(item, prefix));
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      if ((key === "href" || key === "ctaLink") && value.startsWith("/")) {
        const cleanPath = value === "/" ? "" : value;
        result[key] = `${prefix}${cleanPath}`;
      } else {
        result[key] = value;
      }
    } else {
      result[key] = rewriteProjectLinks(value, prefix);
    }
  }
  return result;
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
        <WhatsAppWidget config={projectConfig} />
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
      <WhatsAppWidget config={siteConfig} />
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

  // 2. Add pages of other projects if they exist locally (Only in development)
  if (process.env.NODE_ENV === "development") {
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
        } catch {}
      }
    }
  }

  // 3. Add pages of generated directory if exists (both Dev and Prod)
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
      } catch {}
    }
  }

  return params;
}
