import { ServicesSection } from "@/types";
import { IconMap } from "../IconMap";

export const Services = ({
  content,
}: {
  content: ServicesSection["content"];
}) => {
  return (
    <section className="py-24 bg-white px-4" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          {content.description && (
            <p className="mt-4 text-lg text-gray-500">{content.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const IconComponent = IconMap[item.icon];

            return (
              <div key={index} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center rounded-md bg-(--primary) p-3 shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
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
