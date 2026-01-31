import {
  Wrench,
  Droplets,
  Flame,
  Truck,
  Phone,
  HelpCircle,
} from "lucide-react";

export const IconMap = {
  Wrench: Wrench,
  Droplets: Droplets,
  Flame: Flame,
  Truck: Truck,
  Phone: Phone,
  HelpCircle: HelpCircle,
};

export type IconName = keyof typeof IconMap;
