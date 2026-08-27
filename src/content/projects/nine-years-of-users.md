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
order: 5
date: 2026-01-30
draft: true
---

## What it was

In 2017 I put a media server on a machine in my house so friends and family could watch things. It ran until January 2026. It went from about twenty active users to roughly a hundred, all people I know, none of them engineers.

I've run production systems at work for years. This is the one where I owned every part of it, including the part where somebody messages you on a Saturday because it's broken and doesn't care why.

## Capacity was a bandwidth problem

Never the server. The upload from my house.

At 50 Mbps I could carry about four people watching at once before it started looking bad. Moving house got me a gigabit line and that went to roughly twenty-five. When the carrier later turned on a faster tier I worked out it would hold about eight simultaneous 4K streams, and said so before opening it up.

I wasn't guessing at how many users I could take. I knew what one stream cost and what the pipe was.

## The pricing I didn't go through with

By late 2019 it cost real money and I was covering all of it. So I wrote up a subscription, put actual numbers in front of the group, and asked them what they thought a fair monthly and yearly price was. I had a referral scheme sketched and a plan to grandfather everyone who'd helped test it.

Then there was a bad stretch of downtime, and starting to charge in the middle of that felt wrong, so I extended the free period instead. By the time I came back to it I'd decided not to do it at all.

It stayed free. Donations covered the internet bill for an entire year at one point, which was more than I expected and a lot less trouble than running billing would have been.

I still think working out the pricing was worth doing. Deciding not to charge isn't the same as never having done the math.

## Running it like it mattered

Most of what I learned was communication.

Maintenance windows announced before, not after. When the upstream vendor got breached I passed it on the same day, because my users had accounts there and a password to change. I ran a satisfaction poll once, got thirteen votes and all top marks, and said in the thread that I knew it was still rough in places and wouldn't be upset by a lower one.

Before the big storage migration I moved 78 TB off to cloud storage, then wiped and rebuilt. The disks hadn't failed. They were five years old and I could see where it was going.

Cutting over to the rebuilt platform, I moved the most active users first, in batches. And during one bad month I made myself stop touching things during the hours people actually watched. I'm better at that now than I was then.

## Shutting it down

January 2026 I told everyone I was scaling it back, said it had gotten expensive, and pointed people at how to reach me. Then I did it.

Nine years, one announcement, and no outage that quietly turned permanent because I'd stopped paying attention. I'd never deliberately retired anything before.
