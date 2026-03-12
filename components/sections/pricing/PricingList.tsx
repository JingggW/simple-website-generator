import React from "react";
import { PricingSection } from "@/lib/schema";

type PricingProps = PricingSection["props"];

export const PricingList = ({ title, description, categories }: PricingProps) => {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-foreground mb-4">{title}</h2>
          {description && <p className="text-xl text-secondary/70">{description}</p>}
        </div>

        <div className="grid gap-12">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-secondary/5 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-primary mb-8 border-b border-primary/10 pb-4">
                {category.name}
              </h3>
              <div className="grid gap-6">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex justify-between items-baseline group">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        <div className="mx-4 flex-1 border-b border-dotted border-secondary/20 h-0" />
                      </div>
                      {item.details && (
                        <p className="text-sm text-secondary/60 mt-1">{item.details}</p>
                      )}
                    </div>
                    <span className="text-xl font-black text-foreground ml-4">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
