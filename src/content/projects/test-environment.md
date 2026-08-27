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
order: 2
date: 2025-03-01
draft: true
---

## The problem

I own an output-management platform running in three regions for a large global organization. Thousands of devices depend on it. When it stops, people can't print, and in parts of that business printing isn't optional.

There was no test environment. Every change went straight to production. Upgrades, routing changes, service-account work, all of it.

Nobody had decided that. The people who built it came in late to rescue a deployment that was already in trouble, and a test environment was one of the things that fell off the truck. There's no record of the decision because there wasn't one.

## I asked the wrong team first

I went to cloud operations, because they run the thing day to day. They told me kindly that standing up new environments isn't theirs. That's architecture and engineering, and they have an intake process.

Two weeks, and my fault. I'd been treating this as a technical problem and it was a procurement problem wearing a technical hat.

## The ask

I wrote the first proposal in October and tried to answer the objections before anyone had to raise them.

Clone production into smaller machines, so the shape matches and the bill doesn't. Keep the load balancer and routing config identical, because an environment that routes differently tests the wrong thing. Lock it down so nobody reaches it by accident, but leave a path for authorized access, because some of what I need to test is what a real user hits. Give me admin in the test environment and change nothing about my access in production.

That last one did more work than it looks like. Asking for less than I could have asked for is why the security conversation was short.

## The argument

Their cloud engineer came back with a costed estimate in December. I spent the winter walking it through infrastructure, operations and architecture. In February I sent the decision maker the as-built design, the backup guide and a status summary, because I wanted them reading the documentation before I asked for money instead of after.

The deck went in that March, co-presented with their own architect. Three slides did the work.

The first listed the specific changes that were stuck waiting on the environment, so the ask wasn't theoretical. The second answered the question I knew was coming, which is why a platform this size doesn't already have one. Legacy gap. Here's how it happened. Nobody's fault, we're fixing it.

The third was money. Three ways: running all the time, running about forty hours a month, and idle with the machines deallocated. Full tilt was single-digit thousands a month. Shut down between test runs, about a third of that. I priced bringing in professional services against building it ourselves too, because "we can do this in-house and it takes longer" is a real option and pretending otherwise wastes everyone's afternoon.

Then the line the whole thing rested on. Even at full price, this is small next to one production incident.

## What happened

Approved. The build went into their service catalogue and it's being scoped now, down to a minimum viable copy of two regional clusters so it stays cheap enough that nobody comes looking for it during a budget review.

First email to approval was five months. First email to a running environment is closer to nineteen and still counting.
