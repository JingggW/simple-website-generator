import { demoConfig } from "@/config/demo";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = demoConfig.pages[path];

  if (!page) {
    notFound();
  }

  return (
    <ThemeProvider theme={demoConfig.theme}>
      <Navbar config={demoConfig.header} />
      <main>
        {page.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </main>
      <Footer config={demoConfig.footer} />
    </ThemeProvider>
  );
}

// Generate static params for all pages in the config
export async function generateStaticParams() {
  return Object.keys(demoConfig.pages)
    .filter((path) => path !== "/")
    .map((path) => ({
      slug: path.split("/").filter(Boolean),
    }));
}
