// Genera los íconos PNG de la PWA renderizando HTML con Chromium.
import { chromium } from "playwright";

const html = (size, pad) => `<!doctype html><html><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center">
  <div style="position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 50% 50%,transparent 0 6deg,rgba(28,231,131,.18) 6deg 8deg)"></div>
  <div style="position:relative;width:${size - pad * 2}px;height:${size - pad * 2}px;display:grid;place-items:center">
    <div style="font-family:Impact,'Anton','DejaVu Sans',sans-serif;font-weight:900;font-size:${(size - pad * 2) * 0.62}px;line-height:1;color:#1ce783;-webkit-text-stroke:${size / 64}px #f4f4f0;text-shadow:${size / 40}px ${size / 40}px 0 #f4f4f0;transform:rotate(-8deg)">IQ</div>
  </div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
const out = [
  ["public/icons/icon-192.png", 192, 8],
  ["public/icons/icon-512.png", 512, 24],
  ["public/icons/maskable-512.png", 512, 90],
  ["public/icons/apple-touch-icon.png", 180, 10],
  ["src/app/favicon.ico", 48, 2],
];
for (const [file, size, pad] of out) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(html(size, pad));
  await page.screenshot({ path: file.replace(".ico", ".png"), clip: { x: 0, y: 0, width: size, height: size } });
}
await browser.close();
