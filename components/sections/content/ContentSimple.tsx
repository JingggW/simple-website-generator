import { ContentSection } from "@/lib/schema";
import { cn } from "@/lib/utils";

type ContentProps = ContentSection["props"];

export const ContentSimple = ({ title, body, variant = "simple" }: any) => {
  const isMulti = variant === "multi-column";

  return (
    <section>
      <div className={cn(
        "mx-auto",
        isMulti ? "max-w-7xl px-6 lg:px-8" : "max-w-3xl px-6"
      )}>
        <h2 className={cn(
          "font-black text-foreground mb-12 uppercase tracking-tighter leading-none",
          isMulti ? "text-5xl md:text-8xl border-b-4 border-primary pb-8" : "text-3xl md:text-4xl"
        )}>
          {title}
        </h2>
        
        <div className={cn(
          "text-lg leading-relaxed text-secondary whitespace-pre-wrap font-medium",
          isMulti ? "md:columns-2 lg:columns-3 gap-12 [column-fill:balance]" : ""
        )}>
          {body}
        </div>
      </div>
    </section>
  );
};
