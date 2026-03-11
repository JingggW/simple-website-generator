import { TestimonialsSection } from "@/lib/schema";
import { Quote } from "lucide-react";
import Image from "next/image";

type TestimonialsProps = TestimonialsSection["props"];

export const TestimonialsGrid = ({
  title,
  items,
  subtitles,
}: TestimonialsProps) => {
  return (
    <section>
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {subtitles && (
            <p className="mt-4 text-lg text-muted-foreground">{subtitles}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 rounded-2xl bg-secondary/10 border border-secondary/20 hover:border-primary/20 transition-colors"
            >
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-lg leading-relaxed text-foreground italic">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-secondary/20">
                {item.avatar ? (
                  <Image
                    src={item.avatar.startsWith('http') ? item.avatar : `/${item.avatar.replace(/^\//, '')}`}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover bg-secondary"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{item.author}</p>
                  {item.role && (
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
