import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType, Block } from "@/lib/schema";

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
          "split-left": "grid-cols-1 md:grid-cols-[2fr_1fr]",
          "split-right": "grid-cols-1 md:grid-cols-[1fr_2fr]",
        };
        return (
          <div
            className={`grid gap-12 items-start ${layoutClasses[block.layout || "split"]} ${marginClass}`}
          >
            {block.items.map((col, idx) => (
              <div key={idx} className="space-y-8">
                {col.blocks.map((b, bIdx) => (
                  <RenderBlock key={bIdx} block={b} />
                ))}
              </div>
            ))}
          </div>
        );

      case "heading": {
        const Tag = (block.level || "h2") as React.ElementType;
        const fontSizes: Record<string, string> = {
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
            className={`${alignClasses} ${block.align === "left" ? "border-l-4 border-primary pl-6 py-2" : ""} ${marginClass}`}
          >
            <Tag
              className={`${fontSizes[block.level || "h2"]} text-foreground leading-tight`}
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
        return (
          <figure className={`group ${marginClass}`}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-secondary/5">
              <Image
                src={
                  block.src.startsWith("http")
                    ? block.src
                    : `/${block.src.replace(/^\//, "")}`
                }
                alt={block.alt || "Image"}
                fill
                className="object-cover"
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
            "bg-primary text-background shadow-lg shadow-primary/30 hover:-translate-y-1",
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
              className={`inline-flex items-center px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${buttonVariants[block.variant || "primary"]}`}
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
