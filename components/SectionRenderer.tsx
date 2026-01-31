import { Section } from "@/types";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Content } from "@/components/sections/Content";
import { Contact } from "@/components/sections/Contact";

const sectionComponents: Record<string, React.FC<any>> = {
  content: Content,
  services: Services,
  hero: Hero,
  contact: Contact,
};

export const SectionRenderer = ({ section }: { section: Section }) => {
  const Component = sectionComponents[section.type];

  if (!Component) {
    return null;
  }

  return (
    <div id={section.id}>
      <Component content={section.content} />
    </div>
  );
};
