import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockSection as BlockSectionType } from "@/lib/schema";

export const BlockSection = ({
  blocks,
  variant = "prose",
}: BlockSectionType["props"] & { variant?: string }) => {
  const containerVariants: Record<string, string> = {
    prose: "max-w-3xl mx-auto px-6",
    wide: "max-w-6xl mx-auto px-6",
    full: "w-full px-6",
  };
  const containerClasses =
    containerVariants[variant] || "max-w-3xl mx-auto px-6";

  return (
    <section className="py-16 bg-background">
      <div className={containerClasses}>
        <div className="space-y-8">
          {blocks.map((block, index) => {
            switch (block.type) {
              case "heading": {
                const Tag = block.level as React.ElementType;
                const fontSizes: Record<string, string> = {
                  h1: "text-4xl md:text-5xl font-bold",
                  h2: "text-3xl md:text-4xl font-semibold",
                  h3: "text-2xl md:text-3xl font-medium",
                };
                const fontSize =
                  fontSizes[block.level] || "text-3xl font-semibold";

                return (
                  <Tag
                    key={index}
                    className={`${fontSize} text-foreground mb-4`}
                  >
                    {block.text}
                  </Tag>
                );
              }

              case "text":
                return (
                  <p
                    key={index}
                    className="text-lg text-secondary leading-relaxed whitespace-pre-wrap"
                  >
                    {block.content}
                  </p>
                );

              case "image":
                return (
                  <figure key={index} className="my-10">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-secondary/10">
                      <Image
                        src={block.src}
                        alt={block.alt || "Image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-4 text-center text-sm text-secondary italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              case "button": {
                const buttonVariants: Record<string, string> = {
                  primary: "bg-primary text-background hover:opacity-90",
                  secondary:
                    "bg-secondary/10 text-foreground hover:bg-secondary/20",
                  outline:
                    "border-2 border-primary text-primary hover:bg-primary/5",
                };
                const buttonStyles =
                  buttonVariants[block.variant] || "bg-primary text-background";

                return (
                  <div key={index} className="pt-4">
                    <Link
                      href={block.href}
                      className={`inline-block px-8 py-3 rounded-lg font-medium transition-all ${buttonStyles}`}
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
