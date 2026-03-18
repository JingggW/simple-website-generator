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
  const variant = config.variant || "default";

  const isTransparent = variant === "transparent";
  const isCentered = variant === "centered";
  const isSplit = variant === "split";

  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    isTransparent
      ? "bg-transparent border-none py-4"
      : "sticky border-b border-secondary/10 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 h-16"
  );

  const containerClasses = cn(
    "container mx-auto flex items-center px-4 h-full",
    isCentered || isSplit ? "justify-between" : "justify-between"
  );

  // For Split Layout: Divide links into two groups
  const midPoint = Math.ceil(config.links.length / 2);
  const leftLinks = isSplit ? config.links.slice(0, midPoint) : [];
  const rightLinks = isSplit ? config.links.slice(midPoint) : [];

  const NavItem = ({ item, index }: { item: any; index: number }) => {
    if (item.type === "dropdown") {
      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-secondary/10 focus:bg-secondary/10">
            {item.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-20 gap-3 p-4 md:w-40 md:grid-cols-1 lg:w-60 bg-background border border-secondary/10 rounded-md shadow-lg">
              {item.items.map((subItem: any, subIndex: number) => (
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

    return (
      <NavigationMenuItem key={index}>
        <NavigationMenuLink asChild>
          <Link
            href={item.href || "#"}
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent text-foreground hover:bg-secondary/10 focus:bg-secondary/10"
            )}
          >
            {item.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* LEFT SECTION (Split Links or Logo) */}
        <div className="flex flex-1 items-center justify-start">
          {isSplit ? (
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {leftLinks.map((item, index) => (
                    <NavItem item={item} key={index} index={index} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : !isCentered ? (
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold inline-block text-xl text-foreground">
                {config.title}
              </span>
            </Link>
          ) : null}
        </div>

        {/* CENTER SECTION (Logo for Split/Centered or Main Nav for Default) */}
        <div className="flex flex-1 items-center justify-center">
          {isSplit || isCentered ? (
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block text-2xl text-foreground tracking-tighter uppercase">
                {config.title}
              </span>
            </Link>
          ) : (
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {config.links.map((item, index) => (
                    <NavItem item={item} key={index} index={index} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </div>

        {/* RIGHT SECTION (Split Links + CTA or just CTA) */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSplit && (
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {rightLinks.map((item, index) => (
                    <NavItem item={item} key={index} index={index} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
          
          <div className="hidden md:flex items-center">
            {config.cta && (
              <Link
                href={config.cta.href || "#"}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-background hover:bg-primary/90 h-10 px-6 py-2 shadow-lg"
              >
                {config.cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:bg-secondary/10 rounded-md">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{config.title}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {config.links.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href || (item as any).items?.[0]?.href || "#"}
                      className="text-lg font-medium border-b border-secondary/10 pb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {config.cta && (
                    <Link
                      href={config.cta.href || "#"}
                      className="mt-4 bg-primary text-background p-3 text-center rounded-md font-bold"
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
      </div>
    </header>
  );
};
