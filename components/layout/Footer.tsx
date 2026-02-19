"use client";

import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { WebsiteConfig } from "@/lib/schema";

type FootProps = {
  config: WebsiteConfig["footer"];
};

const SocialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export const Footer = ({ config }: FootProps) => {
  return (
    <footer className="w-full border-t border-secondary/20 bg-background py-12 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-foreground">
              {config.brand.title}
            </h3>
            {config.brand.description && (
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                {config.brand.description}
              </p>
            )}
          </div>

          {/* Dynamic Columns Links */}
          {config.columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h4 className="font-semibold text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-secondary/20 pt-8 md:flex-row">
          <p className="text-muted-foreground">{config.copyright}</p>

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
                    className="text-muted-foreground hover:text-primary transition-colors"
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
