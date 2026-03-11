import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { HeroSection } from "@/lib/schema";

type HeroSplitProps = HeroSection["props"];

export const HeroSplit = ({
  headline,
  subheadline,
  ctaText,
  imageName,
}: HeroSplitProps) => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              {headline}
            </h1>

            {subheadline && (
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                {subheadline}
              </p>
            )}

            <button className="inline-flex items-center px-6 py-3 text-base font-medium text-background bg-primary rounded-lg hover:opacity-90 transition-opacity">
              {ctaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 w-full">
            {imageName ? (
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
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
              // Fallback placeholder
              <div className="w-full aspect-4/3 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary/50">
                No Image Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
