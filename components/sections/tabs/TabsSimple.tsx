"use client";

import React, { useState } from "react";
import { TabsSection } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { BlockRenderer } from "@/components/sections/blocks/BlockRenderer";

export const TabsSimple: React.FC<TabsSection["props"] & { variant: string }> = ({
  title,
  description,
  items,
  variant,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const isVertical = variant === "vertical";
  const isPills = variant === "pills";

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
          {description && <p className="text-lg opacity-80 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className={`flex ${isVertical ? "flex-col md:flex-row gap-8" : "flex-col"}`}>
        {/* Tab Triggers */}
        <div
          className={`flex overflow-x-auto no-scrollbar ${
            isVertical
              ? "flex-row md:flex-col md:w-64 border-b md:border-b-0 md:border-r border-current/10"
              : `justify-center mb-8 ${!isPills ? "border-b border-current/10" : ""}`
          }`}
        >
          <div className={`flex ${isVertical ? "flex-row md:flex-col w-full" : "gap-2"}`}>
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap text-left ${
                  isPills
                    ? `rounded-full ${activeTab === index ? "bg-primary text-on-primary" : "hover:bg-current/5"}`
                    : `${activeTab === index ? "text-primary" : "text-current/60 hover:text-current hover:bg-current/5"}`
                }`}
              >
                {item.label}
                {!isPills && activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bg-primary ${
                      isVertical ? "right-0 top-0 bottom-0 w-1" : "left-0 right-0 bottom-0 h-1"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6">
                {items[activeTab].content.map((block, idx) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
