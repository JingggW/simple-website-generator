import { WebsiteConfig } from "../../lib/schema";

/**
 * INTEGRITY CHECKER
 */

export interface BrokenLink {
  location: "header" | "footer" | string; // string is "pagePath:sectionId"
  label: string;
  currentHref?: string;
  reason: string;
}

export interface IntegrityReport {
  orphans: string[];
  deadLinks: string[]; // Still keep for simple reporting
  brokenLinks: BrokenLink[]; 
  isValid: boolean;
}

export function run_integrity_check(config: WebsiteConfig): IntegrityReport {
  const pagePaths = Object.keys(config.pages);
  const brokenLinks: BrokenLink[] = [];
  
  const validateLink = (href: string | undefined, label: string, location: string) => {
    if (!href || href === "#" || href === "") {
      brokenLinks.push({ location, label, currentHref: href, reason: "Missing or placeholder link" });
      return;
    }
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    
    const [path, anchor] = href.split('#');
    let targetPath = path === "" ? "/" : path;
    
    // Auto-fix: if they forgot the leading slash but the path exists with one
    if (!targetPath.startsWith("/") && config.pages[`/${targetPath}`]) {
      // This is technically valid for our engine but we should probably encourage leading slashes
      targetPath = `/${targetPath}`;
    }

    const targetPage = config.pages[targetPath];

    if (!targetPage) {
      brokenLinks.push({ location, label, currentHref: href, reason: `Path "${targetPath}" does not exist` });
      return;
    }

    if (anchor && !targetPage.sectionOrder.includes(anchor)) {
      brokenLinks.push({ location, label, currentHref: href, reason: `Anchor "#${anchor}" not found on page "${targetPath}"` });
    }
  };

  // 1. Check Header
  config.header.links?.forEach(l => {
    if (l.type === 'link') validateLink(l.href, l.label, "header");
    if (l.type === 'dropdown') l.items.forEach(si => validateLink(si.href, si.label, "header"));
  });
  if (config.header.cta) validateLink(config.header.cta.href, config.header.cta.label, "header");

  // 2. Check Footer
  config.footer.columns?.forEach(col => {
    col.links?.forEach(l => validateLink(l.href, l.label, "footer"));
  });

  // 3. Scan ALL pages for CTA buttons
  const scanBlocks = (blocks: any[], location: string) => {
    if (!blocks) return;

    blocks.forEach((b: any) => {
      if (b.type === "button") {
        validateLink(b.href, b.label, location);
      }
      if (b.type === "columns" && b.items) {
        b.items.forEach((col: any) => scanBlocks(col.blocks, location));
      }
    });
  };

  for (const [path, page] of Object.entries(config.pages)) {
    for (const [sectionId, section] of Object.entries(page.sections)) {
      const props: any = section.props;
      const loc = `${path}:::${sectionId}`;
      if (props.ctaLink !== undefined || props.ctaText) validateLink(props.ctaLink, props.ctaText || "CTA", loc);
      
      if (props.blocks) {
        scanBlocks(props.blocks, loc);
      }
    }
  }

  // 4. Find Orphans
  const allNavPaths: string[] = [];
  config.header.links?.forEach((l) => {
    if (l.type === "link" && l.href) allNavPaths.push(l.href);
    if (l.type === "dropdown")
      l.items.forEach((si) => si.href && allNavPaths.push(si.href));
  });
  // NEW: Add Footer links to reachable paths
  config.footer.columns?.forEach((col) => {
    col.links?.forEach((l) => l.href && allNavPaths.push(l.href));
  });

  const orphans = pagePaths.filter(
    (p) => p !== "/" && !allNavPaths.some((nav) => nav.split("#")[0] === p),
  );

  const deadLinks = brokenLinks.map(b => `${b.location}: ${b.reason}`);

  return {
    orphans,
    deadLinks,
    brokenLinks,
    isValid: orphans.length === 0 && brokenLinks.length === 0
  };
}
