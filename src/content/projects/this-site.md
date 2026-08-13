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
order: 3
date: 2026-07-09
---

## Why the site is a project

Most portfolios are hosted on someone else's platform and forgotten. I wanted
mine to be a working example of how I build and run things, so the site is itself
part of the portfolio. The source is public.

## The architecture

The site is a static Astro build. It runs in two places at once:

- **Primary origin:** a container on my own Kubernetes cluster, served by nginx,
  with a Let's Encrypt certificate and a DNS record managed by my own tool
  (dnsweaver).
- **Fallback mirror:** the same build published to Cloudflare Pages, on the edge,
  with no dependency on my home internet.

A small Cloudflare Worker sits on the apex domain. It fetches the Kubernetes
origin first. If that origin is slow or returns a server error, the Worker serves
the Cloudflare Pages copy instead, and the visitor never notices. Kubernetes is
primary; Pages is the safety net.

I tested the failover for real by pointing the Worker at a dead origin. The site
kept returning pages from the mirror, then went back to the cluster when I
restored it. No downtime during the switch.

## How it ships

Every push to GitHub runs a pipeline that builds the container image, pushes it
to the registry, and deploys the static build to the Cloudflare mirror. The
Kubernetes side picks up the new image automatically. GitHub is the source of
truth; the internal GitLab instance is a downstream mirror.

## The AI-assisted part

I built this by directing AI agents to do the implementation while I owned the
architecture, the standards, and every decision that mattered. Which stack.
How the failover should behave. What to reject and redo. That is AI-assisted
engineering, and it is different from vibe coding: the model types faster than I
do, but it does not decide anything. Everything shipped through linting, tests,
and review. When the deploy pipeline hit real problems along the way, a stuck CI
queue, a supply-chain policy rejecting fresh packages, a token locked to the
wrong IP, I fixed the causes rather than working around them.

If the AI went away tomorrow, this would take me longer to build. It would not
stop me.
