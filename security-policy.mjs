// The security headers for maxfieldallison.com: the one place they are defined.
//
// The site is served from two places. nginx.conf covers the Kubernetes origin;
// public/_headers covers the Cloudflare Pages mirror that the failover Worker
// falls back to when the origin is down. Pages does not read nginx.conf, so
// both files have to carry the policy. Both are now generated from this module
// by scripts/shared/headers.mjs, and the build fails if either one disagrees
// with it. Edit here, then run `pnpm headers` to rewrite them.
//
// Shape:
//   headers  every response, both origins
//   scopes   path prefixes with their own additions or replacements. `path` is
//            an nginx prefix location; the Pages rule is the same prefix with a
//            trailing `*`. A header set to null is removed for that scope.
//
// CSP values are written as { directive: [sources] }; an empty list is a bare
// directive such as upgrade-insecure-requests.

// script-src can be a bare 'self' because the site has no inline scripts at
// all: the one behavioural script is served from /js/read-tracker.js precisely
// so this stays true. If you ever add an inline <script>, this policy will
// block it; move the code to a file under public/js/ rather than weakening the
// policy or adding a hash.
//
// style-src needs 'unsafe-inline': Astro emits a small inline <style> block
// and view transitions set inline style attributes, which cannot be hashed.
// Inline style is a far weaker vector than inline script.
export default {
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // SAMEORIGIN rather than DENY: the edge already sends SAMEORIGIN, and two
    // different values across the chain is worse than one slightly looser
    // one. Real framing control comes from frame-ancestors.
    'X-Frame-Options': 'SAMEORIGIN',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), vr=()',
    'Content-Security-Policy': {
      'default-src': ["'self'"],
      'script-src': ["'self'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:'],
      'font-src': ["'self'"],
      'connect-src': ["'self'"],
      'frame-ancestors': ["'self'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'object-src': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  },

  scopes: [],
};
