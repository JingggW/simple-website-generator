import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type HeroSplitProps = HeroSection["props"];

export const HeroSplit = ({
  hookLine,
  coreValueProp,
  subText,
  primaryCTA,
  ctaLink,
  imageName,
  imagePosition = "right",
  background = "default",
}: HeroSplitProps & { background?: string }) => {
  const isImageLeft = imagePosition === "left";
  const isDarkBg = background === "primary" || background === "secondary";

  return (
    <section>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col md:flex-row items-stretch gap-12 lg:gap-24",
            isImageLeft ? "md:flex-row-reverse" : "md:flex-row",
          )}
        >
          {/* Text Column */}
          <div className="flex-[1.2] flex flex-col justify-center text-center md:text-left py-12 md:py-24">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">
              {hookLine}
            </p>
            <h1
              className={cn(
                "text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight max-w-2xl mx-auto md:mx-0",
                isDarkBg ? "text-current" : "text-foreground",
              )}
            >
              {coreValueProp.split('|').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < coreValueProp.split('|').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <p
              className={cn(
                "text-lg md:text-xl mb-8 leading-relaxed max-w-xl",
                isDarkBg ? "text-current/90" : "text-secondary",
              )}
            >
              {subText}
            </p>

            {primaryCTA && (
              <Link
                href={ctaLink || "#"}
                className={cn(
                  "inline-flex items-center px-10 py-4 text-base font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl",
                  isDarkBg
                    ? "bg-foreground text-background shadow-black/40"
                    : "bg-primary text-on-primary shadow-primary/30",
                )}
              >
                {primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Image Column */}
          <div className="flex-1 w-full flex items-center">
            {imageName ? (
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    imageName.startsWith("http")
                      ? imageName
                      : `/${imageName.replace(/^\//, "")}`
                  }
                  alt={coreValueProp}
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
