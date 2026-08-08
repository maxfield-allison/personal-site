// Generate a per-page OG social card for each key route + project case study.
//   static pages (config below)      -> public/og/<name>.png (1200x630)
//   src/content/projects/<slug>.md   -> public/og/<slug>.png (1200x630)
// Runs automatically as a prebuild step; also `pnpm og:pages`.
//
// Reuses the site brand (blue accent) and the same template family as
// scripts/og.svg. Output is a build artifact (public/og/ is gitignored), so new
// pages/case studies get a card automatically on the next build with no
// committed binaries. Fonts: names 'DejaVu Sans'/'DejaVu Sans Mono' explicitly
// so the Docker build stage (which apk-adds ttf-dejavu) renders real glyphs and
// not tofu (node:alpine ships no fonts).
import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'node:fs/promises';

const PROJECTS_DIR = 'src/content/projects';
const OUT_DIR = 'public/og';

// Static pages get a hand-tuned title + subtitle. Case studies are derived from
// project frontmatter below.
const PAGES = [
  {
    name: 'about',
    title: 'About',
    subtitle: 'Enterprise Azure by day, a Kubernetes homelab by night.',
  },
  {
    name: 'projects',
    title: 'Work',
    subtitle: 'Things I have built and run. Real, in use, mine to maintain.',
  },
  {
    name: 'resume',
    title: 'Resume',
    subtitle: 'Infrastructure engineer. Alabaster, Alabama.',
  },
  {
    name: 'uses',
    title: 'Uses',
    subtitle: 'The tools and workflow I actually use to build and run infrastructure.',
  },
];

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

function wrap(text, maxChars = 40, maxLines = 2) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\.*$/, '') + '...';
  }
  return lines;
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
}

function svg(title, subtitle) {
  const subLines = wrap(subtitle);
  const subTspans = subLines
    .map((l, i) => `<text x="80" y="${360 + i * 48}" font-family="'DejaVu Sans', system-ui, sans-serif" font-size="34" fill="#9aa7b6">${escapeXml(l)}</text>`)
    .join('\n  ');
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0f14"/>
      <stop offset="1" stop-color="#131a22"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#4f9cff"/>
  <text x="80" y="130" font-family="'DejaVu Sans Mono', monospace" font-size="26" fill="#9aa7b6">maxfieldallison.com</text>
  <text x="78" y="285" font-family="'DejaVu Sans', system-ui, sans-serif" font-size="76" font-weight="600" fill="#e7ecf2">${escapeXml(title)}</text>
  ${subTspans}
  <text x="80" y="560" font-family="'DejaVu Sans Mono', monospace" font-size="22" fill="#4f9cff">Kubernetes / GitOps / Go / Azure</text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

// Static pages.
for (const p of PAGES) {
  await sharp(Buffer.from(svg(p.title, p.subtitle))).png().toFile(`${OUT_DIR}/${p.name}.png`);
  console.log('og:', p.name);
}

// Project case studies (title + summary from frontmatter).
const files = (await readdir(PROJECTS_DIR)).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
for (const f of files) {
  const md = await readFile(`${PROJECTS_DIR}/${f}`, 'utf8');
  const { title, summary } = frontmatter(md);
  if (!title) continue;
  const slug = f.replace(/\.(md|mdx)$/, '');
  await sharp(Buffer.from(svg(title, summary ?? ''))).png().toFile(`${OUT_DIR}/${slug}.png`);
  console.log('og:', slug);
}
