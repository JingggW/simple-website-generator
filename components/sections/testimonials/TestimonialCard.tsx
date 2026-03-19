import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
  variant?: "default" | "featured";
}

export const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  className,
  variant = "default",
}: TestimonialCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-8 md:p-10 rounded-[2rem] transition-all duration-500 group",
        isFeatured 
          ? "bg-primary/5 border-none shadow-none" 
          : "bg-surface border border-secondary/10 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      <div className="mb-8">
        <Quote 
          className={cn(
            "w-10 h-10 mb-6 transition-colors",
            isFeatured ? "text-primary/20" : "text-primary/10 group-hover:text-primary/30"
          )} 
        />
        <p className={cn(
          "leading-relaxed italic font-medium text-foreground",
          isFeatured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
        )}>
          “{quote}”
        </p>
      </div>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-secondary/10">
        {avatar ? (
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-500">
            <Image
              src={avatar.startsWith('http') ? avatar : `/${avatar.replace(/^\//, '')}`}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shadow-inner">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-black uppercase tracking-widest text-foreground text-sm md:text-base">
            {author}
          </p>
          {role && (
            <p className="text-xs font-bold text-secondary/60 uppercase tracking-tighter mt-0.5">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
