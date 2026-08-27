---
title: The Issue a Bot Closed
summary: A BGP option nobody had gotten around to exposing, an issue that timed out after six months, and the eight days between it closing and me picking it up.
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
order: 3
date: 2026-03-27
draft: false
---

Somebody opened it in August 2025. They wanted `maximum-paths` for BGP exposed in the OPNsense GUI, which FRR has supported for years and the interface simply never surfaced.

A bot marked it low priority within twenty minutes for not using an issue template. Then somebody else turned up who wanted the same thing and did their homework about it. They included links to the FRR documentation, full lab topology, and `vtysh` output showing multipath routes actually installed. The maintainers said, reasonably, that a pull request was what this needed and it should be tightly scoped.

Nobody wrote one. In February 2026 the bot closed the issue automatically after a hundred and eighty days of inactivity.

## Eight days later

I needed the same thing. My DNS tier advertises an anycast address over BGP and without `maximum-paths` the traffic commits to one path instead of spreading across the ones available.

So I said I'd do it, and asked whether anyone else was already on it so we wouldn't duplicate the work. Five people reacted to that comment. I had not expected five people to be sitting on a closed issue waiting.

I tested some changes and did the manual implementation for my own network and then got sidetracked for six weeks, which somebody eventually asked about in the thread. My bad.

## Thirty-five lines, five files

I'd written and learned some PHP for OPNsense once before, adding a maximum packet length field to the traffic shaper, so the framework wasn't brand new territory. That said, it's still strictly layered. A model file declares the field and what counts as a valid value. A form file says how it appears. A template renders it into the config the daemon reads. Miss any of these and you end up with a setting that saves and does nothing, or a config line with no way to set it.

I read the fields on either side of mine that already worked, copied how they were put together, and tested it on my secondary firewall.

Two fields, EBGP and IBGP, both marked advanced. Bounded one to 128. Empty leaves FRR on its own default instead of writing a 1.

## What the thread did next

I got told off for deleting the pull request template, which was fair. Somebody hit merge conflicts on my branch and let me know, mentioning they were hand-editing their config files in the meantime and hated it. A maintainer posted an `opnsense-patch` command so people could run my unmerged commit on their own firewalls, which I hadn't thought to offer.

A maintainer reviewed it and asked for documentation. I wrote that the next day. Four suggestions came back and I applied all four.

It merged on 27 March and shipped in plugin version 1.52. Two people came back afterwards to say ECMP was working on their setups.

The changelog credits me by username, and my username is my name. It's a good feeling every time. Needing something, finding out other people need it too, building it, and then closing an issue you didn't open and other people had been waiting on.
