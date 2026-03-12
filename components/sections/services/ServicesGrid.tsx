import { ServicesSection } from "@/lib/schema";
import { IconMap, IconName } from "@/components/ui/IconMap";

// Extract the specific props type from the Zod Schema
type ServicesProps = ServicesSection["props"];

export const ServicesGrid = ({ title, description, items }: ServicesProps) => {
  return (
    <section id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-secondary">{description}</p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            // 1. Safe Lookup: Cast the string to IconName to satisfy TypeScript
            const IconComponent = IconMap[item.icon as IconName];

            return (
              <div key={index} className="pt-6">
                {/* Card Background: bg-gray-50 -> bg-secondary/5 
                   This gives the card a very subtle tint of the secondary brand color 
                */}
                <div className="flow-root rounded-2xl bg-secondary/5 px-6 pb-8 h-full hover:shadow-md transition-shadow duration-300">
                  <div className="-mt-6">
                    <div>
                      {/* Icon Background: bg-blue-600 -> bg-primary */}
                      <span className="inline-flex items-center justify-center rounded-xl bg-primary p-3 shadow-lg">
                        {/* 2. Safety Check */}
                        {IconComponent ? (
                          <IconComponent
                            // Icon Color: text-white -> text-on-primary (for contrast on primary)
                            className="h-6 w-6 text-on-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <div className="h-6 w-6 bg-on-primary/20" />
                        )}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
