# Visitor response language

Attention identifies something useful. Opening it reveals real context. A visitor can explicitly keep a place to return to. Preserve the existing site palette, typography, content and ordinary links when extending this behavior.

## Reuse

- Add `data-response` to a meaningful link or item, and `data-response-group` to its list for a focus/hover rule. This follows intent, not continuous pointer position.
- Use native `details` with `data-response-disclosure` and a `.work-summary-content` child for optional context. Content remains readable without JavaScript.
- Put `data-reading-content` on the article body. Its visible `h2`/`h3` headings need stable IDs. The reading tools build section links and save an explicit place.
- `SiteResponse.astro` belongs once in the ordinary layout. Bare experiences own their own lifecycle. Styles remain per-site.

The three files in `public/js/` (`response-effect.js`, `reading-places.js`, `site-response.js`) are shared through the existing manifest. probablyfine-site is their source; use `scripts/shared/sync-shared.mjs` to copy/check the portfolio. There is no extra runtime dependency.

## Lifecycle and storage

Mount on `astro:page-load`; dispose on `astro:before-swap` and `pagehide`; restore after a persisted `pageshow`. Each mounted page owns its observers, listeners, animation handles and pending frame. Restore moved markup on disposal so an initial duplicate mount is safe. Finite animations stop on reduced motion, hidden documents and disposal. Still mode also cancels the DNS illustration and disables decorative CSS motion. It lasts for the current client navigation session, not a later full reload.

Reading state is written only by **Keep my place**. One `pf-reading-place:v1:<path>` key per article contains version, local path, title and section ID. Validate every stored value before creating a link. No automatic browsing history is persisted. Opened marks during navigation stay in memory. Storage belongs to this browser and origin; it is not synchronized between the two sites. Clear only this feature's keys. If storage fails, keep a temporary in-memory place and say so.

## Checks

```sh
pnpm build
node --test scripts/reading-places.test.mjs
CHROMIUM_PATH=/path/to/chrome node scripts/check-response.mjs
```

Set `SITE_ORIGIN` for an existing local built preview and `RESPONSE_EVIDENCE` for browser receipts/screenshots. The browser script checks real client navigation, explicit saving/return, repeated swaps, narrow screens, reduced motion, keyboard dialogs and no-JavaScript reading. Third-party comments and analytics are excluded. Chromium checks do not establish Safari, Firefox, native screen reader or physical phone acceptance.

Astro 7.3.4 can emit `Transition was skipped. skipTransition() called` when another navigation interrupts its native transition. The test retains this exact cancellation separately in `transitionCancellations`; other page errors still fail. There is no global error suppression in the site. See the installed Astro transition router and [the native skipTransition behavior](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition). This is a known console limitation, not evidence that every browser is qualified.

## Portfolio

The home page's native work disclosures reuse the published summaries. Case studies and notes get section navigation and optional bookmarks. The DNS record-flow illustration offers a local example in the case study; its ordinary card embed stays static to avoid nesting controls inside a link. The example uses documentation-only addresses and never contacts a DNS provider. Removing its managed record leaves the example manual record intact.
