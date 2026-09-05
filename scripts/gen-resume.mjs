// Render the /resume page to public/resume.pdf using headless Chromium.
// Requires a running preview server (pnpm preview) and playwright-core's chromium.
//   Regenerate: pnpm preview & ; pnpm resume
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const url = process.env.RESUME_URL || 'http://localhost:4327/resume';
const shell = execSync('ls ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-linux/headless_shell 2>/dev/null | head -1', { shell: '/bin/bash' }).toString().trim();
const pageMargin = { top: '0.5in', bottom: '0.5in', left: '0.7in', right: '0.7in' };

const browser = await chromium.launch({ executablePath: shell || undefined });
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.pdf({
  path: 'public/resume.pdf',
  format: 'Letter',
  printBackground: false,
  // 0.5in verticals: the two-line Recognition block was spilling to a third
  // page at 0.6in, and a two-page resume is what recruiters and parsers expect.
  margin: pageMargin,
});

// Also render the sheet itself: a small image of the real resume, used on
// /resume and the home page as the "this is the deliverable" signal. It is a
// screenshot of the same print view the PDF comes from. page.screenshot does
// not paginate or apply page.pdf's margins, so reproduce the margins as body
// padding and hide the content after the explicit page-two break. Otherwise
// the cover advertises a wider document with a false first-page boundary.
//
// Committed alongside resume.pdf rather than built in Docker, because both
// need a headless browser that the node:alpine build stage does not have.
await page.emulateMedia({ media: 'print' });
await page.setViewportSize({ width: 816, height: 1056 }); // US Letter at 96dpi
await page.addStyleTag({
  content: `@media print {
    body { padding: 48px 67.2px !important; }
    #experience .resume-page-two,
    #experience ~ * { display: none !important; }
  }`,
});
// PDF generation can leave Chromium scrolled into the document when the first
// page grows close to its printable height. The cover is the current viewport,
// so put it back at the document origin before capturing it.
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({
  path: 'public/resume-cover.png',
});
await browser.close();
console.log('public/resume.pdf generated');
console.log('public/resume-cover.png generated');
