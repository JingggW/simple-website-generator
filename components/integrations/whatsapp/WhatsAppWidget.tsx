"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhatsAppWidgetProps {
  config: {
    whatsappNumber?: string;
    whatsappMessage?: string;
  };
}

export default function WhatsAppWidget({ config }: WhatsAppWidgetProps) {
  const { whatsappNumber, whatsappMessage } = config;

  // If no number is configured, don't render the widget
  if (!whatsappNumber) return null;

  // Clean phone number (remove spaces, dashes, + signs)
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");

  // Construct WhatsApp URL
  const queryParams = new URLSearchParams();
  if (whatsappMessage) {
    queryParams.set("text", whatsappMessage);
  }
  const waUrl = `https://wa.me/${cleanNumber}${whatsappMessage ? `?${queryParams.toString()}` : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 group cursor-pointer"
    >
      {/* Floating Tooltip Bubble */}
      <div className="absolute right-16 bottom-2 opacity-0 scale-90 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 ease-out bg-background border border-secondary/10 px-4 py-2 rounded-2xl shadow-xl whitespace-nowrap hidden sm:block">
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">
          Chat with us! 💬
        </p>
      </div>

      {/* Pulse Notification Ring */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 z-50">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-background"></span>
      </span>

      {/* Main Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out border-2 border-white/20"
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp Recognizable Inline SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path
            fillRule="evenodd"
            d="M1.5 10.5a10.5 10.5 0 1 1 17.004 8.244l-1.285 3.856a.75.75 0 0 1-.948.474l-3.855-1.285A10.469 10.469 0 0 1 1.5 10.5ZM12 3a7.5 7.5 0 0 0-6.195 11.725.75.75 0 0 1 .1.439l-.612 1.838 1.838-.612a.75.75 0 0 1 .439.1A7.5 7.5 0 1 0 12 3Zm3.308 10.375c.125.2.191.438.191.68 0 .546-.356 1.026-.87 1.2a1.72 1.72 0 0 1-1.393-.197c-.383-.243-.996-.678-1.578-1.26a12.723 12.723 0 0 1-1.578-1.578 12.875 12.875 0 0 1-1.26-1.578 1.718 1.718 0 0 1-.197-1.393.75.75 0 0 1 .082-.206c.2-.32.54-.52.918-.52h.165c.135 0 .265.05.365.145l1.002 1.002c.1.1.145.235.145.365v.165c0 .378-.2.697-.52.918a.747.747 0 0 1-.206.082c-.066.02-.132.062-.178.118a7.228 7.228 0 0 0 .89 1.15c.34.34.72.64 1.15.89a.256.256 0 0 0 .118-.178.749.749 0 0 1 .082-.206.75.75 0 0 1 .918-.52h.165c.135 0 .265.05.365.145l1.002 1.002Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </motion.div>
  );
}
