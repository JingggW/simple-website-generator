import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";

export default function Home() {
  const page = siteConfig.pages["/"];

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
