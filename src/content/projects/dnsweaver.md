---
title: dnsweaver
summary: DNS records that follow the infrastructure instead of rotting behind it. Seven sources, eleven providers, one Go binary. I built it for my own lab and then spent months making it safe to hand to anyone else.
kind: open source
role: Author and maintainer
stack:
  - Go
  - Docker
  - Kubernetes
  - Proxmox
  - Incus
  - Cloudflare DNS et al
  - CI/CD
links:
  - label: GitHub
    url: https://github.com/maxfield-allison/dnsweaver
featured: true
order: 1
date: 2026-01-15
draft: true
---

## It started because I wanted certificates

What I actually wanted was internal TLS. Real certificates on internal services, issued automatically, with mutual TLS between them as the eventual goal. Enterprise shape, open-source parts, sized honestly for one person running it in a basement.

You can't issue a certificate for a thing that has no name. So before any of that, every internal service needed a DNS record that was actually true, and it needed to stay true without me remembering.

At the time I was still on Docker Swarm and hadn't committed to Kubernetes yet. I was also standing services up faster than I ever had, because I'd started pointing AI at the work. That velocity is what made it obvious. When you can spin up six things in an evening, doing DNS by hand stops being a chore and starts being the thing that's actually slowing you down.

Then I opened my zones and looked properly. Pi-hole in front of unbound in front of Cloudflare, records for machines that no longer existed, records pointing at addresses I'd reassigned months earlier. Years of accumulated crap and no way to tell which of it was load-bearing.

## What it does

It reads hostnames from seven sources and reconciles records to match. Traefik, Caddy and nginx-proxy labels. Its own native labels. Kubernetes, Proxmox VE, Incus. A container starts or a VM boots and the record appears. They go away and so does it.

Eleven providers on the other side, from Technitium and Pi-hole and AdGuard out to Cloudflare. Internal and external records come from the same labels, which is the split-horizon case most tools make you configure twice.

It only touches records it owns. Anything I made by hand it leaves alone.

## Then somebody I'd never met sent a patch

Someone went looking for a way to keep Technitium records in step with Traefik, which is the exact pair dnsweaver was born from, and found mine instead of writing their own. Through a search result, as far as either of us could work out afterwards.

They hadn't only installed it. They'd found a bug and sent a fix before we ever spoke. Their setup has a shape mine doesn't, and dnsweaver was confidently picking the wrong network interface because of it. That class of bug is invisible from inside your own lab, because your own lab is the shape you built it.

I cut a release with the fix in it that morning.

Since then I've gone through the stargazers occasionally and found people from companies whose names I recognize immediately. I have no idea what any of them are doing with it. It's a strange feeling and I have not gotten used to it.

## About who wrote it

AI wrote most of the code. I want to be exact about that, because the interesting part isn't the disclaimer.

I reviewed far more code than I produced. I ran adversarial passes on the architecture, red-team reviews, security reviews. I went and read how other open-licensed projects structured themselves and built standards off that rather than inventing my own. And I spent a long time in conversation with several different models, not to generate more, but to make sure I actually understood what I was assembling.

The honest friction: I could read that code well before I could have written it. That gap bothered me enough that I kept working at it, and the only reason I put that much into it was that I intended to give it away. Left to myself I'd have shipped something that worked for me and moved on.

It went public months after it worked. It's my first public project, and I don't put something out under my name until I'm as confident as I'm going to get that anything left is a rare edge case. The tests are real ones, not theater.

## What the last tool taught me

The predecessor was a Technitium management tool, single-purpose and hard-wired. What it taught me was to abstract the interfaces and make both ends pluggable, so sources and providers drop in without touching the engine. That's the whole design of dnsweaver, and it's why the provider list went from two to eleven without the core moving much.

Next is webhooks, so people can bolt on the source or provider I never thought of.

## Related reading

- [Why I built dnsweaver](https://probablyfine.dev/blog/why-i-built-dnsweaver) on the blog: the longer story, in a blunter voice.
