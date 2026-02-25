import React from "react";
import { AnySection } from "@/lib/schema";

import { HeroSimple, HeroSplit } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services";
import { ContentSimple } from "@/components/sections/content";
import { ContactSimple } from "@/components/sections/contact";
import { TestimonialsGrid } from "@/components/sections/testimonials";
import { BlockSection } from "@/components/sections/blocks";

const sectionComponents: Record<string, Record<string, React.FC<any>>> = {
  hero: {
    simple: HeroSimple,
    split: HeroSplit,
  },
  services: {
    grid: ServicesGrid,
    list: ServicesGrid, // Reuse grid for list temporarily, should implement ServicesList separately
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

export const SectionRenderer = ({ section }: { section: AnySection }) => {
  const group = sectionComponents[section.type];

  if (!group) {
    return null;
  }

  const variantName = section.variant;
  const Component =
    group[variantName] || group["simple"] || Object.values(group)[0];

  if (!Component) {
    return null;
  }

  return <Component {...section.props} />;
};
