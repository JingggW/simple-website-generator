"use client";

import React from "react";
import { AnySection } from "@/lib/schema";
import { motion } from "framer-motion";

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

const backgroundClasses: Record<string, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  surface: "bg-surface text-foreground",
  primary: "bg-primary text-background",
  secondary: "bg-secondary text-background",
};

const animations = {
  none: {},
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  "zoom-in": {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  },
};

const widthClasses: Record<string, string> = {
  prose: "max-w-3xl mx-auto px-6",
  default: "max-w-5xl mx-auto px-6",
  wide: "max-w-7xl mx-auto px-6",
  full: "w-full px-6",
};

export const SectionRenderer = ({
  section,
  sectionId,
}: {
  section: AnySection;
  sectionId: string;
}) => {
  const group = sectionComponents[section.type];

  if (!group) return null;

  const variantName = section.variant;
  const Component =
    group[variantName] || group["simple"] || Object.values(group)[0];

  if (!Component) return null;

  const bgClass = backgroundClasses[section.props.background || "default"];
  const animationProps = animations[section.props.animation || "slide-up"];
  const containerClass = widthClasses[section.props.width || "default"];

  return (
    <motion.div id={sectionId} className={bgClass} {...animationProps}>
      <div className={containerClass}>
        <Component {...section.props} />
      </div>
    </motion.div>
  );
};
