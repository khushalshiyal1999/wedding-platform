import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(process.cwd(), 'screenshots');

const TEMPLATES = [
  'royal',
  'floral',
  'modern',
  'royal-palace',
  'pastel-garden',
  'gujarati',
  'minimal-luxury',
  'peacock',
  'bohemian',
  'mughal',
  'cinematic',
];

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching Chrome for screenshot capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Admin Login & Authentication
  console.log('Authenticating as admin...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.type('input[type="email"]', 'admin@wedding.com');
  await page.type('input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // 2. Redesigned Template Catalogue
  console.log('Capturing: Redesigned Template Catalogue...');
  await page.goto('http://localhost:3000/admin/dashboard/templates', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-templates-catalogue.png'), fullPage: false });

  // 3. Capture all 11 templates
  for (const slug of TEMPLATES) {
    console.log(`Capturing template: ${slug}...`);
    await page.goto(`http://localhost:3000/wedding/aarav-weds-priya?template=${slug}`, {
      waitUntil: 'networkidle2',
    });

    // Check if welcome button exists and click it to reveal template hero
    try {
      const button = await page.$('button');
      if (button) {
        await button.click();
        await new Promise((r) => setTimeout(r, 800));
      }
    } catch {
      // ignore
    }

    await page.screenshot({
      path: path.join(OUTPUT_DIR, `template-${slug}.png`),
      fullPage: false,
    });
    console.log(`Saved template-${slug}.png`);
  }

  console.log('All screenshots captured successfully in /screenshots!');
  await browser.close();
}

capture().catch((e) => {
  console.error('Error capturing screenshots:', e);
  process.exit(1);
});
