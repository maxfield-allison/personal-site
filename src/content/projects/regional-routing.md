---
title: The Migration That Broke Regional Routing
summary: Mid-build, the customer changed device management and quietly removed the field our whole regional deployment depended on. Change order, and about a week to find another way.
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

Three regional clusters, and users are supposed to land on the closest one. Somebody in Singapore waiting on a server in Ohio is a bad experience for something that should feel instant.

The way we were going to do that was three client configurations, one per region, with the device-management system handing each machine the right one based on where the machine was.

Then, still mid-implementation, the customer moved device management to a different platform. Good decision on their part, and it wasn't about us at all. The new one didn't track machine location, because nothing else they used it for needed that.

So the field our deployment strategy rested on stopped existing, and three configurations became undeployable, because nothing could tell the machines apart any more. Change order, and not much time.

## What we did instead

If the client can't know where it is, the network can. A global load balancer in front of the three clusters, and an edge routing service sending each user to the nearest one.

Three configurations collapsed into one. Geography stopped being the client's problem and became a decision made a layer up, by something that already had the answer.

We'd been solving for parity with the original design. What we got was better than the original design: once traffic ran through a routing layer, that layer could notice an unhealthy cluster and route around it. Regional failover, which hadn't been in scope.

I'd spent a while first trying to put the missing field back. There were ways. All of them meant maintaining something the customer had just deliberately stopped maintaining, which is a bad trade even when it works.
