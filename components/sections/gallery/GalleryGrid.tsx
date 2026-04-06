"use client";

import React, { useState } from "react";
import { GallerySection } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const GalleryGrid: React.FC<GallerySection["props"] & { variant: string }> = ({
  title,
  description,
  images,
  variant,
  columns = "3",
  gap = "md",
  aspect = "square",
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const isMasonry = variant === "masonry";
  const isCarousel = variant === "carousel";

  const gapClasses: Record<string, string> = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4 md:gap-6",
    lg: "gap-8 md:gap-12",
  };

  const aspectClasses: Record<string, string> = {
    square: "aspect-square",
    video: "aspect-video",
    cinematic: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
    auto: "h-auto",
  };

  const colClasses: Record<string, string> = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 lg:grid-cols-4",
    "5": "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  };

  const categories = Array.from(new Set(images.map((img) => img.category).filter(Boolean)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredImages = activeCategory
    ? images.filter((img) => img.category === activeCategory)
    : images;

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
          {description && <p className="text-lg opacity-80 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              !activeCategory ? "bg-primary text-on-primary" : "bg-current/10 hover:bg-current/20"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as string)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === cat ? "bg-primary text-on-primary" : "bg-current/10 hover:bg-current/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Layout */}
      <div
        className={`grid ${colClasses[columns]} ${gapClasses[gap]} ${isMasonry ? "items-start" : ""}`}
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src + index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`group relative cursor-pointer overflow-hidden rounded-lg bg-muted ${
                !isMasonry ? aspectClasses[aspect] : ""
              }`}
              onClick={() => setSelectedIdx(index)}
            >
              <img
                src={image.src}
                alt={image.alt || title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {(image.caption || image.category) && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                  {image.category && <span className="text-xs uppercase tracking-widest mb-2 opacity-80">{image.category}</span>}
                  {image.caption && <p className="text-sm font-medium">{image.caption}</p>}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-[110]"
              onClick={() => setSelectedIdx(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {selectedIdx > 0 && (
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedIdx(selectedIdx - 1)}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            {selectedIdx < filteredImages.length - 1 && (
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedIdx(selectedIdx + 1)}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <div className="relative max-w-5xl max-h-full flex flex-col items-center">
              <motion.img
                key={selectedIdx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                src={filteredImages[selectedIdx].src}
                alt={filteredImages[selectedIdx].alt}
              />
              {filteredImages[selectedIdx].caption && (
                <p className="text-white text-lg mt-6 text-center max-w-2xl">{filteredImages[selectedIdx].caption}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
