import React from "react";
import { TestimonialsSection } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "./TestimonialCard";

type TestimonialsProps = TestimonialsSection["props"];

export const TestimonialsGrid = ({ 
  title, 
  subtitles, 
  items, 
  variant = "grid" 
}: any) => {
  const isHero = variant === "hero";
  const isMasonry = variant === "masonry";

  if (isHero && items.length > 0) {
    const item = items[0];
    return (
      <section className="relative py-12">
        <div className="container mx-auto px-6">
          <TestimonialCard 
            {...item} 
            variant="featured" 
            className="max-w-5xl mx-auto p-12 md:p-20 rounded-[3rem]" 
          />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-6">
            {title}
          </h2>
          {subtitles && (
            <p className="text-xl text-secondary leading-relaxed">
              {subtitles}
            </p>
          )}
        </div>

        <div className={cn(
          "grid gap-8",
          isMasonry 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {items.map((item: any, index: number) => (
            <TestimonialCard 
              key={index} 
              {...item} 
              className={isMasonry && index % 2 === 1 ? "md:mt-12" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
