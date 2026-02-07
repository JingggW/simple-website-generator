import { HeroSection } from "@/lib/schema";
import Link from "next/link";

export const HeroSimple = ({ content }: { content: HeroSection["props"] }) => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {content.headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8">{content.subheadline}</p>
        {content.ctaLink && (
          <Link
            href={content.ctaLink}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            {content.ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};
