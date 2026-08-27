---
title: Kubernetes Homelab
summary: Nine Talos nodes, GitOps, Ceph underneath, migrated off a ten-node Docker Swarm without losing service. Enterprise patterns, one operator, and no team to hand it to at five o'clock.
kind: infrastructure
role: Designed, built, and operate it
stack:
  - Kubernetes
  - Talos Linux
  - ArgoCD
  - GitOps
  - OpenTofu
  - Ansible
  - GPU time-slicing
featured: true
order: 6
date: 2026-03-01
draft: true
---

The whole thing is built to one constraint: get as close to how a real platform team does it as I can, using open source, while being honest that there is exactly one of me.

That rules things out. Anything that needs a rota doesn't work here. Anything I can't rebuild from git after a bad night doesn't work here either. What's left is a lot of automation and a strong preference for boring, and that turns out to be most of what the patterns are for anyway.

It's nine Talos Linux nodes now, three of them control plane, with about fifty applications reconciled out of git by ArgoCD. Underneath sits a five-node Proxmox cluster with Ceph. OpenTofu provisions the machines and Ansible configures them.

- **GPU sharing** by time-slicing, so several workloads use a card instead of one pinning it. I looked at NVIDIA's MPS first and turned it down: its exclusive mode blocks the video encode engines the media stack needs. Picking one meant losing something either way.
- **A push is the deploy** and a revert is the rollback. That's the entire operational model and it's the single biggest reason one person can run this.
- **CI that actually blocks.** Security scanning stops a commit that leaks a secret or ships a known-vulnerable image, rather than filing a warning I'd learn to scroll past.
- **Talos** because there's no SSH and no package manager to drift. The node is an API and a config file. Less of it can rot while I'm not looking.

## The Swarm it replaced wasn't small

Ten nodes, five managers and five workers, somewhere near fifty services across eleven stacks, on the same Proxmox and Ceph.

I moved it without losing service: new cluster alongside the old, port a stack, cut traffic over, repeat, and only decommission the old managers once nothing pointed at them. The GPU nodes were repurposed Swarm workers.

The reason for moving wasn't that Swarm had failed me. It's that I'd started writing tooling to paper over its limits, and building that tooling is how I found out where the limits were.

## The test I hold it to

Can I fix it at two in the morning without wanting to throw the laptop across the room. Most of the time now, yes.

## Related reading

- [A tour of the rack](https://probablyfine.dev/blog/a-tour-of-the-rack): the hardware, up close.
- [The lab, in full](https://probablyfine.dev/labs): the living inventory.
