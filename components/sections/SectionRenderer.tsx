"use client";

import React from "react";
import { AnySection } from "@/lib/schema";
import { motion, HTMLMotionProps } from "framer-motion";

import {
  HeroSimple,
  HeroSplit,
  HeroVisual,
  HeroEditorial,
} from "@/components/sections/hero";
import { ServicesGrid, ServicesList } from "@/components/sections/services";
import { ContentSimple } from "@/components/sections/content";
import { ContactSimple } from "@/components/sections/contact";
import { TestimonialsGrid } from "@/components/sections/testimonials";
import { BlockSection } from "@/components/sections/blocks";
import { PricingList, PricingCards } from "@/components/sections/pricing";
import { RequestForm, RequestFormSplit, AppointmentForm } from "@/components/sections/form";
import { MapEmbedded } from "@/components/sections/map";
import { SectionDivider } from "@/components/ui/SectionDivider";

const sectionComponents: Record<string, Record<string, React.FC<any>>> = {
  hero: {
    simple: HeroSimple,
    split: HeroSplit,
    visual: HeroVisual,
    editorial: HeroEditorial,
  },
  services: {
    grid: ServicesGrid,
    list: ServicesList,
  },
  pricing: {
    simple: PricingList,
    detailed: PricingList,
    cards: PricingCards,
  },
  form: {
    contact: RequestForm,
    request: RequestForm,
    split: RequestFormSplit,
    appointment: AppointmentForm,
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
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
};

// Map current background to text color to enforce inheritance
const textInheritClasses: Record<string, string> = {
  default: "text-foreground",
  muted: "text-foreground",
  surface: "text-foreground",
  primary: "text-on-primary",
  secondary: "text-on-secondary",
};

const animations: Record<string, HTMLMotionProps<"div">> = {
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
  bleed: "w-full px-0",
};

export const SectionRenderer = ({
  section,
  sectionId,
}: {
  section: AnySection;
  sectionId: string;
}) => {
  // IGNORE SEO sections (they are for metadata only)
  if ((section.type as string) === "seo") return null;

  const group = sectionComponents[section.type];

  if (!group) return null;

  const variantName = section.variant;
  const Component =
    group[variantName] || group["simple"] || Object.values(group)[0];

  if (!Component) return null;

  const bgClass = backgroundClasses[section.props.background || "default"];
  const animationProps = animations[section.props.animation || "slide-up"];
  const containerClass = widthClasses[section.props.width || "default"];
  // const isBleed = section.props.width === "bleed";

  const paddingClasses: Record<string, string> = {
    none: "py-0",
    sm: "py-3 md:py-4",
    md: "py-6 md:py-8",
    lg: "py-10 md:py-16",
  };
  let paddingClass = paddingClasses[section.props.padding || "md"];

  // SPECIAL FIX: If it's a hero section, we want zero top padding
  // to avoid gaps with the navbar, but keep bottom padding.
  if (section.type === "hero") {
    paddingClass = paddingClass
      .replace("py-", "pb-")
      .replace("py-0", "pt-0 pb-0");
  }

  return (
    <motion.div
      id={sectionId}
      className={`${bgClass} ${paddingClass} relative`}
      {...animationProps}
    >
      {section.props.topDivider && (
        <SectionDivider {...section.props.topDivider} position="top" />
      )}

      <div
        className={`${containerClass} ${textInheritClasses[section.props.background || "default"]}`}
      >
        <Component {...section.props} />
      </div>

      {section.props.bottomDivider && (
        <SectionDivider {...section.props.bottomDivider} position="bottom" />
      )}
    </motion.div>
  );
};
