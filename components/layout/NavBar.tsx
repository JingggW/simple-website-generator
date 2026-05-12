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
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

type NavbarProps = {
  config: WebsiteConfig["header"];
};

// --- SUB-COMPONENTS (Declared outside to prevent re-render errors) ---

const Logo = ({ title }: { title: string }) => (
  <Link href="/" className="flex items-center space-x-2 group">
    <span className="font-black text-xl md:text-2xl text-foreground tracking-tighter uppercase transition-transform group-hover:scale-105">
      {title}
    </span>
  </Link>
);

const NavItem = ({ item, index, mounted }: { item: any; index: number; mounted: boolean }) => {
  if (item.type === "dropdown") {
    return (
      <NavigationMenuItem key={index}>
        <NavigationMenuTrigger 
          onClick={() => {
            if (mounted && item.href) window.location.href = item.href;
          }}
          className="bg-transparent text-foreground/80 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[11px]"
        >
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-50 gap-2 p-4 bg-background border border-secondary/10 rounded-xl shadow-2xl">
            {item.items.map((subItem: any, subIndex: number) => (
              <li key={subIndex}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.href || "#"}
                    className="block p-3 rounded-lg hover:bg-secondary/5 hover:text-primary transition-all"
                  >
                    <div className="text-sm font-bold uppercase tracking-wider">
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
            "bg-transparent text-foreground/80 hover:text-primary font-bold uppercase tracking-widest text-[11px] transition-colors",
          )}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// --- MAIN COMPONENT ---

export const Navbar = ({ config }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const variant = config.variant || "default";
  const isTransparent = variant === "transparent";
  const isIsland = variant === "island";
  const isCentered = variant === "centered";
  const isSplit = variant === "split";
  const isMinimalCenter = variant === "minimal-center";
  const isSideDrawer = variant === "side-drawer";
  const isGlassFloating = variant === "glass-floating";

  // Header Base Classes
  const headerClasses = cn(
    "z-50 w-full transition-all duration-500 ease-in-out",
    isIsland || isGlassFloating
      ? "fixed top-4 px-4 pointer-events-none"
      : isTransparent
        ? "fixed top-0"
        : "sticky top-0",
    isTransparent && (!mounted || !isScrolled)
      ? "bg-transparent border-transparent py-4"
      : isMinimalCenter || isCentered
        ? "bg-background border-b border-secondary/10 pt-2"
        : "bg-background/80 backdrop-blur-lg border-b border-secondary/10 shadow-sm py-0",
    mounted && isScrolled && !isMinimalCenter && !isCentered
      ? "h-16"
      : isMinimalCenter || isCentered
        ? "h-auto"
        : "h-20",
  );

  // Inner Container Classes (The actual bar)
  const navContainerClasses = cn(
    "mx-auto transition-all duration-500 h-full",
    isIsland
      ? "container max-w-5xl bg-background/90 backdrop-blur-xl border border-secondary/20 rounded-full px-8 shadow-2xl pointer-events-auto flex items-center"
      : isGlassFloating
        ? "container max-w-7xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-10 shadow-2xl pointer-events-auto flex items-center"
        : "container flex items-center px-4",
  );

  const midPoint = Math.ceil(config.links.length / 2);
  const leftLinks = isSplit ? config.links.slice(0, midPoint) : [];
  const rightLinks = isSplit ? config.links.slice(midPoint) : [];

  return (
    <>
      {/* 1. Announcement Bar */}
      {config.announcement && (
        <div
          className={cn(
            "z-60 w-full bg-primary py-2 text-center",
            isIsland || isTransparent || isGlassFloating
              ? "fixed top-0"
              : "relative",
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-primary">
            {config.announcement}
          </p>
        </div>
      )}

      <header
        className={cn(
          headerClasses,
          config.announcement && (isTransparent || isGlassFloating) && "mt-8",
        )}
      >
        <div className={navContainerClasses}>
          {/* LEFT SECTION */}
          <div className="flex flex-1 items-center justify-start">
            {isSplit ? (
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  {leftLinks.map((item, idx) => (
                    <NavItem item={item} key={idx} index={idx} mounted={mounted} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            ) : !isCentered && !isMinimalCenter ? (
              <Logo title={config.title} />
            ) : null}
          </div>

          {/* CENTER SECTION */}
          <div className="flex items-center justify-center px-8">
            {isSplit || isCentered || isMinimalCenter ? (
              <div className="flex flex-col items-center gap-2">
                <Logo title={config.title} />
                {(isMinimalCenter || isCentered) && (
                  <NavigationMenu className="hidden md:block pt-2">
                    <NavigationMenuList className="gap-6">
                      {config.links.map((item, idx) => (
                        <NavItem item={item} key={idx} index={idx} mounted={mounted} />
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                )}
              </div>
            ) : (
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList className="gap-2">
                  {config.links.map((item, idx) => (
                    <NavItem item={item} key={idx} index={idx} mounted={mounted} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-1 items-center justify-end space-x-6">
            {isSplit && (
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  {rightLinks.map((item, idx) => (
                    <NavItem item={item} key={idx} index={idx} mounted={mounted} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {!isSideDrawer && config.cta && (
              <Link
                href={config.cta.href || "#"}
                className="hidden md:inline-flex items-center justify-center rounded-full bg-primary border border-primary/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-on-primary shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
              >
                {config.cta.label}
              </Link>
            )}

            {/* Mobile Menu (And Desktop SideDrawer) */}
            <div className={cn(isSideDrawer ? "block" : "md:hidden")}>
              {mounted && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button className="p-2 text-foreground hover:bg-secondary/10 rounded-full transition-colors">
                      <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader className="mb-12 text-left">
                      <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
                        {config.title}
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-6">
                      {config.links.map((item, idx) => {
                        if (item.type === "dropdown") {
                          return (
                            <div key={idx} className="flex flex-col gap-4">
                              {/* Dropdown Label as a link if href exists */}
                              <Link
                                href={item.href || "#"}
                                className="text-3xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-all"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </Link>
                              {/* Sub-links */}
                              <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
                                {item.items.map((sub: any, subIdx: number) => (
                                  <Link
                                    key={subIdx}
                                    href={sub.href || "#"}
                                    className="text-xl font-bold uppercase tracking-tight text-secondary hover:text-primary transition-all"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={idx}
                            href={item.href || "#"}
                            className="text-3xl font-black uppercase tracking-tighter hover:text-primary transition-all hover:pl-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                      {config.cta && (
                        <Link
                          href={config.cta.href || "#"}
                          className="mt-8 bg-primary text-on-primary text-center p-5 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform"
                          onClick={() => setIsOpen(false)}
                        >
                          {config.cta.label}
                        </Link>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
