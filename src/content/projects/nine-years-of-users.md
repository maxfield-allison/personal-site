---
title: A Service for People Who Aren't Engineers
summary: Nine years running a self-hosted service for friends and family, from twenty users to about a hundred. Capacity, comms, pricing, incidents and a planned shutdown, for people who complain when it breaks.
kind: operations
role: Built it, ran it, retired it
stack:
  - Linux
  - ZFS
  - Proxmox
  - Docker
  - Capacity planning
featured: true
order: 4
date: 2026-01-30
draft: true
---

## What it was

In 2017 I stood up a media server on a machine in my house so friends and family could watch things. It ran until January 2026. Over that time it went from about twenty active users to roughly a hundred, all of them people I know, none of them engineers.

I've run production systems at work for years. This is the one where I owned every part of it, including the part where somebody messages you on a Saturday because it's broken and they don't care why.

## Capacity was a bandwidth problem

The constraint was never the server. It was the upload from my house.

At 50 Mbps I could support about four people watching at once before quality started to suffer. When I moved and got a gigabit line, that went to roughly twenty-five. Later, when the carrier turned on a faster tier, I worked out it would carry about eight simultaneous 4K streams and told people so.

That arithmetic is the whole job. I wasn't guessing at how many users I could take. I knew what one stream cost and what the pipe was, and I opened access when the number moved.

## The pricing decision I didn't go through with

By late 2019 the thing cost real money to run and I was covering it. I wrote up a subscription model, put actual numbers in front of the group, and asked them what they thought a fair monthly and annual price would be. I had a referral scheme sketched out and a plan to grandfather everyone who'd helped test it.

Then there was a stretch of downtime, so I extended the free period rather than start charging into a bad month. When I came back to it I decided not to do it at all. It stayed free, funded by whoever felt like donating.

That turned out fine. At one point the donations had covered the internet bill for the entire preceding year, which is more than I expected and considerably less than a billing system would have cost me to run.

I still think the pricing work was worth doing. Deciding not to charge is a different thing from never having worked out what charging would look like.

## Running it like it mattered

Most of what I learned here was communication, not engineering.

I announced maintenance windows before they happened rather than after. When the upstream vendor had a credential breach I passed it on the same day, because my users had accounts there and a password to change. I ran a satisfaction poll once and got thirteen votes, all top marks, and said in the thread that I knew it was still rough in places and wouldn't be upset by a lower score.

Before the big storage migration I moved 78 TB off to cloud storage first, then wiped and rebuilt. The disks hadn't failed. They were five years old and I could see where that was going.

When I cut over to the rebuilt platform I moved the most active users first, in batches, rather than everyone at once. During a bad stretch I made myself stop changing things during the hours people actually watched, which is a discipline I'm better at now than I was then.

## Shutting it down

In January 2026 I told everyone I was scaling it back, explained that it had gotten expensive, and pointed people at how to reach me. Then I did it.

Nine years, one announcement, no surprise outage that quietly became permanent. Retiring a service on purpose was a thing I'd never done, and it's harder than starting one. There's no milestone and nobody thanks you for it.
