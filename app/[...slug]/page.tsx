import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";

// Next.js 15+ Catch-all Pattern
export default async function DynamicPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slugArray = params.slug;
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
  return Object.keys(siteConfig.pages)
    .filter((path) => path !== "/")
    .map((path) => ({
      slug: path.split("/").filter(Boolean),
    }));
}
