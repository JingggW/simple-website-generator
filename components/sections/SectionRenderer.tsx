import React from "react";
import { AnySection } from "@/lib/schema";

import { HeroSimple, HeroSplit } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services";
import { ContentSimple } from "@/components/sections/content";
import { ContactSimple } from "@/components/sections/contact";
import { TestimonialsGrid } from "@/components/sections/testimonials";
import { BlockSection } from "@/components/sections/blocks";
import { PricingList } from "@/components/sections/pricing";
import { RequestForm } from "@/components/sections/form";
import { MapEmbedded } from "@/components/sections/map";

const sectionComponents: Record<string, Record<string, React.FC<any>>> = {
  hero: {
    simple: HeroSimple,
    split: HeroSplit,
  },
  services: {
    grid: ServicesGrid,
    list: ServicesGrid,
  },
  pricing: {
    simple: PricingList,
    detailed: PricingList,
  },
  form: {
    contact: RequestForm,
    request: RequestForm,
  },
  map: {
    embedded: MapEmbedded,
  },
  content: {
    simple: ContentSimple,
  },
  contact: {
    simple: ContactSimple,
  },
  testimonials: {
    grid: TestimonialsGrid,
  },
  blocks: {
    prose: BlockSection,
    wide: BlockSection,
    full: BlockSection,
  },
};

export const SectionRenderer = ({ section, sectionId }: { section: AnySection, sectionId: string }) => {
  const group = sectionComponents[section.type];

  if (!group) return null;

  const variantName = section.variant;
  const Component = group[variantName] || group["simple"] || Object.values(group)[0];

  if (!Component) return null;

  return (
    <div id={sectionId}>
      <Component {...section.props} />
    </div>
  );
};
