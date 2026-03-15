import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType, Block } from "@/lib/schema";
import { IconMap } from "@/components/ui/IconMap";

export const BlockSection = ({ blocks }: BlockSectionType["props"]) => {
  // RECURSIVE BLOCK RENDERER
  const RenderBlock = ({ block }: { block: Block }) => {
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
          "4-col": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
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

      case "container":
        const bgClasses = {
          none: "",
          muted: "bg-muted",
          surface: "bg-surface shadow-sm",
          primary: "bg-primary text-on-primary",
          secondary: "bg-secondary text-on-secondary",
        };
        const paddingClasses = {
          none: "p-0",
          sm: "p-4 md:p-6",
          md: "p-8 md:p-10",
          lg: "p-12 md:p-16",
        };
        const variantClasses = {
          default: "rounded-[var(--border-radius)]",
          card: "rounded-[var(--border-radius)] shadow-xl border border-white/10",
          glass:
            "rounded-[var(--border-radius)] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",
          outline: "rounded-[var(--border-radius)] border-2 border-primary/20 bg-transparent",
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
          display: "text-6xl md:text-8xl font-black tracking-tighter uppercase",
          editorial: "text-5xl md:text-7xl font-serif italic tracking-tight",
          h1: "text-5xl md:text-6xl font-black tracking-tight",
          h2: "text-4xl md:text-5xl font-extrabold tracking-tight",
          h3: "text-2xl md:text-3xl font-bold",
        };
        const alignClasses = {
          left: "text-left",
          center: "text-center",
          right: "text-right",
        }[block.align || "left"];

        return (
          <div
            className={`${alignClasses} ${block.align === "left" && block.level === "h2" ? "border-l-4 border-primary pl-6 py-2" : ""} ${marginClass}`}
          >
            <Tag
              className={`${fontSizes[block.level || "h2"]} text-foreground leading-[0.9]`}
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
          <p
            className={`text-xl text-foreground/80 leading-relaxed font-medium ${alignClasses} ${marginClass}`}
          >
            {block.content}
          </p>
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
              className={`relative ${aspectClasses[block.aspect || "video"]} ${isEditorial ? "rounded-none" : "rounded-[var(--border-radius)]"} overflow-hidden shadow-2xl`}
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

      case "button": {
        const buttonVariants: Record<string, string> = {
          primary:
            "bg-primary text-on-primary shadow-lg shadow-primary/30 hover:-translate-y-1",
          secondary: "bg-secondary/10 text-foreground hover:bg-secondary/20",
          outline: "border-2 border-primary text-primary hover:bg-primary/5",
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
