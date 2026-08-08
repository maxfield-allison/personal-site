---
title: dnsweaver
summary: An open-source Go tool that syncs DNS records from your infrastructure to your DNS provider, so records follow your services instead of drifting out of date.
role: Author and maintainer
stack:
  - Go
  - Docker
  - Kubernetes
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

DNS records rot. You spin up a service, add a record by hand, move the service
later, and the record points at nothing. Multiply that across a homelab running
dozens of services and you spend real time chasing stale entries. I wanted DNS
to follow my infrastructure automatically, the way a platform team would run it.

## What it does

dnsweaver watches your infrastructure (Docker, Kubernetes ingresses, Proxmox)
and reconciles DNS records to match. Declare the intent with a label or an
annotation, and dnsweaver creates, updates, and cleans up the record for you.
It tracks ownership so it only touches records it manages, and leaves anything
you created by hand alone.

It supports multiple providers (Cloudflare, Technitium, and more) and multiple
record types, with per-provider zones so one instance can manage several
domains at once. This site's own origin record is managed by dnsweaver.

## How it's built

- Go, with a provider interface so new DNS backends drop in without touching the
  core reconcile loop.
- Ownership tracking via a description prefix, so operator-managed records are
  always safe.
- Full CI/CD: linting, tests, and multi-arch container plus binary releases on
  every tag. Semantic versioning throughout.
- Runs as a single container in the cluster and reconciles on an interval.

## What I'd call out

The provider abstraction is the part I'm happiest with. Adding a new DNS backend
means implementing one interface, not rewriting the engine. That kept the code
honest as the provider list grew, and it's the same pattern I reach for whenever
a project needs to support several backends behind one behavior.

## Related reading

- [Why I built dnsweaver](https://probablyfine.dev/blog/why-i-built-dnsweaver) on the blog: the longer story behind the tool.
