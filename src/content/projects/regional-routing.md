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

The platform runs in three regional clusters. Users are supposed to land on the closest one, because the alternative is somebody in Singapore waiting on a server in Ohio for something that should feel instant.

The way that worked was unglamorous. Three client configurations, one per region, and the device-management system decided which one a machine got based on where the machine was.

## What broke it

The customer moved device management to a cloud platform. Good change, nothing to do with us.

The new one didn't track the region or location of the machines it managed. It didn't need to for anything else they used it for. Our entire regional deployment strategy was resting on a field that had quietly stopped existing.

So three configurations were no longer deployable, because nothing could tell the machines apart. We could ship one to everybody and let two regions out of three have a worse time.

## The fix

If the client can't know where it is, the network can. I put a global load balancer in front of the three clusters and used an edge routing service to send each user to the nearest.

Three client configurations collapsed into one. The client stopped needing to know anything about geography, because the decision moved to a layer that already knew.

The part I didn't plan for turned out to matter more. Once traffic ran through a routing layer, that layer could also notice a sick regional cluster and send people somewhere else. We set out to get back the routing we'd lost and came away with regional failover we'd never had.

## What I'd say about it

My first instinct was to go find the missing dependency and put it back, and I spent a while on that. There were ways to get location into the client again. All of them meant maintaining something the customer had just deliberately stopped maintaining.

Moving the decision somewhere else was cheaper and it aged better. The routing layer has since been extended to watch for regional outages rather than just measure distance, which wasn't in the original design and didn't need to be.
