import React from "react";
import dynamic from "next/dynamic";

interface CustomSectionProps {
  variant: string;    // The filename of the component inside config/components/
  props?: Record<string, any>;
}

export const CustomSection = ({ variant, props = {} }: CustomSectionProps) => {
  const DynamicComponent = dynamic(
    () =>
      import(`@/config/components/${variant}`).catch((err) => {
        console.error("Failed to load custom component:", err);
        return () => (
          <div className="p-6 border border-dashed border-red-500 rounded-xl text-red-500 max-w-5xl mx-auto my-8">
            ❌ Custom component <strong>{variant}</strong> was not found in:
            <code className="block mt-2 text-xs font-mono">
              config/components/{variant}.tsx
            </code>
          </div>
        );
      }),
    {
      ssr: true,
      loading: () => (
        <div className="animate-pulse h-32 bg-secondary/5 rounded-xl max-w-5xl mx-auto my-8" />
      ),
    }
  );

  return <DynamicComponent {...props} />;
};
