---
title: The Migration That Broke Regional Routing
summary: A device-management change quietly removed the thing our regional deployment depended on. The fix routed around it and left the platform more resilient than before.
kind: enterprise
role: Designed the change and drove it through
stack:
  - Azure
  - Global load balancing
  - Geo-routing
  - MDM
featured: true
order: 3
date: 2024-02-01
draft: true
---

## What we had

The platform runs in three regional clusters. Users are supposed to land on the one closest to them, because the alternative is somebody in Asia waiting on a server in the United States for something that should be instant.

The way that worked was unglamorous. We shipped three different client configurations, one per region, and the device-management system decided which one a machine got based on where the machine was.

## What broke it

The customer moved device management from their old platform to a cloud-based one. That was a good change and it had nothing to do with us.

The new system didn't track the region or location of the machines it managed. It didn't need to for anything else the customer used it for. But our entire regional deployment strategy was built on a field that had quietly stopped existing.

Three client configurations were no longer deployable, because nothing could tell them apart. We could ship one configuration to everybody, which meant one region's users would have a fast experience and the other two wouldn't.

## The fix

If the client can't know where it is, the network can. I put a global load balancer in front of the three regional clusters and used an edge routing service to send each user to the nearest one.

That collapsed three client configurations into one. The client stopped needing to know anything about geography, because the decision moved to a layer that already knew.

The part I didn't plan for is the part that turned out to matter most. Once traffic was flowing through a routing layer, that layer could also tell when a regional cluster was unhealthy and send users somewhere else. We'd set out to recover the routing we lost and ended up with regional failover we'd never had.

## What I'd say about it

The instinct when a dependency disappears is to go find it again, and I spent some time trying to. There were ways to put location back into the client, and all of them meant maintaining a thing the customer had deliberately stopped maintaining.

Moving the decision somewhere else was the cheaper answer, and it aged better. The routing layer has since been extended to detect regional outages rather than just measure distance, which wasn't in the original design and didn't need to be.
