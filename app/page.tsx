import { demoConfig } from "@/config/demo";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export default function Home() {
  return (
    <main>
      {demoConfig.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}
    </main>
  );
}
