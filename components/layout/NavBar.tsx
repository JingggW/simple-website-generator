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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
  config: WebsiteConfig["header"];
};

export const Navbar = ({ config }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        {/* Logo/Brand Title */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block text-xl text-foreground">
              {config.title}
            </span>
          </Link>
        </div>

        {/* 2. Main Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
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
                        <ul className="grid w-20 gap-3 p-4 md:w-40 md:grid-cols-1 lg:w-60 bg-background border border-secondary/10 rounded-md shadow-lg">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href || "#"}
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
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href || "#"}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-foreground hover:bg-secondary/10 focus:bg-secondary/10",
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 3. CTA Button */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          {config.cta && (
            <Link
              href={config.cta.href || "#"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-background hover:bg-primary/90 h-10 px-4 py-2"
            >
              {config.cta.label}
            </Link>
          )}
        </div>

        {/* 4. Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground hover:bg-secondary/10 rounded-md">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 sm:w-100 border-l border-secondary/20"
            >
              <SheetHeader>
                <SheetTitle className="text-left">{config.title}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {config.links.map((item, index) => {
                  if (item.type === "dropdown") {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <span className="font-semibold text-foreground">
                          {item.label}
                        </span>
                        <div className="flex flex-col gap-2 pl-4 border-l border-secondary/20 ml-1">
                          {item.items.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href || "#"}
                              className="text-secondary hover:text-primary transition-colors py-1"
                              onClick={() => setIsOpen(false)} // Close menu on click
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      href={item.href || "#"}
                      className="text-foreground font-medium hover:text-primary transition-colors py-2 block border-b border-secondary/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {config.cta && (
                  <Link
                    href={config.cta.href || "#"}
                    className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-background hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {config.cta.label}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
