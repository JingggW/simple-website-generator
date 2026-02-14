"use client";

import Link from "next/link";
import { WebsiteConfig } from "@/lib/schema";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type NavbarProps = {
  config: WebsiteConfig["header"];
};

export const Navbar = ({ config }: NavbarProps) => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo/Brand Title */}
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl text-foreground">
              {config.title}
            </span>
          </Link>
        </div>

        {/* 2. Main Navigation */}
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {config.links.map((item, index) => {
                // CASE A: It's a Dropdown
                if (item.type === "dropdown") {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-secondary/10 focus:bg-secondary/10">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-400px gap-3 p-4 md:w-500px md:grid-cols-2 lg:w-600px bg-background border border-secondary/10 rounded-md shadow-lg">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-primary focus:bg-secondary/10 focus:text-primary"
                                >
                                  <div className="text-sm font-medium leading-none text-foreground">
                                    {subItem.label}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                // CASE B: It's a simple Link
                return (
                  <NavigationMenuItem key={index}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-foreground hover:bg-secondary/10 focus:bg-secondary/10",
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 3. CTA Button */}
        <div className="flex items-center justify-end space-x-4">
          {config.cta && (
            <Link
              href={config.cta.href}
              className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-background hover:bg-primary/90 h-10 px-4 py-2"
            >
              {config.cta.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
