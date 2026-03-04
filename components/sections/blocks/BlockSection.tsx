import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType } from "@/lib/schema";

export const BlockSection = ({
  blocks,
  variant = "prose",
}: BlockSectionType["props"] & { variant?: string }) => {
  
  // 1. Container Styling
  const containerVariants: Record<string, string> = {
    prose: "max-w-3xl mx-auto px-6 py-20",
    wide: "max-w-6xl mx-auto px-6 py-24",
    full: "w-full px-6 py-32",
  };
  
  const containerClasses = containerVariants[variant] || containerVariants.prose;

  return (
    <section className="bg-background relative overflow-hidden">
      {/* Subtle background decoration for non-ugly blocks */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <div className={containerClasses}>
        <div className="space-y-12">
          {blocks.map((block, index) => {
            switch (block.type) {
              case "heading": {
                const Tag = (block.level || "h2") as React.ElementType;
                const fontSizes: Record<string, string> = {
                  h1: "text-5xl md:text-6xl font-black tracking-tight",
                  h2: "text-4xl md:text-5xl font-extrabold tracking-tight",
                  h3: "text-2xl md:text-3xl font-bold",
                };
                const fontSize = fontSizes[block.level || "h2"];

                return (
                  <div key={index} className="border-l-4 border-primary pl-6 py-2">
                    <Tag className={`${fontSize} text-foreground leading-tight`}>
                      {block.text}
                    </Tag>
                  </div>
                );
              }

              case "text":
                return (
                  <p
                    key={index}
                    className="text-xl text-secondary/80 leading-relaxed max-w-none font-medium"
                  >
                    {block.content}
                  </p>
                );

              case "image":
                return (
                  <figure key={index} className="my-16 group">
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-secondary/5 transition-transform duration-500 group-hover:scale-[1.01]">
                      {block.src ? (
                        <Image
                          src={block.src.startsWith('http') ? block.src : `/${block.src.replace(/^\//, '')}`}
                          alt={block.alt || "Image"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                          Image Placeholder
                        </div>
                      )}
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
                const buttonStyles = buttonVariants[block.variant || "primary"];

                return (
                  <div key={index} className="pt-6">
                    <Link
                      href={block.href || "#"}
                      className={`inline-flex items-center px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${buttonStyles}`}
                    >
                      {block.label}
                    </Link>
                  </div>
                );
              }

              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
};
