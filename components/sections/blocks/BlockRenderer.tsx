"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Block } from "@/lib/schema";
import { TestimonialCard } from "../testimonials/TestimonialCard";
import { cn } from "@/lib/utils";

const parseMarkdownInline = (text: string): React.ReactNode[] => {
  if (!text) return [];
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-foreground/95">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="bg-secondary/10 px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

// This is a recursive component for rendering any block
export const BlockRenderer = ({ block }: { block: Block }) => {
  if (!block) return null;

  const spacingClasses = {
    none: "my-0",
    sm: "my-3",
    md: "my-6",
    lg: "my-10",
  };
  const spacing = (block as any).spacing || "md";
  const marginClass = spacingClasses[spacing as keyof typeof spacingClasses];

  switch (block.type) {
    case "columns":
      const layoutClasses: Record<string, string> = {
        split: "grid-cols-1 md:grid-cols-2",
        "3-col": "grid-cols-1 md:grid-cols-3",
        "4-col": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        "split-left": "grid-cols-1 md:grid-cols-[2fr_1fr]",
        "split-right": "grid-cols-1 md:grid-cols-[1fr_2fr]",
        "split-divided": "grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative",
        "overlap-left":
          "grid-cols-1 md:grid-cols-[1.25fr_0.75fr] items-center gap-0 relative",
        "overlap-right":
          "grid-cols-1 md:grid-cols-[0.75fr_1.25fr] items-center gap-0 relative",
        "split-accent": "grid-cols-1 md:grid-cols-2 gap-12 md:gap-24",
        "collage-left":
          "grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center",
        "collage-right":
          "grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center",
        "split-culture": "grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8",
      };
      const isSplit =
        [
          "split",
          "split-left",
          "split-right",
          "split-divided",
          "overlap-left",
          "overlap-right",
          "split-accent",
          "collage-left",
          "collage-right",
          "split-culture",
        ].includes(block.layout || "split") && block.items?.length === 2;
      const isImageFirst =
        isSplit &&
        block.items[0]?.blocks?.some((b: any) => b.type === "image") &&
        !block.items[1]?.blocks?.some((b: any) => b.type === "image");

      const isOverlap =
        block.layout === "overlap-left" || block.layout === "overlap-right";
      const gapClass = isOverlap ? "gap-0" : "gap-8 lg:gap-12";

      return (
        <div
          className={`grid items-stretch ${gapClass} ${layoutClasses[block.layout || "split"]} ${marginClass}`}
        >
          {block.items.map((col, idx) => {
            const orderClass = isImageFirst
              ? idx === 0
                ? "order-2 md:order-1"
                : "order-1 md:order-2"
              : "";

            let colClass = `flex flex-col h-full ${orderClass}`;

            // Culture split specific column widths
            if (block.layout === "split-culture") {
              if (idx === 0) {
                colClass = `lg:col-span-5 relative flex flex-row gap-6 bg-surface p-6 rounded-2xl border border-secondary/10 overflow-hidden items-center ${orderClass}`;
              } else {
                colClass = `lg:col-span-7 lg:pl-6 space-y-6 flex flex-col justify-center ${orderClass}`;
              }
            }

            // Divider logic for split-divided
            if (block.layout === "split-divided" && idx === 1) {
              colClass = `${colClass} md:border-l border-secondary/15 md:pl-12 lg:pl-16`;
            }

            // Accent border logic for split-accent
            if (block.layout === "split-accent") {
              const hasImage = col.blocks.some((b: any) => b.type === "image");
              if (!hasImage) {
                colClass = `${colClass} md:border-l-4 border-primary md:pl-8 lg:pl-12`;
              }
            }

            // Collage renderer override
            const isCollageLeftCol =
              block.layout === "collage-left" && idx === 0;
            const isCollageRightCol =
              block.layout === "collage-right" && idx === 1;

            if (isCollageLeftCol || isCollageRightCol) {
              return (
                <div
                  key={idx}
                  className={cn(
                    "grid grid-cols-2 gap-4 lg:gap-6 items-start w-full",
                    orderClass,
                  )}
                >
                  {col.blocks.map((b, bIdx) => {
                    const shiftClass = bIdx === 1 ? "mt-8 lg:mt-16" : "";
                    return (
                      <div key={bIdx} className={shiftClass}>
                        <BlockRenderer block={b} />
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Detect if this column contains a container that should overlap the sibling column
            // (Implements the nested "The Layered Overlap" design pattern)
            let overlapContainerClass = "";
            if (isSplit && !isOverlap && block.items.length === 2) {
              const currentHasCard = col.blocks.some(
                (b: any) =>
                  b.type === "container" &&
                  (b.variant === "card" || b.variant === "glass"),
              );
              const siblingIdx = idx === 0 ? 1 : 0;
              const siblingHasImage = block.items[siblingIdx]?.blocks?.some(
                (b: any) => b.type === "image",
              );

              if (currentHasCard && siblingHasImage) {
                overlapContainerClass =
                  idx === 0
                    ? "md:-mr-16 md:z-10 relative"
                    : "md:-ml-16 md:z-10 relative";
              }
            }

            colClass = `${colClass} ${overlapContainerClass}`;

            // Overlap logic
            const isOverlapTextCol =
              isOverlap &&
              ((block.layout === "overlap-left" && idx === 1) ||
                (block.layout === "overlap-right" && idx === 0));

            if (isOverlapTextCol) {
              const overlapMargin =
                block.layout === "overlap-left"
                  ? "md:-ml-20 md:mr-0"
                  : "md:-mr-20 md:ml-0";
              return (
                <div
                  key={idx}
                  className={cn("z-10 w-full relative", orderClass)}
                >
                  <div
                    className={cn(
                      "bg-surface rounded-3xl p-8 md:p-12 shadow-2xl border border-secondary/10 flex flex-col justify-center",
                      overlapMargin,
                    )}
                  >
                    {col.blocks.map((b, bIdx) => (
                      <BlockRenderer key={bIdx} block={b} />
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className={colClass}>
                {col.label && block.layout === "split-culture" && idx === 0 && (
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180 text-secondary/40 border-l border-secondary/15 pl-3 select-none h-fit self-center">
                    — {col.label}
                  </div>
                )}
                <div
                  className={cn(
                    "grow flex flex-col justify-center w-full",
                    block.layout === "split-culture" &&
                      idx === 0 &&
                      "h-full justify-center items-center",
                  )}
                >
                  {col.blocks.map((b, bIdx) => (
                    <BlockRenderer key={bIdx} block={b} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "feature":
      const isHorizontal = block.variant === "horizontal";
      const isCompact = block.variant === "compact";
      const alignClassesFeature = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end",
      }[block.align || "left"];

      return (
        <div
          className={`flex ${isHorizontal ? "flex-row gap-6" : "flex-col"} ${alignClassesFeature} ${marginClass}`}
        >
          <div className="flex-1">
            {block.title && (
              <h4
                className={`${isCompact ? "text-lg" : "text-xl"} font-bold text-foreground mb-2 wrap-break-word`}
              >
                {block.title}
              </h4>
            )}
            <div
              className={`${isCompact ? "text-sm" : "text-base"} text-foreground/70 leading-relaxed wrap-break-word`}
            >
              {block.description}
            </div>
          </div>
        </div>
      );

    case "spacer":
      const spacerSizes = {
        sm: "h-4 md:h-6",
        md: "h-8 md:h-12",
        lg: "h-16 md:h-24",
        xl: "h-24 md:h-40",
      };
      return <div className={spacerSizes[block.size || "md"]} />;

    case "container":
      const bgClasses = {
        none: "",
        muted: "bg-muted text-foreground",
        surface: "bg-surface shadow-sm text-foreground",
        primary: "bg-primary text-on-primary",
        secondary: "bg-secondary text-on-secondary",
      };
      const paddingClasses = {
        none: "p-0",
        sm: "p-4 md:p-6",
        md: "p-6 md:p-8",
        lg: "p-10 md:p-12",
      };
      const positionClasses = {
        relative: "relative",
        "absolute-bottom-left": "absolute bottom-8 left-8 z-10 max-w-[80%]",
        "absolute-top-right": "absolute top-8 right-8 z-10 max-w-[80%]",
        "absolute-center":
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-[80%]",
        "absolute-left":
          "absolute inset-y-0 left-0 z-10 w-full md:w-3/4 flex flex-col justify-center",
        "absolute-right":
          "absolute inset-y-0 right-0 z-10 w-full md:w-3/4 flex flex-col justify-center",
      };

      const isGradient =
        block.position === "absolute-left" ||
        block.position === "absolute-right";
      let containerBgClass = bgClasses[block.background || "none"];

      if (isGradient) {
        const isLeft = block.position === "absolute-left";
        const direction = isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l";

        let gradientColor =
          "from-background from-30% via-background/90 via-65%";
        if (block.background === "primary") {
          gradientColor =
            "from-primary from-30% via-primary/90 via-65% text-on-primary";
        } else if (block.background === "secondary") {
          gradientColor =
            "from-secondary from-30% via-secondary/90 via-65% text-on-secondary";
        } else if (block.background === "surface") {
          gradientColor = "from-surface from-30% via-surface/90 via-65%";
        } else if (block.background === "muted") {
          gradientColor = "from-secondary/15 from-30% via-secondary/5 via-65%";
        }

        containerBgClass = `${direction} ${gradientColor} to-transparent`;
      }

      const variantClasses = {
        default: isGradient ? "rounded-none" : "rounded-[var(--border-radius)]",
        card: "rounded-[var(--border-radius)] shadow-xl border border-white/10",
        glass:
          "rounded-[var(--border-radius)] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",
        outline: "rounded-3xl border-2 border-primary/20 bg-background",
        magazine:
          "bg-surface border border-secondary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full",
      };

      const containerVariantClass = isGradient
        ? "rounded-none shadow-none border-none"
        : variantClasses[block.variant || "default"];

      const containerMarginClass = isGradient ? "my-0" : marginClass;

      return (
        <div
          className={`transition-all duration-300 ${positionClasses[block.position || "relative"]} ${containerVariantClass} ${containerBgClass} ${paddingClasses[block.padding || (isGradient ? "lg" : "sm")]} ${containerMarginClass}`}
          style={{ flexGrow: "var(--col-flex-grow, 1)" }}
        >
          <div
            className={`flex flex-col h-full ${isGradient ? "justify-center max-w-2xl" : ""}`}
          >
            {block.blocks.map((b, bIdx) => (
              <BlockRenderer key={bIdx} block={b} />
            ))}
          </div>
        </div>
      );

    case "post-meta":
      return (
        <div
          className={`p-4 flex justify-between items-center border-b border-secondary/10 text-[11px] font-bold text-secondary/40 tracking-wider w-full ${marginClass}`}
        >
          <span>{block.date}</span>
          <span className="bg-secondary/5 text-secondary px-2 py-0.5 rounded uppercase">
            {block.category}
          </span>
        </div>
      );

    case "price-list":
      const { variant } = block;
      const isMinimal = variant === "minimal";
      const isCards = variant === "cards";

      const cardBaseClasses =
        "bg-surface rounded-[var(--border-radius)] shadow-lg border border-primary/10 transition-all duration-300 hover:scale-[1.01]";
      const cardHeaderClasses = "text-xl font-bold mb-4 text-center";
      const cardItemClasses = "flex justify-between items-baseline group";

      return (
        <div
          className={`grid gap-8 ${isCards ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""} ${marginClass}`}
        >
          {block.categories.map((category, idx) => (
            <div
              key={idx}
              className={cn(
                "p-6 md:p-8",
                isCards
                  ? cardBaseClasses
                  : isMinimal
                    ? ""
                    : "bg-surface/50 rounded-[var(--border-radius)] p-6 md:p-8 border border-secondary/10 shadow-sm",
              )}
            >
              <h3
                className={cn(
                  cardHeaderClasses,
                  isMinimal
                    ? "text-primary border-b-2 border-primary/10 pb-2 inline-block"
                    : isCards
                      ? "text-primary"
                      : "text-on-primary bg-primary rounded-xl px-4 py-2 inline-block shadow-md",
                )}
              >
                {category.name}
              </h3>
              <div className="grid gap-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={cardItemClasses}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.label}
                        </span>
                        <div className="mx-4 flex-1 border-b border-dotted border-secondary/20 h-0" />
                      </div>
                      {item.details && (
                        <p className="text-sm text-secondary mt-1 line-clamp-2">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <span className="text-lg font-black text-foreground ml-4 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "testimonial-card":
      return (
        <TestimonialCard
          quote={block.quote}
          author={block.author}
          role={block.role}
          avatar={block.avatar}
          className={marginClass}
        />
      );

    case "icon":
      return null;

    case "heading": {
      const Tag = (
        block.level === "editorial" || block.level === "display"
          ? "h2"
          : block.level || "h2"
      ) as React.ElementType;
      const fontSizes: Record<string, string> = {
        display:
          "text-5xl md:text-7xl font-black tracking-tighter uppercase break-words",
        editorial:
          "text-4xl md:text-6xl font-serif italic tracking-tight break-words",
        h1: "text-4xl md:text-5xl font-black tracking-tight break-words",
        h2: "text-3xl md:text-4xl font-extrabold tracking-tight break-words",
        h3: "text-xl md:text-2xl font-bold break-words",
      };
      const alignClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      }[block.align || "left"];

      const decorationClasses = {
        none: "",
        underline: "border-b-2 border-primary pb-2 inline-block",
        "line-left": "border-l-4 border-primary pl-6 py-2",
        "line-bottom":
          "after:content-[''] after:block after:w-24 after:h-1 after:bg-primary after:mt-4",
      };

      return (
        <div className={`${alignClasses} ${marginClass}`}>
          {block.eyebrow && (
            <span className="block text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">
              {block.eyebrow}
            </span>
          )}
          <Tag
            className={`${fontSizes[block.level || "h2"]} leading-[1.1] ${decorationClasses}`}
          >
            {block.text}
          </Tag>
        </div>
      );
    }

    case "text": {
      const alignClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
      }[block.align || "left"];

      const isInline = block.layout === "inline";

      return (
        <div
          className={`text-base md:text-lg opacity-80 leading-relaxed font-medium max-w-3xl ${alignClasses} ${marginClass} wrap-break-word whitespace-pre-wrap`}
        >
          {block.label && (
            <span
              className={cn(
                "font-bold text-primary",
                isInline ? "mr-2 inline" : "block mb-2 text-xl md:text-2xl",
              )}
            >
              {block.label}
            </span>
          )}
          {parseMarkdownInline(block.content)}
        </div>
      );
    }

    case "image":
      const aspectClasses = {
        square: "aspect-square",
        video: "aspect-video",
        cinematic: "aspect-[21/9]",
        portrait: "aspect-[3/4]",
        auto: "aspect-auto",
      };
      const isEditorial =
        block.aspect === "cinematic" || block.aspect === "portrait";

      return (
        <figure className={`group relative ${marginClass} w-full`}>
          <div
            className={`relative ${aspectClasses[block.aspect || "video"]} ${isEditorial ? "rounded-none" : "rounded-[var(--border-radius)] shadow-2xl"} overflow-hidden`}
          >
            <Image
              src={
                block.src.startsWith("http")
                  ? block.src
                  : `/${block.src.replace(/^\//, "")}`
              }
              alt={block.alt || "Image"}
              fill
              className={cn(
                "object-cover transition-all duration-700",
                ((block as any).hoverEffect === "zoom" ||
                  (block as any).hoverEffect === "grayscale-zoom") &&
                  "group-hover:scale-105",
                ((block as any).hoverEffect === "grayscale" ||
                  (block as any).hoverEffect === "grayscale-zoom") &&
                  "filter grayscale contrast-125 group-hover:grayscale-0",
              )}
            />
          </div>
          {block.caption && (
            <figcaption className="mt-6 text-center text-sm font-semibold tracking-widest uppercase text-secondary/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "image-grid": {
      const gridCols = {
        "2": "grid-cols-2",
        "3": "grid-cols-2 md:grid-cols-3",
        "4": "grid-cols-2 lg:grid-cols-4",
      };
      const gridGap = {
        none: "gap-0",
        sm: "gap-2 md:gap-4",
        md: "gap-4 md:gap-8",
        lg: "gap-8 md:gap-12",
      };
      const gridAspect = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        auto: "aspect-auto",
      };

      return (
        <div
          className={`grid ${gridCols[block.columns || "3"]} ${gridGap[block.gap || "md"]} ${marginClass}`}
        >
          {block.images.map((img, idx) => (
            <figure key={idx} className="group relative w-full">
              <div
                className={`relative ${gridAspect[block.aspect || "square"]} rounded-[var(--border-radius)] overflow-hidden shadow-md`}
              >
                <Image
                  src={
                    img.src.startsWith("http")
                      ? img.src
                      : `/${img.src.replace(/^\//, "")}`
                  }
                  alt={img.alt || "Gallery Image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {img.caption && (
                <figcaption className="mt-2 text-center text-xs text-foreground/50">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }

    case "button": {
      const buttonVariants: Record<string, string> = {
        primary:
          "bg-primary text-on-primary shadow-lg shadow-primary/30 hover:-translate-y-1",
        secondary: "bg-secondary/10 text-foreground hover:bg-secondary/20",
        outline: "border-2 border-current hover:bg-foreground/5",
      };
      const alignClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      }[block.align || "left"];

      return (
        <div className={`flex w-full ${alignClasses} pt-4 ${marginClass}`}>
          <Link
            href={block.href || "#"}
            className={`inline-flex items-center px-10 py-4 rounded-[var(--border-radius)] font-bold text-lg transition-all duration-300 ${buttonVariants[block.variant || "primary"]}`}
          >
            {block.label}
          </Link>
        </div>
      );
    }

    case "list": {
      const { items, marker = "bullets", variant = "simple" } = block;
      const alignClasses = {
        left: "justify-items-start",
        center: "justify-items-center",
        right: "justify-items-end",
      }[block.align || "left"];

      const isCards = variant === "cards";

      return (
        <ul className={cn("grid gap-4 w-full", alignClasses, marginClass)}>
          {items.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                "flex items-start gap-4 transition-all duration-300 w-fit",
                isCards
                  ? "bg-surface p-6 rounded-2xl border border-secondary/5 shadow-sm hover:shadow-md hover:scale-[1.01]"
                  : "py-1",
              )}
            >
              {/* Marker Logic */}
              {marker !== "none" && (
                <div className="mt-1 shrink-0">
                  {marker === "checkmarks" ? (
                    <div className="bg-primary/10 p-1 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  ) : marker === "ordered" ? (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold">
                      {idx + 1}
                    </span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </div>
              )}
              <span
                className={cn(
                  "text-base md:text-lg opacity-90 leading-relaxed font-medium",
                  isCards ? "text-foreground" : "",
                )}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    default:
      return null;
  }
};
