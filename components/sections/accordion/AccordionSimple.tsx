"use client";

import React, { useState } from "react";
import { AccordionSection } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const AccordionSimple: React.FC<AccordionSection["props"] & { variant: string }> = ({
  title,
  description,
  items,
  variant,
  background,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isSplit = variant === "split";
  const isBordered = variant === "bordered";

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const itemClasses = isBordered
    ? "border border-current/20 rounded-lg mb-4 overflow-hidden"
    : "border-b border-current/10";

  return (
    <div className={`w-full ${isSplit ? "lg:grid lg:grid-cols-12 lg:gap-12" : ""}`}>
      {(title || description) && (
        <div className={`${isSplit ? "lg:col-span-5 mb-8 lg:mb-0" : "text-center mb-12"}`}>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={`${isSplit ? "lg:col-span-7" : "max-w-3xl mx-auto"}`}>
        {items.map((item, index) => (
          <div key={index} className={itemClasses}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-current/5 transition-colors group"
            >
              <span className="text-lg font-medium">{item.trigger}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-4 md:px-6 md:pb-6 opacity-80 leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
