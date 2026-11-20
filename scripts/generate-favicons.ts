import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <!-- Background Gradient: Rich Royal Burgundy -->
    <linearGradient id="burgundyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9E002C" />
      <stop offset="50%" stop-color="#800020" />
      <stop offset="100%" stop-color="#550015" />
    </linearGradient>

    <!-- Gold Gradient: Champagne & Antique Gold -->
    <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3C4" />
      <stop offset="30%" stop-color="#F5D77F" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA821A" />
    </linearGradient>

    <!-- Core Star Glow -->
    <linearGradient id="coreStar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="60%" stop-color="#FFF3C4" />
      <stop offset="100%" stop-color="#F2D175" />
    </linearGradient>
  </defs>

  <!-- Base Rounded Squircle with Gold Edge -->
  <rect x="2" y="2" width="60" height="60" rx="16" ry="16" fill="url(#burgundyBg)" stroke="url(#goldSheen)" stroke-width="2.5" />

  <!-- Inner subtle hairline accent -->
  <rect x="5.5" y="5.5" width="53" height="53" rx="13" ry="13" fill="none" stroke="#D4AF37" stroke-width="0.75" stroke-opacity="0.35" />

  <!-- Monogram "V" + Royal Sparkle Group -->
  <g>
    <!-- Stylized Royal Serif "V" -->
    <path d="M15 19 L21.5 19 L29 44 L32.5 44 L40 19 L46.5 19 L46.5 21 L43.5 21.5 L34.5 47 L27 47 L18 21.5 L15 21 Z" 
          fill="url(#goldSheen)" />

    <!-- Radiant 4-point Sparkle Star positioned elegantly at top-right -->
    <path d="M45 8 C45 13.5 47.5 16 53 16.5 C47.5 17 45 19.5 45 25 C45 19.5 42.5 17 37 16.5 C42.5 16 45 13.5 45 8 Z" 
          fill="url(#coreStar)" />
    <circle cx="45" cy="16.5" r="1.2" fill="#D4AF37" />

    <!-- Tiny companion sparkle at bottom left -->
    <path d="M20 34 C20 36.5 21 37.5 23.5 38 C21 38.5 20 39.5 20 42 C20 39.5 19 38.5 16.5 38 C19 37.5 20 36.5 20 34 Z" 
          fill="url(#goldSheen)" opacity="0.9" />
  </g>
</svg>`;

async function main() {
  const appDir = path.join(process.cwd(), 'app');
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write SVG icons
  const iconSvgPath = path.join(appDir, 'icon.svg');
  const publicSvgPath = path.join(publicDir, 'icon.svg');
  fs.writeFileSync(iconSvgPath, SVG_CONTENT);
  fs.writeFileSync(publicSvgPath, SVG_CONTENT);
  console.log('Saved app/icon.svg and public/icon.svg');

  // 2. Render PNGs using Puppeteer Chrome
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const htmlContent = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;overflow:hidden;">${SVG_CONTENT}</body></html>`;
  await page.setContent(htmlContent);

  // Take 64x64 PNG
  await page.setViewport({ width: 64, height: 64, deviceScaleFactor: 1 });
  const png64Buffer = await page.screenshot({ type: 'png', omitBackground: true });
  fs.writeFileSync(path.join(appDir, 'icon.png'), png64Buffer);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png64Buffer);
  console.log('Saved icon.png (64x64)');

  // Take 180x180 PNG (Apple Touch Icon)
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', '180');
      svg.setAttribute('height', '180');
    }
  });
  const applePng = await page.screenshot({ type: 'png', omitBackground: true });
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), applePng);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), applePng);
  console.log('Saved apple-icon.png (180x180)');

  // Take 32x32 PNG for ICO
  await page.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', '32');
      svg.setAttribute('height', '32');
    }
  });
  const png32Buffer = await page.screenshot({ type: 'png', omitBackground: true });

  // Simple valid ICO header containing the 32x32 PNG data
  // Standard ICO format wrapping PNG:
  // 6 bytes header: 0, 0 (reserved), 1, 0 (type 1 for icon), 1, 0 (1 image)
  // 16 bytes directory entry:
  //   width (32), height (32), colors (0), reserved (0),
  //   color planes (1, 0), bpp (32, 0), size of png data (4 bytes LE), offset (4 bytes LE: 22)
  // PNG data
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type
  icoHeader.writeUInt16LE(1, 4); // 1 image

  icoHeader.writeUInt8(32, 6); // width
  icoHeader.writeUInt8(32, 7); // height
  icoHeader.writeUInt8(0, 8); // color palette
  icoHeader.writeUInt8(0, 9); // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bits per pixel
  icoHeader.writeUInt32LE(png32Buffer.length, 14); // image size
  icoHeader.writeUInt32LE(22, 18); // offset where image data starts

  const icoBuffer = Buffer.concat([icoHeader, png32Buffer]);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved app/favicon.ico and public/favicon.ico');

  await browser.close();
  console.log('All favicon assets generated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
