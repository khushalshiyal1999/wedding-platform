import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(process.cwd(), 'screenshots');

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Launching Chrome for screenshot capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Admin Login Page
  console.log('Capturing: Admin Login Page...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-admin-login.png'), fullPage: false });

  // Log in as admin to set cookies
  console.log('Authenticating as admin...');
  await page.type('input[type="email"]', 'admin@wedding.com');
  await page.type('input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // 2. Admin Dashboard Overview
  console.log('Capturing: Admin Dashboard Overview...');
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-admin-dashboard.png'), fullPage: false });

  // 3. Invitation Management
  console.log('Capturing: Invitation Management List...');
  await page.goto('http://localhost:3000/admin/dashboard/invitations', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03-invitations-list.png'), fullPage: false });

  // 4. Invitation Builder Wizard
  console.log('Capturing: Invitation Builder Wizard...');
  await page.goto('http://localhost:3000/admin/dashboard/invitations/create', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-invitation-builder.png'), fullPage: false });

  // 5. Template Catalogue
  console.log('Capturing: Template Catalogue...');
  await page.goto('http://localhost:3000/admin/dashboard/templates', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-templates-catalogue.png'), fullPage: false });

  // 6. Public Wedding Invitation (Aarav & Priya)
  console.log('Capturing: Public Wedding Invitation...');
  await page.goto('http://localhost:3000/wedding/aarav-weds-priya', { waitUntil: 'networkidle2' });
  // Click "Open Invitation" to reveal the full wedding invite experience
  try {
    const openBtn = await page.waitForSelector('button', { timeout: 3000 });
    if (openBtn) {
      await openBtn.click();
      await new Promise((r) => setTimeout(r, 1000));
    }
  } catch (e) {
    // If already entered
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-public-invitation.png'), fullPage: false });

  console.log('All 6 screenshots captured successfully in /screenshots!');
  await browser.close();
}

capture().catch((e) => {
  console.error('Error capturing screenshots:', e);
  process.exit(1);
});
