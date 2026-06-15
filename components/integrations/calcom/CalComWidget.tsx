"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

interface CalComWidgetProps {
  calLink: string;
  displayType?: "inline" | "popup";
  ctaLabel?: string;
  title?: string;
  description?: string;
  theme?: "light" | "dark" | "auto";
}

export default function CalComWidget({
  calLink,
  displayType = "inline",
  ctaLabel = "Book Appointment",
  title,
  description,
  theme = "auto",
}: CalComWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  // Clean the calLink (strip full URLs if pasted, and remove leading/trailing slashes)
  const cleanLink = calLink
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?cal\.com\//i, "")
    .replace(/^\/|\/$/g, "");
  
  // Construct the iframe URL
  const queryParams = new URLSearchParams();
  queryParams.set("embed", "1");
  if (theme !== "auto") {
    queryParams.set("theme", theme);
  }
  const iframeUrl = `https://cal.com/${cleanLink}?${queryParams.toString()}`;

  const renderIframe = () => (
    <iframe
      key={key}
      src={iframeUrl}
      title="Cal.com Booking Widget"
      className="w-full h-full border-0 rounded-2xl"
      style={{ minHeight: "600px" }}
      allow="geolocation; microphone; camera; player-presentation; fullscreen; autoplay; encrypted-media; picture-in-picture"
    />
  );

  if (displayType === "inline") {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto mb-8">
            {title && (
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-secondary/70 text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="bg-surface border border-secondary/10 rounded-3xl p-2 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          {renderIframe()}
        </div>
        <div className="flex justify-end mt-2 px-2">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="text-xs font-black uppercase tracking-widest text-primary hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1"
          >
            ↺ Reset Calendar View
          </button>
        </div>
      </div>
    );
  }

  // Popup / Modal Variant
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {(title || description) && (
        <div className="text-center max-w-2xl mx-auto mb-6">
          {title && (
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-secondary/70 text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 bg-primary text-on-primary font-black uppercase tracking-widest text-sm px-8 py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <Calendar className="w-5 h-5" />
        {ctaLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-background border border-secondary/20 w-full max-w-4xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-secondary/10 bg-surface/50">
                <span className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {ctaLabel}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setKey((prev) => prev + 1)}
                    className="text-xs font-black uppercase tracking-widest text-primary hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1"
                  >
                    ↺ Reset View
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors text-foreground/80 hover:text-foreground cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Content */}
              <div className="flex-1 bg-surface p-2 relative">
                {renderIframe()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
