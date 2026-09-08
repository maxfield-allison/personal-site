---
title: dnsweaver
summary: I wanted new services to get DNS records automatically and old records to go away. dnsweaver started in my lab, and then people I'd never met started using it.
kind: open source
role: Product design and releases; AI agents write the code
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
draft: false
---

## I Wanted Certificates

What I actually wanted was internal TLS. Real certificates on internal services, issued automatically, with mutual TLS between them as the eventual goal. Before I could get very far with that, I needed to sort out DNS.

I wanted to reach services by name without worrying about where I'd moved them. That meant every internal service needed a correct DNS record, and it needed to stay correct without me remembering to update it.

At the time I was still on Docker Swarm and hadn't committed to Kubernetes yet. I'd also started using AI to help set things up, so there were more services to keep track of. Creating a record was annoying enough, but remembering to remove it when I tore something down was worse.

Then I opened my zones and looked properly. Pi-hole in front of unbound in front of Cloudflare, records for machines that no longer existed, records pointing at addresses I'd reassigned months earlier. Years of accumulated cruft and no quick way to tell what was real.

## What It Does

It reads hostnames from seven sources and reconciles records to match. Traefik, Caddy and nginx-proxy labels. Its own native labels. Kubernetes, Proxmox VE, Incus. A container starts or a VM boots and the record appears. They go away and so does the record.

Eleven providers on the other side, from Technitium and Pi-hole and AdGuard out to Cloudflare. Internal and external records come from the same labels, which is the split-horizon case most tools make you configure twice.

By default it only touches records it owns, so it leaves the ones I made by hand alone. That behavior is configurable too.

## Someone Sent a Patch

Someone went looking for a way to keep Technitium records in step with Traefik, which is the exact pair dnsweaver was born from, and found mine instead of writing their own. Through a search result, as far as either of us could work out afterwards. They hadn't only installed it. They'd found a bug and sent a fix before we ever spoke. Their machines are wired differently than mine, and dnsweaver was confidently picking the wrong network interface because of it. Classic "it works on my machine!"

I cut a release with the fix in it that morning.

Since then I've gone through the stargazers occasionally and found people from companies whose names I recognize immediately. I have no idea what any of them are doing with it but it's a good feeling and I'm still not used to it.

## Who Writes the Code

AI agents write the code. I decide what the tool needs to do and how it should fit together, and I own the releases.

Much of my work has been in conversation with those agents, comparing approaches and asking them to challenge the design. They also run code and security reviews. I need to understand the choices well enough to decide whether the result is something I want people using, and automated tests help check whether it does what we intended.

It worked in my lab months before I made it public. I could have stopped there, but I wanted to give it away. That meant thinking about setups I don't have and failures I hadn't encountered myself. The first outside contribution found one of those anyway.

## Making Room for Other Setups

The predecessor was a Technitium management tool modeled after Cloudflare Companion. It was tied to my setup. For dnsweaver I wanted sources and providers to be separate, so adding support for another platform wouldn't mean reworking the whole tool. That's how the provider list grew from two to eleven without much change to the core.

The webhook provider takes that a little further. It lets someone connect a DNS system that dnsweaver doesn't have a provider for yet, which saves them waiting for me to add one.

## More About dnsweaver

- [Why I built dnsweaver](https://probablyfine.dev/blog/why-i-built-dnsweaver) goes further into the design, including the Proxmox integration and split-horizon DNS.
