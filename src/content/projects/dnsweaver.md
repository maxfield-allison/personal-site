---
title: dnsweaver
summary: An open-source Go tool that creates DNS records automatically for containers, VMs and clusters, reading from seven sources and writing to eleven DNS providers, so records follow your services instead of drifting out of date.
kind: open source
role: Author and maintainer
stack:
  - Go
  - Docker
  - Kubernetes
  - Proxmox
  - Incus
  - Cloudflare
  - CI/CD
links:
  - label: GitHub
    url: https://github.com/maxfield-allison/dnsweaver
featured: true
order: 1
date: 2026-01-15
---

## Why I built it

DNS records rot. You spin up a service, add a record by hand, move the service later, and the record points at nothing. Do that across a lab running dozens of services and you'll spend real time chasing entries that stopped being true weeks ago.

I wanted DNS to follow the infrastructure on its own, the way a platform team would run it. So I wrote the thing that does it.

## What it does

dnsweaver reads hostnames from seven sources and reconciles DNS records to match. Traefik, Caddy and nginx-proxy labels. Its own native labels. Kubernetes resources, Proxmox VE and Incus. You declare the intent with a label or an annotation, and it creates the record, keeps it current when the service moves, then removes it when the service goes away.

It tracks what it owns, so it only touches records it created and leaves anything you made by hand alone. That sounds like a small thing until the first time a tool decides it knows better than you do about a record you needed.

It writes to eleven providers, from self-hosted resolvers like Technitium and Pi-hole out to Cloudflare, with per-provider zones so one instance can manage several domains. Internal and external records come from the same labels, which is the split-horizon case most tools make you configure twice. This site's own origin record is managed by it.

## How it's built

It's Go, with a provider interface so a new DNS backend drops in without anyone touching the reconcile loop. Ownership is tracked through a description prefix, which is unglamorous and has never once gotten it wrong.

The release pipeline lints and tests on every commit, then ships multi-architecture containers and binaries on every tag. Fifty-six tagged releases so far, semantic versioning throughout, and the security scanners block the build rather than filing a warning nobody reads.

It runs as a single container. Where a platform emits events it reacts to them, and it falls back to polling as a safety net, so a missed event costs you one reconcile interval instead of a stale record.

## What I'd call out

The provider abstraction is the part I'm happiest with. Adding a backend means implementing one interface rather than rewriting the engine, and that's what kept the code honest as the provider list grew from two to eleven.

It's also the pattern I reach for anywhere a project has to support several backends behind one behaviour, which turns out to be most of them.

## Related reading

- [Why I built dnsweaver](https://probablyfine.dev/blog/why-i-built-dnsweaver) on the blog: the longer story, in a blunter voice.
