import { ContentSection } from "@/types";

export const Content = ({
  content,
}: {
  content: ContentSection["content"];
}) => {
  const isImageRight = content.layout === "image-right";

  return (
    <section className="py-24 overflow-hidden bg-gray-50 px-4">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div
          className={`grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-2 lg:items-start ${
            isImageRight ? "" : "lg:grid-flow-col-dense" // Swap order if image left
          }`}
        >
          {/* Text Side */}
          <div
            className={`px-4 lg:px-0 lg:pt-4 ${
              isImageRight ? "" : "lg:col-start-2"
            }`}
          >
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {content.text}
              </p>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <img
              src={content.image}
              alt={content.alt}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
