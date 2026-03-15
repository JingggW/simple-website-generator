import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

export const IconMap: React.FC<IconProps> = ({ name, className }) => {
  // Normalize name to PascalCase (e.g., 'check' -> 'Check')
  const pascalName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const IconComponent = (LucideIcons as any)[pascalName] || LucideIcons.HelpCircle;

  return <IconComponent className={className} />;
};
