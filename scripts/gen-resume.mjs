// Render the /resume page to public/resume.pdf using headless Chromium.
// Requires a running preview server (pnpm preview) and playwright-core's chromium.
//   Regenerate: pnpm preview & ; pnpm resume
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const url = process.env.RESUME_URL || 'http://localhost:4327/resume';
const shell = execSync('ls ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-linux/headless_shell 2>/dev/null | head -1', { shell: '/bin/bash' }).toString().trim();

const browser = await chromium.launch({ executablePath: shell || undefined });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.pdf({
  path: 'public/resume.pdf',
  format: 'Letter',
  printBackground: false,
  margin: { top: '0.6in', bottom: '0.6in', left: '0.7in', right: '0.7in' },
});
await browser.close();
console.log('public/resume.pdf generated');
