"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CarouselSection } from "@/lib/schema";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlockRenderer } from "../blocks/BlockRenderer";

// Combine props with a required variant
type CarouselSimpleProps = CarouselSection["props"] & {
  variant: CarouselSection["variant"];
};

export const CarouselSimple = ({
  items,
  variant, // Now correctly received as a top-level prop
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
}: CarouselSimpleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, items.length]);

  if (!items || items.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderItem = (item: any) => {
    switch (variant) {
      case "images":
        return (
          <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {item.imageName && (
              <Image
                src={
                  item.imageName.startsWith("http")
                    ? item.imageName
                    : `/${item.imageName.replace(/^\//, "")}`
                }
                alt={item.title || "Carousel Image"}
                fill
                className="object-cover"
              />
            )}
            {(item.title || item.description) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16 text-white">
                {item.title && (
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8">
                    {item.description}
                  </p>
                )}
                {item.ctaText && (
                  <div>
                    <Link
                      href={item.ctaLink || "#"}
                      className="inline-flex items-center px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-on-primary transition-all"
                    >
                      {item.ctaText}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "testimonials":
        return (
          <div className="flex flex-col items-center text-center p-12 md:p-24 bg-surface rounded-3xl border border-secondary/10 shadow-xl">
            <Quote className="w-12 h-12 text-primary/20 mb-8" />
            {item.testimonial?.quote && (
              <blockquote className="text-2xl md:text-4xl font-serif italic text-foreground mb-8 leading-relaxed">
                {item.testimonial.quote}
              </blockquote>
            )}
            <div className="flex flex-col items-center">
              {item.testimonial?.avatar && (
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <Image
                    src={
                      item.testimonial.avatar.startsWith("http")
                        ? item.testimonial.avatar
                        : `/${item.testimonial.avatar.replace(/^\//, "")}`
                    }
                    alt={item.testimonial.author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              )}
              <cite className="not-italic">
                <span className="block text-lg font-black uppercase tracking-widest text-primary">
                  {item.testimonial?.author}
                </span>
                {item.testimonial?.role && (
                  <span className="text-sm text-secondary uppercase tracking-widest opacity-60">
                    {item.testimonial.role}
                  </span>
                )}
              </cite>
            </div>
          </div>
        );

      case "blocks":
        return (
          <div className="w-full min-h-[300px] flex items-center justify-center p-8 bg-surface rounded-3xl border border-secondary/10 shadow-xl">
            <div className="flex flex-col">
              {item.blocks &&
                item.blocks.map((block: any, index: number) => (
                  <BlockRenderer key={index} block={block} />
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            {renderItem(items[currentIndex])}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentIndex ? "w-8 bg-primary" : "bg-white/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
