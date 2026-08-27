---
title: A Setting That Didn't Exist Yet
summary: I needed one BGP option my firewall's GUI didn't expose. Editing the config by hand wouldn't have survived the next save, so the fix had to go upstream.
kind: open source
role: Wrote it, upstreamed it
stack:
  - PHP
  - Phalcon
  - FRR
  - BGP
  - OPNsense
links:
  - label: The pull request
    url: https://github.com/opnsense/plugins/pull/5340
featured: true
order: 4
date: 2026-03-27
draft: true
---

## What I needed

I run BGP on my firewall so the DNS tier can advertise an anycast address. For traffic to actually spread across the available paths instead of committing to one, FRR wants `maximum-paths` set.

FRR has supported that for years. The OPNsense GUI didn't expose it.

## Why I couldn't just edit the file

The plugin generates `bgpd.conf` from its own model every time anything in that section is saved. Anything I typed in by hand would work until the next save and then quietly vanish.

That's the worst kind of fix. It works, so you stop thinking about it, and it breaks months later when you change something unrelated and can't remember why routing looks wrong. So it was upstream or nothing.

## What it took

Thirty-five lines across five files. Most of the work was finding out which five.

OPNsense plugins are layered and the layers are strict. A model file declares the field and what counts as a valid value. A form file says how it shows up in the GUI. A template renders it into the config the daemon actually reads. Miss one and you get a setting that saves and does nothing, or a config line with no way to set it.

I hadn't written PHP before and I'd never touched Phalcon. I didn't learn either one properly. I read the fields next to mine that already worked, figured out the shape from those, and followed it.

The change adds two fields, one for EBGP and one for IBGP, both marked advanced so they stay out of the way of people who will never need them. Values are bounded between 1 and 128. Leaving a field empty means FRR keeps its own default rather than getting a 1 written into the config, because those are not the same thing and the difference shows up at 2am.

## What happened

I opened it on 20 March. I wrote the documentation for it six days later, while it was still in review, which is the right order and not the order I usually manage. It merged on 27 March and shipped in plugin version 1.52.

The changelog credits me by username, which I did not expect and looked at for longer than I'd admit.
