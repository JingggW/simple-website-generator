import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type HeroVisualProps = HeroSection["props"];

export const HeroVisual = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  imageName,
}: HeroVisualProps) => {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      {imageName && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageName.startsWith('http') ? imageName : `/${imageName.replace(/^\//, '')}`}
            alt={headline}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase drop-shadow-2xl">
            {headline}
          </h1>
          
          {subheadline && (
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {subheadline}
            </p>
          )}

          {ctaText && (
            <div className="pt-8">
              <Link
                href={ctaLink || "#"}
                className="inline-flex items-center px-12 py-5 text-sm font-black uppercase tracking-[0.3em] text-black bg-white rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500 shadow-2xl hover:scale-105"
              >
                {ctaText}
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
