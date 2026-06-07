"use client";

import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { WebsiteConfig } from "@/lib/schema";

type FooterProps = {
  config: WebsiteConfig["footer"];
};

const SocialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export const Footer = ({ config }: FooterProps) => {
  const bgType = config.background || "default";

  const bgClass = {
    default: "bg-background text-foreground border-t border-secondary/20",
    muted: "bg-muted text-foreground border-t border-secondary/20",
    surface: "bg-surface text-foreground border-t border-secondary/20",
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary text-on-secondary",
  }[bgType] || "bg-background text-foreground border-t border-secondary/20";

  const isDarkBg = bgType === "primary" || bgType === "secondary";

  const headingClass = isDarkBg ? "text-current" : "text-foreground";
  const textMutedClass = isDarkBg ? "text-current/70" : "text-muted-foreground";
  const borderClass = isDarkBg ? "border-t border-current/10" : "border-t border-secondary/20";
  const hoverClass = isDarkBg ? "hover:text-current hover:opacity-100 transition-opacity" : "hover:text-primary transition-colors";
  const socialHoverClass = isDarkBg ? "text-current/70 hover:text-current transition-colors" : "text-muted-foreground hover:text-primary transition-colors";

  return (
    <footer className={`w-full py-12 text-sm ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-lg font-bold ${headingClass}`}>
              {config.brand.title}
            </h3>
            {config.brand.description && (
              <p className={`${textMutedClass} max-w-xs leading-relaxed`}>
                {config.brand.description}
              </p>
            )}
          </div>

          {/* Dynamic Columns Links */}
          {config.columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h4 className={`font-semibold ${headingClass}`}>{col.title}</h4>
              <ul className={`flex flex-col gap-2 ${textMutedClass}`}>
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href || "#"}
                      className={hoverClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 flex flex-col items-center justify-between gap-4 ${borderClass} pt-8 md:flex-row`}>
          <p className={textMutedClass}>{config.copyright}</p>

          {config.social && (
            <div className="flex gap-4">
              {config.social.map((item, index) => {
                const Icon = SocialIconMap[item.platform];
                return (
                  <Link
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialHoverClass}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.platform}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
