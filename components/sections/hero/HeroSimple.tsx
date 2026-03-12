import { HeroSection } from "@/lib/schema";
import Link from "next/link";

type HeroSimpleProps = HeroSection["props"];

export const HeroSimple = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
}: HeroSimpleProps) => {
  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h1>
        {subheadline && (
          <p className="text-xl md:text-2xl mb-8 opacity-90">{subheadline}</p>
        )}

        {ctaText && (
          <Link
            href={ctaLink || "#"}
            className="bg-accent text-on-accent font-semibold px-6 py-3 rounded-md hover:opacity-90 transition inline-block"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};
