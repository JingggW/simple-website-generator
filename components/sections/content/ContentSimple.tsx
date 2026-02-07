import { ContentSection } from "@/lib/schema";

type ContentProps = ContentSection["props"];

export const ContentSimple = ({ title, body }: ContentProps) => {
  return (
    <section className="py-24 bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
          {title}
        </h2>

        {/* whitespace-pre-line preserves line breaks from the LLM's text output */}
        <div className="mt-6 text-lg leading-8 text-gray-600 whitespace-pre-line">
          {body}
        </div>
      </div>
    </section>
  );
};
