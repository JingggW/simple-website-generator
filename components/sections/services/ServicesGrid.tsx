import { ServicesSection } from "@/lib/schema";
import { IconMap, IconName } from "@/components/ui/IconMap";

// Extract the specific props type from the Zod Schema
type ServicesProps = ServicesSection["props"];

export const ServicesGrid = ({ title, description, items }: ServicesProps) => {
  return (
    <section id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-foreground sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-[13px] uppercase tracking-widest text-secondary font-medium">{description}</p>
            )}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const IconComponent = item.icon ? IconMap[item.icon as IconName] : null;

            return (
              <div key={index} className="group flex flex-col h-full">
                {/* Image/Icon Box */}
                <div className="relative aspect-square overflow-hidden mb-6 shadow-lg">
                  {item.image ? (
                    <Image
                      src={item.image.startsWith('http') ? item.image : `/${item.image.replace(/^\//, '')}`}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                      {IconComponent ? (
                        <IconComponent className="h-12 w-12 text-primary" />
                      ) : (
                        <div className="h-12 w-12 bg-primary/20 rounded-full" />
                      )}
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-black uppercase tracking-[0.15em] text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-foreground/70 font-medium mb-6 flex-1">
                    {item.description}
                  </p>
                  
                  {(item.ctaLink || item.ctaText) && (
                    <div>
                      <NextLink
                        href={item.ctaLink || "#"}
                        className="inline-block border border-foreground/20 px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground hover:text-background"
                      >
                        {item.ctaText || "Explore"}
                      </NextLink>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
