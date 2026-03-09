import { WebsiteConfig } from "../../lib/schema";

/**
 * INTEGRITY CHECKER
 */

export interface IntegrityReport {
  orphans: string[];
  deadLinks: string[];
  brokenCTAs: string[]; 
  isValid: boolean;
}

export function run_integrity_check(config: WebsiteConfig): IntegrityReport {
  const pagePaths = Object.keys(config.pages);
  const brokenCTAs: string[] = [];
  
  const getNavPaths = (links: any[]) => {
    const paths: string[] = [];
    if (!links) return paths;
    links.forEach(l => {
      if (l.type === 'link') paths.push(l.href);
      if (l.type === 'dropdown' && l.items) l.items.forEach((si: any) => paths.push(si.href));
    });
    return Array.from(new Set(paths));
  };

  const allNavPaths = Array.from(new Set([
    ...getNavPaths(config.header.links || []),
    ...getNavPaths(config.footer.columns?.flatMap(c => c.links) || [])
  ]));

  const validateLink = (href: string, location: string) => {
    if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href === "#") return;
    
    const [path, anchor] = href.split('#');
    const targetPath = path === "" ? "/" : path;
    const targetPage = config.pages[targetPath];

    if (!targetPage) {
      brokenCTAs.push(`${location}: Path "${targetPath}" does not exist.`);
      return;
    }

    if (anchor && !targetPage.sectionOrder.includes(anchor)) {
      brokenCTAs.push(`${location}: Anchor "#${anchor}" not found on page "${targetPath}".`);
    }
  };

  // RECURSIVE SCANNER for nested blocks (columns, etc.)
  const scanBlocks = (blocks: any[], location: string) => {
    if (!blocks) return;
    blocks.forEach((b: any) => {
      if (b.type === "button" && b.href) {
        validateLink(b.href, location);
      }
      if (b.type === "columns" && b.items) {
        b.items.forEach((col: any) => scanBlocks(col.blocks, location));
      }
    });
  };

  // 1. Scan ALL pages for CTA buttons
  for (const [path, page] of Object.entries(config.pages)) {
    for (const [sectionId, section] of Object.entries(page.sections)) {
      const props: any = section.props;
      if (props.ctaLink) validateLink(props.ctaLink, `Page ${path} | Section ${sectionId}`);
      if (props.blocks) {
        scanBlocks(props.blocks, `Page ${path} | Section ${sectionId}`);
      }
    }
  }

  // 2. Find Orphans
  const orphans = pagePaths.filter(p => p !== "/" && !allNavPaths.some(nav => nav.split('#')[0] === p));

  // 3. Find Dead Nav Links
  const deadLinks = allNavPaths.filter(href => {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href === "#") return false;
    const [path, anchor] = href.split('#');
    const targetPath = path === "" ? "/" : path;
    const targetPage = config.pages[targetPath];
    if (!targetPage) return true;
    if (anchor && !targetPage.sectionOrder.includes(anchor)) return true;
    return false;
  });

  return {
    orphans,
    deadLinks,
    brokenCTAs,
    isValid: orphans.length === 0 && deadLinks.length === 0 && brokenCTAs.length === 0
  };
}
