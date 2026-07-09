# personal-site

The source for [maxfieldallison.com](https://maxfieldallison.com), my portfolio.

It is a static [Astro](https://astro.build) site, but the interesting part is how
it runs: the primary origin is a container on my own Kubernetes cluster, with a
Cloudflare Pages mirror as an automatic failover. The site is part of the
portfolio, not just a container for it, so the source is public.

## Architecture

```
visitor --> maxfieldallison.com --> Cloudflare Worker
                                       |-- try Kubernetes origin   (PRIMARY)
                                       '-- on 5xx/timeout: Pages    (FALLBACK)
```

- **Primary origin:** the built site runs in nginx on a Talos Kubernetes cluster,
  behind Traefik, with a Let's Encrypt certificate. The DNS record is managed by
  [dnsweaver](https://github.com/maxfield-allison/dnsweaver), a tool I wrote.
- **Fallback mirror:** the same build is published to Cloudflare Pages, on the
  edge, with no dependency on my home internet.
- **Edge Worker:** a small Cloudflare Worker on the apex fetches the Kubernetes
  origin first and serves the Pages copy if that origin is unavailable. Verified
  by pointing the Worker at a dead origin and confirming zero-downtime failover.

## Stack

- Astro + Tailwind CSS, static output
- Typed content collections for project case studies (`src/content/projects`)
- nginx (Alpine, non-root) container image
- GitHub Actions: build image to `ghcr.io` + deploy to Cloudflare Pages
- Cloudflare Worker for origin failover (`worker/`)

## Develop

```bash
pnpm install
pnpm dev      # local dev server
pnpm build    # static build to dist/
pnpm preview  # serve the build locally
```

Node 22 and pnpm 10 (pinned via `packageManager`).

## Add a project

Case studies are Markdown files with typed frontmatter. Drop a file in
`src/content/projects/` and it appears on the home page (if `featured: true`) and
the work list automatically:

```yaml
---
title: My Project
summary: One line on what it is and why it matters.
role: What I did
stack: [Go, Kubernetes]
links:
  - label: GitHub
    url: https://github.com/...
featured: true
order: 4
---

Markdown body becomes the case study.
```

## Deploy

GitHub is the source of truth. A push to `main` builds and publishes the image
and the Pages mirror; the Kubernetes side rolls the new image. The internal
GitLab instance is a downstream mirror. Kubernetes manifests live in a separate
private infrastructure repo, not here.

## Development approach

Built with AI-assisted engineering: I own the architecture, the standards, and
the decisions, and direct AI agents for implementation. It is not vibe coding.
Everything ships through linting, a build check, and review.

## License

[MIT](LICENSE) for the code. Site content and copy are (c) Maxfield Allison.
