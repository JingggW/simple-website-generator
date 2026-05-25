import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

async function run() {
  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  // Load site config to get pages
  const configPath = path.join(process.cwd(), 'config', 'site.json');
  if (!fs.existsSync(configPath)) {
    console.error("❌ config/site.json not found. Have you generated a site?");
    process.exit(1);
  }

  const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const pages = Object.keys(siteConfig.pages);

  console.log(`📸 Preparing to screenshot ${pages.length} pages...`);

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
    deviceScaleFactor: 2, // High resolution (Retina)
  });
  
  const page = await context.newPage();
  
  const timestamp = Date.now();

  // Helper to scroll to bottom and trigger lazy loading/animations
  async function autoScroll(page: any) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    // Scroll back to top after triggering everything
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  for (const route of pages) {
    const safeName = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    const fileName = `${safeName}_${timestamp}.png`;
    const fullPath = path.join(SCREENSHOT_DIR, fileName);
    
    const url = `http://localhost:3000${route}`;
    
    console.log(`🌐 Visiting ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      console.log(`📜 Scrolling ${safeName} to trigger animations...`);
      await autoScroll(page);
      
      // Give animations an extra moment to settle after scrolling
      await page.waitForTimeout(1500);
      
      console.log(`📸 Snapping ${safeName}...`);
      await page.screenshot({ path: fullPath, fullPage: true });
      
    } catch (e: any) {
      console.error(`❌ Failed to screenshot ${route}: ${e.message}`);
    }
  }

  await browser.close();
  console.log(`✅ All screenshots saved to /screenshots directory with timestamp ${timestamp}`);
}

run().catch(console.error);
