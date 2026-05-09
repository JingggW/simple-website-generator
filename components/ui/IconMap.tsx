import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

export const IconMap: React.FC<IconProps> = ({ name, className }) => {
  if (!name) return <LucideIcons.HelpCircle className={className} />;

  // 1. Try exact match first (in case AI provided correct PascalCase)
  if ((LucideIcons as any)[name]) {
    const ExactIcon = (LucideIcons as any)[name];
    return <ExactIcon className={className} />;
  }

  // 2. Try normalized match (e.g., 'check-circle' -> 'CheckCircle')
  const pascalName = name
    .split(/[-_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  const IconComponent =
    (LucideIcons as any)[pascalName] ||
    LucideIcons.HelpCircle;

  return <IconComponent className={className} />;
};
