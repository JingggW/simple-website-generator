import React from "react";
import { PricingSection } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type PricingProps = PricingSection["props"];

export const PricingList = ({ title, description, categories, variant = "simple" }: any) => {
  const isCards = variant === "cards";

  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground mb-6">{title}</h2>
          {description && <p className="text-lg md:text-xl text-secondary leading-relaxed">{description}</p>}
        </div>

        <div className={cn(
          "grid gap-8",
          isCards ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
        )}>
          {categories.map((category: any, idx: number) => (
            <div 
              key={idx} 
              className={cn(
                "transition-all duration-500",
                isCards 
                  ? "bg-surface border border-secondary/10 rounded-[2rem] p-8 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full" 
                  : "bg-secondary/5 rounded-3xl p-8 md:p-12 mb-8"
              )}
            >
              <div className="mb-8">
                <h3 className={cn(
                  "font-black uppercase tracking-widest",
                  isCards ? "text-xl mb-2 text-primary" : "text-2xl text-on-primary bg-primary rounded-xl px-6 py-2 inline-block shadow-lg"
                )}>
                  {category.name}
                </h3>
                {isCards && <div className="h-1 w-12 bg-primary/20 mt-4 rounded-full" />}
              </div>

              <div className="space-y-6 flex-1">
                {category.items.map((item: any, itemIdx: number) => (
                  <div key={itemIdx} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {isCards && <Check className="w-4 h-4 text-primary shrink-0" />}
                        {item.label}
                      </span>
                      {!isCards && <div className="mx-4 flex-1 border-b border-dotted border-secondary/20 h-0" />}
                      <span className={cn(
                        "font-black text-foreground",
                        isCards ? "text-lg" : "text-xl"
                      )}>
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

              {isCards && (
                <div className="mt-12">
                  <button className="w-full py-4 rounded-2xl bg-primary text-on-primary font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Choose Plan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
