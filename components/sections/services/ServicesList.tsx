import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ServicesSection } from "@/lib/schema";
import { IconMap } from "@/components/ui/IconMap";

type ServicesProps = ServicesSection["props"];

export const ServicesList = ({ title, description, items }: ServicesProps) => {
  return (
    <section id="services" className="space-y-24">
      {/* Section Header (Optional) */}
      {(title || description) && (
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-secondary">{description}</p>
          )}
        </div>
      )}

      {/* Services List - Alternating Split Layout */}
      <div className="space-y-32">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Image Column */}
              <div className="flex-1 w-full group overflow-hidden shadow-2xl">
                {item.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `/${item.image.replace(/^\//, "")}`
                      }
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-secondary/5 flex items-center justify-center">
                    {item.icon ? (
                      <IconMap name={item.icon} className="w-20 h-20 text-secondary/20" />
                    ) : (
                      <div className="w-20 h-20 bg-secondary/10 rounded-full" />
                    )}
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="flex-1 max-w-xl">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.15em] text-foreground leading-tight">
                    <b>{item.title}</b>
                  </h3>
                  
                  <div className="text-[13px] leading-relaxed text-foreground/70 font-medium tracking-wide whitespace-pre-wrap max-w-md">
                    {item.description}
                  </div>

                  {(item.ctaLink || item.ctaText) && (
                    <div className="pt-4">
                      <NextLink
                        href={item.ctaLink || "#"}
                        className="inline-block border-2 border-foreground px-10 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground hover:text-background"
                      >
                        {item.ctaText || "Contact us"}
                      </NextLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
