import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";

export default function Home() {
  const page = siteConfig.pages["/"];

  if (!page) {
    notFound();
  }

  return (
    <>
      <Navbar config={siteConfig.header} />
      <main>
        {page.sectionOrder.map((sectionId) => {
          const section = page.sections[sectionId];
          if (!section) return null;
          return (
            <SectionRenderer key={sectionId} sectionId={sectionId} section={section} />
          );
        })}
      </main>
      <Footer config={siteConfig.footer} />
    </>
  );
}
