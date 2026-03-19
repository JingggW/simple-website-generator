import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type HeroSplitProps = HeroSection["props"];

export const HeroSplit = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  imageName,
  imagePosition = "right",
}: HeroSplitProps) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col md:flex-row items-center gap-12 lg:gap-20",
          isImageLeft ? "md:flex-row-reverse" : "md:flex-row"
        )}>
          {/* Text Column */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] mb-6 tracking-tight">
              {headline}
            </h1>

            {subheadline && (
              <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-xl">
                {subheadline}
              </p>
            )}

            {ctaText && (
              <Link
                href={ctaLink || "#"}
                className="inline-flex items-center px-10 py-4 text-base font-black uppercase tracking-[0.2em] text-on-primary bg-primary rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Image Column */}
          <div className="flex-1 w-full">
            {imageName ? (
              <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={imageName.startsWith('http') ? imageName : `/${imageName.replace(/^\//, '')}`}
                  alt={headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary/50">
                No Image Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
