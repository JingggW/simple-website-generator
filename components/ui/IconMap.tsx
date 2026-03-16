import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

export const IconMap: React.FC<IconProps> = ({ name, className }) => {
  if (!name) return <LucideIcons.HelpCircle className={className} />;

  // Normalize name to PascalCase (e.g., 'check' -> 'Check', 'map-pin' -> 'MapPin')
  const pascalName = name
    .split(/[-_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  const IconComponent =
    (LucideIcons as any)[pascalName] ||
    (LucideIcons as any)[name] ||
    LucideIcons.HelpCircle;

  return <IconComponent className={className} />;
};
