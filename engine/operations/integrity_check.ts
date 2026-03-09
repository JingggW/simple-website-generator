import { WebsiteConfig } from "../../lib/schema";

/**
 * INTEGRITY CHECKER
 */

export interface IntegrityReport {
  orphans: string[];
  deadLinks: string[];
  brokenCTAs: string[]; // NEW: For buttons and CTAs within pages
  isValid: boolean;
}

export function run_integrity_check(config: WebsiteConfig): IntegrityReport {
  const pagePaths = Object.keys(config.pages);
  const brokenCTAs: string[] = [];
  
  // 1. Helper to extract all HREFs in navigation
  const getNavPaths = (links: any[]) => {
    const paths: string[] = [];
    links.forEach(l => {
      if (l.type === 'link') paths.push(l.href);
      if (l.type === 'dropdown') l.items.forEach((si: any) => paths.push(si.href));
    });
    return Array.from(new Set(paths));
  };

  const allNavPaths = Array.from(new Set([
    ...getNavPaths(config.header.links || []),
    ...getNavPaths(config.footer.columns?.flatMap(c => c.links) || [])
  ]));

  // 2. Scan ALL pages for CTA buttons and internal links
  for (const [path, page] of Object.entries(config.pages)) {
    for (const [sectionId, section] of Object.entries(page.sections)) {
      const props: any = section.props;
      const foundLinks: string[] = [];

      // Case A: Hero CTA
      if (props.ctaLink) foundLinks.push(props.ctaLink);

      // Case B: Block Buttons
      if (props.blocks) {
        props.blocks.forEach((b: any) => {
          if (b.type === "button" && b.href) foundLinks.push(b.href);
        });
      }

      // Validate found links
      foundLinks.forEach(href => {
        if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href === "#") return;
        
        const basePath = href.split('#')[0];
        if (basePath !== "" && !pagePaths.includes(basePath)) {
          brokenCTAs.push(`Page ${path} | Section ${sectionId}: Button links to non-existent page "${href}"`);
        }
      });
    }
  }

  // 3. Find Orphans
  const orphans = pagePaths.filter(p => p !== "/" && !allNavPaths.some(nav => nav.split('#')[0] === p));

  // 4. Find Dead Nav Links
  const deadLinks = allNavPaths.filter(href => {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href === "#") return false;
    const [basePath] = href.split('#');
    return basePath !== "" && !pagePaths.includes(basePath);
  });

  return {
    orphans,
    deadLinks,
    brokenCTAs,
    isValid: orphans.length === 0 && deadLinks.length === 0 && brokenCTAs.length === 0
  };
}
