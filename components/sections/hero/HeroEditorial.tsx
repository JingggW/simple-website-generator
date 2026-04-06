import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type HeroEditorialProps = HeroSection["props"];

export const HeroEditorial = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  imageName,
  imagePosition = "right",
}: HeroEditorialProps) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          {/* 1. Massive Editorial Headline */}
          <h1 className="text-6xl md:text-[10vw] font-black text-foreground leading-[0.9] tracking-tighter uppercase wrap-break-word">
            {headline}
          </h1>

          {/* 2. Asymmetric Content Grid */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-12 gap-12 items-end",
              isImageLeft ? "md:flex-row-reverse" : "",
            )}
          >
            <div
              className={cn(
                "md:col-span-7",
                isImageLeft ? "md:order-2" : "md:order-1",
              )}
            >
              {imageName ? (
                <div className="relative aspect-video md:aspect-16/10 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                  <Image
                    src={
                      imageName.startsWith("http")
                        ? imageName
                        : `/${imageName.replace(/^\//, "")}`
                    }
                    alt={headline}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-secondary/10 rounded-sm" />
              )}
            </div>

            <div
              className={cn(
                "md:col-span-5 space-y-8",
                isImageLeft ? "md:order-1" : "md:order-2",
              )}
            >
              {subheadline && (
                <p className="text-xl md:text-2xl text-secondary font-serif italic leading-relaxed">
                  {subheadline}
                </p>
              )}

              {ctaText && (
                <Link
                  href={ctaLink || "#"}
                  className="group inline-flex items-center text-sm font-black uppercase tracking-[0.4em] text-foreground border-b-2 border-primary pb-2 hover:text-primary transition-all"
                >
                  {ctaText}
                  <ArrowRight className="ml-4 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
