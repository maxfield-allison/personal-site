---
title: The Case for a Test Environment
summary: A global platform with nowhere to test changes, and the months it took to argue non-prod into existence. The design was the easy part.
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
draft: false
---

I own an output-management platform running in three regions for a large global organization. Thousands of devices depend on it. When it stops, people can't print, and in major parts of that business printing isn't optional.

There was no test environment. Every change went straight to production. Upgrades, routing changes, service-account work, all of it.

## How it got that way

The build started on-premises. A year in, the business decided to move to the cloud, and I came onto the account right as they were spinning up the cloud resources. About two years from signature to a working solution, with the first year's on-premises version essentially scrapped. They were also coming off a legacy print product and roughly thirty Windows print servers at the same time.

Nobody chose to skip non-prod in the middle of that. It fell off. There's no record of the decision and as far as I can tell there wasn't one to record.

That period is also where I found a firewall sitting close enough to its state limit that it would have started dropping connections under load, and DNS rules that were generating storms against their own resolvers. Both would have taken down services that had already migrated. Neither was mine to own.

## Asking the wrong team

Cloud operations run the environment day to day, so I went to them. Standing up something new isn't theirs. That belongs to the architecture and engineering side, which is a slimmer group working with the customer's decision makers and whichever cloud vendor holds the contract that year. They have their own intake process.

Two weeks, and my fault. I'd been treating this as a technical problem when it was a procurement problem.

## The ask

October. I wrote it to answer the objections before anyone had to raise them.

Clone production onto lower-resourced SKUs, so the environment matches and the bill doesn't. Keep the load balancer and routing configuration identical, because network routing will sneak up and bite you. Lock it down so nobody reaches it by accident, but leave a path for authorized access, because some of what I need to test is what a real user hits. Administrator access in the test environment, and no change at all to my access in production.

Their cloud engineer came back with a costed estimate in December. I spent the winter walking it through infrastructure, operations and architecture, and in February sent the decision maker the technical design, the backup guide and a status summary. I wanted them reading the documentation before I asked for money rather than after.

By the time the deck went in that March, the company had decided not to split itself in half after all and had changed cloud vendors. Same argument, different room.

Three slides did the work. The first listed the specific changes stuck waiting on the environment, so the ask wasn't theoretical. The second answered the question I knew was coming, which is why a platform this size doesn't already have one: legacy gap, here's how it happened, nobody's fault, we're fixing it. The third was money, priced three ways: running constantly, running about forty hours a month, and idle with the VMs deallocated. Full tilt came to single-digit thousands a month. Shut down between test runs, about a third of that. I priced professional services against building it ourselves too, because in-house-and-slower is a real option.

Then the fact the whole argument rested on. Even at full price, this is nothing compared to one production incident.

## Where it is

Approved. The build went into the customer's service catalogue and it's being scoped now, down to a minimum viable copy of two regional clusters so it stays cheap enough that nobody comes looking for it at budget time.

First email to approval, five months. First email to a running environment, nineteen and counting.
