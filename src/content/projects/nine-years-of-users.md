---
title: A Service for People Who Aren't Engineers
summary: Nine years of running a media service for friends and family, from twenty users to about a hundred. An experiment I ran on myself, and on everybody who depended on it.
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
draft: true  # HELD - Max: too obviously piracy, needs a rework
---

In 2017 I put a media server on a machine in my house so friends and family could watch things and so my wife and I could stop throwing money at 50 different streaming services for the one show they had that we wanted to binge. It ran until January 2026 and went from about twenty active users to roughly a hundred.

It was an experiment I forced on myself, and by extension on my wife, because the only way I know to actually learn something is to be on the hook for it. Every part of the application stack and platform underneath it was mine. Not to mention the instances where somebody messages you on a Friday night because the Game of Thrones season premier is giving them a cryptic

## Capacity was a bandwidth problem

Never the server. The upload from my house.

At 50 Mbps I could carry about four people watching at once before it started looking bad. Moving house got me a gigabit line and that went to roughly twenty-five. When the carrier turned on a faster tier later I worked out it would hold about eight simultaneous 4K streams, and said so before opening anything up.

I wasn't guessing at how many people I could take. I knew what a stream cost and what the pipe was, and I opened the doors when the number moved.

## The pricing I didn't go through with

By late 2019 it cost real money and I was covering all of it. So I wrote up a subscription, put actual numbers in front of everyone, and asked what they thought a fair monthly and yearly price was. I had a referral scheme sketched out and a plan to grandfather everyone who'd helped me test it.

Then there was a bad stretch of downtime, and charging people in the middle of that felt wrong, so I extended the free period instead. By the time I came back round to it I'd decided against the whole thing.

It stayed free. Donations covered my entire internet bill for a year at one point, which was more than I expected and considerably less hassle than running billing.

Working out the pricing was still worth doing. I know what it would have cost and who would have paid.

## Most of it was communication

Maintenance windows announced beforehand. When the upstream vendor got breached I passed it on the same day, because my users had accounts there and a password to change.

I ran a satisfaction poll once. Thirteen votes, all top marks, and I said in the thread that I knew it was still rough in places and wouldn't be upset by a lower one.

Before the big storage migration I moved 78 TB to cloud storage, then wiped and rebuilt. The disks hadn't failed. They were five years old and I could see where that goes.

Cutting over to the rebuilt platform, I moved the most active users first, in batches. And through one bad month I made myself stop touching anything during the hours people actually watched, which I'm better at now than I was then.

## Shutting it down

January 2026. I told everyone I was scaling it back, said it had gotten expensive, and pointed people at how to reach me. Then I did it.

Nine years and it ended on a post rather than an outage I never came back from. I'd never deliberately retired anything before.
