---
title: The Case for a Test Environment
summary: A global platform with nowhere to test changes, and the months it took to argue one into existence. The design was the easy part.
kind: enterprise
role: Made the case, wrote the design, ran it to approval
stack:
  - Azure
  - Global load balancing
  - Cost modeling
  - Change management
featured: true
order: 1
date: 2025-03-01
draft: true
---

## The problem

I own an output-management platform that runs in three regions for a large global organization. Thousands of devices depend on it. When it stops, people can't print, and in parts of that business printing isn't optional.

It had no test environment. Every change went straight to production. Upgrades, routing changes, service-account work, all of it.

Nobody had decided it should be that way. The people who built it joined late to rescue a deployment that was already in trouble, and a test environment was one of the things that fell off. There was no record of the decision because there was never a decision.

## Asking the wrong team first

I started with the cloud operations group, because they run the environment day to day. They pointed out that standing up something new isn't their job. That belongs to the architecture and engineering side, and it has its own intake process.

That cost me a couple of weeks and it was my mistake. I'd been treating this as a technical problem when it was a procurement problem wearing a technical hat. In an organization that size, finding the right door is most of the work.

## The ask

I wrote the first proposal in October, and I tried to answer the objections before anyone raised them.

Clone production into smaller machines, so the shape matches but the bill doesn't. Keep the load balancer and routing configuration identical, because an environment that routes differently tests the wrong thing. Lock it down so it can't be reached by accident, but leave a path for authorized access, because some of what I need to test is what a real user hits. Give me administrator access in the test environment and change nothing about my access in production.

That last one mattered more than it looks. Asking for less access than I could have asked for is what kept the security conversation short.

## The argument

The customer's cloud engineer came back with a costed estimate in December. I spent the winter walking it through the infrastructure, operations and architecture groups. In February I sent the decision maker the as-built design, the backup guide and a status summary, because I wanted them reading the documentation before I asked for money rather than after.

The deck went in that March, co-presented with the customer's own architect. Three slides did the work.

The first named the specific changes that were waiting on the environment, so the ask wasn't abstract. The second answered the question I knew was coming, which is why a platform this size didn't already have one. I said it was a legacy gap, explained how it happened, and didn't blame anybody for it. We were correcting it. That was the whole story.

The third was the money. I priced it three ways: running all the time, running about forty hours a month, and sitting idle with the machines deallocated. Full tilt came to single-digit thousands a month. Shut down between test runs it was roughly a third of that. I also compared bringing in professional services against building it with the team we had, because "we can do this ourselves and it takes longer" is a real option and pretending otherwise wastes everyone's time.

The closing line was the argument. Even at full price, this is small against one production incident.

## What happened

It was approved. The build went into the customer's service catalogue, and the environment is being scoped now, down to a minimum viable copy of two regional clusters so it stays cheap enough to keep.

First email to approval was about five months. First email to a running environment is closer to nineteen and still counting. I don't think that's unusual, but I hadn't understood it before I lived it.
