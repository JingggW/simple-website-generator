import React from "react";
import { customComponents } from "@/config/components";

interface CustomSectionProps {
  variant: string;    // The key of the component inside customComponents registry
  props?: Record<string, any>;
}

export const CustomSection = ({ variant, props = {} }: CustomSectionProps) => {
  const Component = customComponents[variant];

  if (!Component) {
    return (
      <div className="p-6 border border-dashed border-red-500 rounded-xl text-red-500 max-w-5xl mx-auto my-8">
        ❌ Custom component <strong>{variant}</strong> was not registered in:
        <code className="block mt-2 text-xs font-mono">
          config/components/index.ts
        </code>
      </div>
    );
  }

  return <Component {...props} />;
};
