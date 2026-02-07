import React from "react";
import { ArrowRight } from "lucide-react";

interface HeroSplitProps {
  headline: string;
  subheadline?: string;
  ctaText: string;
  imageName?: string;
}

export const HeroSplit = ({
  headline,
  subheadline,
  ctaText,
  imageName,
}: HeroSplitProps) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {headline}
            </h1>

            {subheadline && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {subheadline}
              </p>
            )}

            <button className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              {ctaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Image Column */}
          <div className="flex-1 w-full">
            {imageName ? (
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={`/${imageName}`}
                  alt={headline}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              // Fallback placeholder if LLM didn't pick an image
              <div className="w-full aspect-4/3 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                No Image Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
