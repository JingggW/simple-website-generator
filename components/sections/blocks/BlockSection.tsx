import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType, Block } from "@/lib/schema";

export const BlockSection = ({
  blocks,
  variant = "prose",
}: BlockSectionType["props"] & { variant?: string }) => {
  
  const containerVariants: Record<string, string> = {
    prose: "max-w-3xl mx-auto px-6 py-20",
    wide: "max-w-6xl mx-auto px-6 py-24",
    full: "w-full px-6 py-32",
  };
  
  const containerClasses = containerVariants[variant] || containerVariants.prose;

  // RECURSIVE BLOCK RENDERER
  const RenderBlock = ({ block }: { block: Block }) => {
    switch (block.type) {
      case "columns":
        const layoutClasses: Record<string, string> = {
          "split": "grid-cols-1 md:grid-cols-2",
          "3-col": "grid-cols-1 md:grid-cols-3",
          "split-left": "grid-cols-1 md:grid-cols-[2fr_1fr]",
          "split-right": "grid-cols-1 md:grid-cols-[1fr_2fr]",
        };
        return (
          <div className={`grid gap-12 items-start ${layoutClasses[block.layout || "split"]}`}>
            {block.items.map((col, idx) => (
              <div key={idx} className="space-y-8">
                {col.blocks.map((b, bIdx) => <RenderBlock key={bIdx} block={b} />)}
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
        const alignClasses = { left: "text-left", center: "text-center", right: "text-right" }[block.align || "left"];

        return (
          <div className={`${alignClasses} ${block.align === 'left' ? 'border-l-4 border-primary pl-6 py-2' : ''}`}>
            <Tag className={`${fontSizes[block.level || "h2"]} text-foreground leading-tight`}>
              {block.text}
            </Tag>
          </div>
        );
      }

      case "text": {
        const alignClasses = { left: "text-left", center: "text-center", right: "text-right" }[block.align || "left"];
        return (
          <p className={`text-xl text-secondary/80 leading-relaxed font-medium ${alignClasses}`}>
            {block.content}
          </p>
        );
      }

      case "image":
        return (
          <figure className="my-8 group">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-secondary/5">
              <Image
                src={block.src.startsWith('http') ? block.src : `/${block.src.replace(/^\//, '')}`}
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
          primary: "bg-primary text-background shadow-lg shadow-primary/30 hover:-translate-y-1",
          secondary: "bg-secondary/10 text-foreground hover:bg-secondary/20",
          outline: "border-2 border-primary text-primary hover:bg-primary/5",
        };
        const alignClasses = { left: "justify-start", center: "justify-center", right: "justify-end" }[block.align || "left"];

        return (
          <div className={`flex w-full ${alignClasses} pt-4`}>
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
    <section className="bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className={containerClasses}>
        <div className="space-y-12">
          {blocks.map((block, index) => <RenderBlock key={index} block={block} />)}
        </div>
      </div>
    </section>
  );
};
