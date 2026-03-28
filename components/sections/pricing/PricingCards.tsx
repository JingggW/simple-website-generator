import React from "react";
import { PricingSection } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type PricingProps = PricingSection["props"];

export const PricingCards = ({
  title,
  description,
  categories,
}: PricingProps) => {
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-surface border border-secondary/10 rounded-4xl p-8 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full transition-all duration-500"
            >
              <div className="mb-8">
                <h3 className="font-black uppercase tracking-widest text-xl mb-2 text-primary">
                  {category.name}
                </h3>
                <div className="h-1 w-12 bg-primary/20 mt-4 rounded-full" />
              </div>

              <div className="space-y-6 flex-1">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {item.label}
                      </span>
                      <span className="font-black text-foreground text-lg">
                        {item.price}
                      </span>
                    </div>
                    {item.details && (
                      <p className="text-sm text-secondary/60 leading-relaxed pl-6">
                        {item.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <button className="w-full py-4 rounded-2xl bg-primary text-on-primary font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
