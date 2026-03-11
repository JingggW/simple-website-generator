import { ContentSection } from "@/lib/schema";

type ContentProps = ContentSection["props"];

export const ContentSimple = ({ title, body }: ContentProps) => {
  return (
    <section className="py-24 bg-background px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-10">
          {title}
        </h2>
        <div className="mt-6 text-lg leading-8 text-secondary whitespace-pre-line">
          {body}
        </div>
      </div>
    </section>
  );
};
