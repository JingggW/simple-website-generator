import { HeroSection } from "@/lib/schema";
import Link from "next/link";

type HeroSimpleProps = HeroSection["props"];

export const HeroSimple = ({
  hookLine,
  coreValueProp,
  subText,
  primaryCTA,
  ctaLink,
}: HeroSimpleProps) => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">
            {hookLine}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
            {coreValueProp}
          </h1>
          <p className="text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
            {subText}
          </p>
          {primaryCTA && (
            <div className="pt-8">
              <Link
                href={ctaLink || "#"}
                className="inline-flex items-center px-12 py-5 text-sm font-black uppercase tracking-[0.3em] text-on-primary bg-primary rounded-full hover:scale-105 transition-all shadow-2xl"
              >
                {primaryCTA}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
