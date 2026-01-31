import { siteConfig } from "@/config/site";
import { SectionRenderer } from "@/components/SectionRenderer";

export default function Home() {
  return (
    <main>
      {siteConfig.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
