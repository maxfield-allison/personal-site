// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Retired case studies keep their URL working. A dead /projects/<id> is a real
  // cost on a site this small: it sits in the sitemap, in old links, and in
  // anything anyone saved. Astro emits a meta-refresh page for these in a static
  // build, which is enough for a handful of moved pages.
  redirects: {
    '/projects/this-site': '/projects',
  },

  site: 'https://maxfieldallison.com',
  // /pets is built but has no plates yet, so it is kept out of the sitemap to
  // match the noindex it carries while empty. Submitting a URL for indexing and
  // telling the crawler not to index it are contradictory signals, so the two
  // guards belong together — and they come off together, in the same commit
  // that adds the photos. Tracked in personal-site#1.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/pets') })],
  // Prefetch internal links on hover/tap for near-instant navigation. Static
  // pages, so this is just a small HTML fetch primed into cache.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Flat file output (/about.html, not /about/index.html) so the static host
  // serves clean URLs without directory redirects. Directory redirects behind a
  // reverse proxy leak the internal origin host:port in the Location header.
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  }
});
