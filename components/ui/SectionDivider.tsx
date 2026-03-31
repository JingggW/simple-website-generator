"use client";

import React from "react";

interface SectionDividerProps {
  type: "none" | "wave" | "slant" | "curve" | "step" | "tilt" | "triangle" | "book" | "fan";
  color: "default" | "muted" | "surface" | "primary" | "secondary" | "accent";
  height: "sm" | "md" | "lg";
  flip?: boolean;
  invert?: boolean;
  position: "top" | "bottom";
}

const colorClasses: Record<string, string> = {
  default: "fill-background",
  muted: "fill-muted",
  surface: "fill-surface",
  primary: "fill-primary",
  secondary: "fill-secondary",
  accent: "fill-accent",
};

const heights: Record<string, string> = {
  sm: "h-8 md:h-12",
  md: "h-16 md:h-24",
  lg: "h-24 md:h-40",
};

export const SectionDivider: React.FC<SectionDividerProps> = ({
  type,
  color,
  height,
  flip = false,
  invert = false,
  position,
}) => {
  if (type === "none") return null;

  const fillClass = colorClasses[color];
  const heightClass = heights[height];
  
  const rotation = position === "bottom" ? "rotate-180" : "";
  const flipClass = flip ? "-scale-x-100" : "";
  const invertClass = invert ? "-scale-y-100" : "";

  // SVG Paths for different types
  const renderPath = () => {
    switch (type) {
      case "wave":
        return (
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
        );
      case "slant":
        return (
          <path d="M0,0 L1440,100 L1440,100 L0,100 Z" />
        );
      case "curve":
        return (
          <path d="M0,0 C720,100 720,100 1440,0 L1440,100 L0,100 Z" />
        );
      case "tilt":
        return (
          <path d="M0,100 L1440,0 L1440,100 Z" />
        );
      case "triangle":
        return (
          <path d="M0,0 L720,100 L1440,0 L1440,100 L0,100 Z" />
        );
      case "step":
        return (
          <path d="M0,0 L720,0 L720,50 L1440,50 L1440,100 L0,100 Z" />
        );
      case "book":
        return (
          <path d="M0,0 L720,40 L1440,0 L1440,100 L0,100 Z" />
        );
      case "fan":
        return (
          <path d="M0,100 C180,100 360,0 720,0 C1080,0 1260,100 1440,100 Z" />
        );
      default:
        return null;
    }
  };

  const containerClasses = [
    "absolute left-0 w-full overflow-hidden leading-[0] pointer-events-none z-10",
    position === "top" ? "top-0 -translate-y-[99%]" : "bottom-0 translate-y-[99%]",
    heightClass,
    rotation,
    flipClass,
    invertClass,
  ].join(" ");

  return (
    <div className={containerClasses}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`relative block w-full h-full ${fillClass}`}
      >
        {renderPath()}
      </svg>
    </div>
  );
};
