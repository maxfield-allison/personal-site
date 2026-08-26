---
title: This Site
summary: The site you're reading. Astro, self-hosted on my Kubernetes cluster as the primary origin, with a Cloudflare Pages failover mirror and an edge Worker that switches between them automatically.
kind: infrastructure
role: Designed and built it (AI-assisted)
stack:
  - Astro
  - Kubernetes
  - Cloudflare Workers
  - Cloudflare Pages
  - GitHub Actions
links:
  - label: Source
    url: https://github.com/maxfield-allison/personal-site
featured: true
order: 6
date: 2026-07-09
---

## Why the site is a project

Most portfolios sit on someone else's platform and get forgotten. I wanted mine to be a working example of how I build and run things, so the site is part of the portfolio rather than a container for it. The source is public.

## The architecture

It's a static Astro build that runs in two places at once.

The primary origin is a container on my own Kubernetes cluster, behind nginx, with a Let's Encrypt certificate and a DNS record managed by dnsweaver. The fallback is the same build published to Cloudflare Pages, sitting on the edge with no dependency on my house.

A small Cloudflare Worker on the apex fetches the Kubernetes origin first. If that origin is slow or returns an error, the Worker serves the Pages copy and the visitor doesn't notice. Kubernetes is primary. Pages is the net.

I tested that for real by pointing the Worker at a dead origin. The site kept serving from the mirror and went back to the cluster when I brought it up. Nothing dropped during the switch, which is the only version of that claim worth making.

## How it ships

Every push builds the container image, pushes it to the registry, and deploys the static build to the mirror. The Kubernetes side picks up the new image on its own. GitHub is the source of truth and the internal GitLab is a downstream mirror.

## The AI-assisted part

I directed AI agents to do the implementation while I owned the architecture, the standards, and every decision that mattered. Which stack. How the failover should behave. What to throw out and redo.

That's AI-assisted engineering and it isn't vibe coding. The model types faster than I do and it doesn't decide anything. Everything ships through linting, tests and review, and I reject a fair amount of what comes back.

The pipeline fought me on the way in. A stuck CI queue, a supply-chain policy rejecting fresh packages, a token locked to the wrong address. I fixed the causes rather than routing around them, which is slower and is the reason the thing still works months later.

If the AI went away tomorrow this would take me longer. It wouldn't stop me.
