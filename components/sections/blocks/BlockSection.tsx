import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType, Block } from "@/lib/schema";
import { IconMap } from "@/components/ui/IconMap";
import { TestimonialCard } from "../testimonials/TestimonialCard";

export const BlockSection = ({ blocks }: BlockSectionType["props"]) => {
  // RECURSIVE BLOCK RENDERER
  const RenderBlock = ({ block }: { block: Block }) => {
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
        };
        return (
          <div
            className={`grid gap-8 lg:gap-12 items-stretch ${layoutClasses[block.layout || "split"]} ${marginClass}`}
          >
            {block.items.map((col, idx) => (
              <div key={idx} className="flex flex-col h-full">
                {col.blocks.map((b, bIdx) => (
                  <RenderBlock key={bIdx} block={b} />
                ))}
              </div>
            ))}
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
            {block.icon && (
              <div className={isHorizontal ? "mt-1" : "mb-4"}>
                <IconMap name={block.icon} className="w-10 h-10 text-primary" />
              </div>
            )}
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
        const variantClasses = {
          default: "rounded-[var(--border-radius)]",
          card: "rounded-[var(--border-radius)] shadow-xl border border-white/10",
          glass:
            "rounded-[var(--border-radius)] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",
          outline:
            "rounded-[var(--border-radius)] border-2 border-primary/20 bg-transparent",
        };
        const positionClasses = {
          relative: "relative",
          "absolute-bottom-left": "absolute bottom-8 left-8 z-10 max-w-[80%]",
          "absolute-top-right": "absolute top-8 right-8 z-10 max-w-[80%]",
          "absolute-center":
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-[80%]",
        };
        return (
          <div
            className={`transition-all duration-300 ${positionClasses[block.position || "relative"]} ${variantClasses[block.variant || "default"]} ${bgClasses[block.background || "none"]} ${paddingClasses[block.padding || "sm"]} ${marginClass}`}
          >
            <div className="flex flex-col h-full">
              {block.blocks.map((b, bIdx) => (
                <RenderBlock key={bIdx} block={b} />
              ))}
            </div>
          </div>
        );

      case "price-list":
        const isMinimal = block.variant === "minimal";
        return (
          <div className={`grid gap-8 ${marginClass}`}>
            {block.categories.map((category, idx) => (
              <div
                key={idx}
                className={
                  isMinimal
                    ? ""
                    : "bg-surface/50 rounded-3xl p-6 md:p-8 border border-secondary/10 shadow-sm"
                }
              >
                <h3
                  className={`text-xl font-bold mb-6 ${
                    isMinimal
                      ? "text-primary border-b-2 border-primary/10 pb-2 inline-block"
                      : "text-on-primary bg-primary rounded-xl px-4 py-2 inline-block shadow-md"
                  }`}
                >
                  {category.name}
                </h3>
                <div className="grid gap-4">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex justify-between items-baseline group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {item.label}
                          </span>
                          <div className="mx-4 flex-1 border-b border-dotted border-secondary/20 h-0" />
                        </div>
                        {item.details && (
                          <p className="text-sm text-secondary/60 mt-1 line-clamp-2">
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
        const iconSizes = {
          sm: "w-6 h-6",
          md: "w-10 h-10",
          lg: "w-16 h-16",
        };
        const iconColors = {
          primary: "text-primary",
          secondary: "text-secondary",
          accent: "text-accent",
          muted: "text-foreground/40",
        };
        const alignClasses = {
          left: "justify-start",
          center: "justify-center",
          right: "justify-end",
        }[block.align || "left"];

        return (
          <div className={`flex w-full ${alignClasses} ${marginClass}`}>
            <IconMap
              name={block.name}
              className={`${iconSizes[block.size || "md"]} ${iconColors[block.color || "primary"]}`}
            />
          </div>
        );

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
        }[block.decoration || "none"];

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
          center: "text-center",
          right: "text-right",
        }[block.align || "left"];
        return (
          <div
            className={`text-base md:text-lg opacity-80 leading-relaxed font-medium ${alignClasses} ${marginClass} wrap-break-word whitespace-pre-wrap`}
          >
            {block.content}
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
              className={`relative ${aspectClasses[block.aspect || "video"]} ${isEditorial ? "rounded-none" : "rounded-(--border-radius)"} overflow-hidden shadow-2xl`}
            >
              <Image
                src={
                  block.src.startsWith("http")
                    ? block.src
                    : `/${block.src.replace(/^\//, "")}`
                }
                alt={block.alt || "Image"}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
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
                  className={`relative ${gridAspect[block.aspect || "square"]} rounded-(--border-radius) overflow-hidden shadow-md`}
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
              className={`inline-flex items-center px-10 py-4 rounded-(--border-radius) font-bold text-lg transition-all duration-300 ${buttonVariants[block.variant || "primary"]}`}
            >
              {block.label}
            </Link>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => (
        <RenderBlock key={index} block={block} />
      ))}
    </div>
  );
};
