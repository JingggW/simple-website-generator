import { HeroSection } from "@/lib/schema";
import Link from "next/link";

export const HeroSimple = ({ content }: { content: HeroSection["props"] }) => {
  return (
    // bg-blue-600 -> bg-primary
    // text-white -> text-background (This ensures high contrast on the primary color)
    <section className="bg-primary text-background py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {content.headline}
        </h1>
        {/* Added opacity-90 for slight visual hierarchy between head/subhead */}
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {content.subheadline}
        </p>

        {content.ctaLink && (
          <Link
            href={content.ctaLink}
            className="bg-background text-primary font-semibold px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            {content.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};
