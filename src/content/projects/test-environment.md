---
title: The Case for a Test Environment
summary: Every change went straight to production. I wanted somewhere to test first, and getting it approved took five months.
kind: enterprise
role: Business case, design and sizing; platform teams own provisioning
stack:
  - Azure
  - Global load balancing
  - Cost modeling
  - Change management
featured: true
order: 2
date: 2025-03-01
draft: false
---

At the time, the output-management platform I own ran in three regions for a large global organization. Thousands of devices depended on it. When it stopped, people couldn't print, and in major parts of that business printing wasn't optional.

There was no test environment. Every change went straight to production. Upgrades, routing changes, service-account work, all of it.

## How It Got That Way

The build started on-premises. A year in, the business decided to move to the cloud, and I came onto the account right as they were spinning up the cloud resources. About two years from signature to a working solution, with the first year's on-premises version essentially scrapped. They were also coming off a legacy print product and roughly thirty Windows print servers at the same time.

Nobody chose to skip non-prod in the middle of that. It fell off. There's no record of the decision and as far as I can tell there wasn't one to record.

That period also involved tracking DNS failures into firewall configuration owned by other teams. I worked with the vendor and the customer's security group to get those faults corrected. We had enough to work through without making production the only place to try a change.

## Asking the Wrong Team

Cloud operations run the environment day to day, so I went to them. Standing up something new isn't theirs. That belongs to the architecture and engineering side, which is a slimmer group working with the customer's decision makers and whichever cloud vendor holds the contract that year. They have their own intake process.

I lost two weeks finding that out. I'd gone to the people who could run it without first finding the people who could approve it.

## Asking for the Money

I sent the proposal in October. Most of it was about keeping the environment useful without paying to duplicate all of production's capacity.

Clone production onto lower-resourced SKUs, so the environment matches and the bill doesn't. Keep the load balancer and routing configuration identical, because network routing will sneak up and bite you. Lock it down so nobody reaches it by accident, but leave a path for authorized access, because some of what I need to test is what a real user hits. Administrator access in the test environment, and no change at all to my access in production.

Their cloud engineer came back with a costed estimate in December. I spent the winter walking it through infrastructure, operations and architecture, and in February sent the decision maker the technical design, the runbook draft and a status summary. I wanted them reading the documentation before I asked for money rather than after.

By the time the deck was presented that March, the company had decided on major changes that had paused my efforts. So I made the same argument, to a slightly different room.

Three slides did the work. The first listed the specific changes stuck waiting on the environment, so the ask wasn't theoretical. The second answered the question I knew was coming, which is why a platform this size doesn't already have one. Legacy gap, here's how it happened, nobody's fault, we're fixing it. The third covered the budgetary question, priced three ways: running constantly, running about forty hours a month, and idle with the VMs deallocated. Full tilt came to single-digit thousands a month. Shut down between test runs, about a third of that. I priced professional services against building it ourselves too, because in-house-and-slower is a real option.

Even at full price, I could make the case that it would cost less than a production incident.

## What Got Approved

Five months after the first email, the proposal was approved and went into the customer's service catalogue for scoping. By that point we'd narrowed it to a smaller copy of two regional clusters to keep the cost down. I owned the business case and the design and sizing across three organizations. The platform teams own provisioning, which was still ahead of us.
