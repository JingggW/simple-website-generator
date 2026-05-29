import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type HeroVisualProps = HeroSection["props"];

export const HeroVisual = ({
  hookLine,
  coreValueProp,
  subText,
  primaryCTA,
  ctaLink,
  imageName,
  width = "bleed",
}: HeroVisualProps & { width?: string }) => {
  const isBleed = width === "bleed";

  return (
    <section className={cn(
      "relative w-full overflow-hidden transition-all duration-500",
      isBleed ? "min-h-[80vh]" : "container mx-auto px-0 min-h-[70vh]" // Removed rounded-3xl and margins
    )}>
      {/* Background Image with Overlay */}
      {imageName && (
        <div className="absolute inset-0 z-0">
          <Image
            src={
              imageName.startsWith("http")
                ? imageName
                : `/${imageName.replace(/^\//, "")}`
            }
            alt={coreValueProp}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "container relative z-10 mx-auto px-6 text-center pb-6 md:pb-8 flex flex-col items-center justify-center min-h-inherit",
        isBleed ? "min-h-[80vh]" : "min-h-[70vh]"
      )}>
        <div className="max-w-4xl mx-auto space-y-8 py-12 md:py-20">
          {hookLine && (
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/80">
              {hookLine}
            </p>
          )}

          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase drop-shadow-2xl">
            {coreValueProp}
          </h1>

          {subText && (
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {subText}
            </p>
          )}

          {primaryCTA && (
            <div className="pt-8">
              <Link
                href={ctaLink || "#"}
                className="inline-flex items-center px-12 py-5 text-sm font-black uppercase tracking-[0.3em] text-black bg-white rounded-full hover:bg-primary hover:text-on-primary transition-all duration-500 shadow-2xl hover:scale-105"
              >
                {primaryCTA}
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
