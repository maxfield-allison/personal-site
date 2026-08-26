---
title: Kubernetes Homelab
summary: A 9-node Talos Linux Kubernetes cluster under GitOps, migrated off a 10-node Docker Swarm without losing service. The lab where I run the patterns instead of reading about them.
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
order: 5
date: 2026-03-01
---

## The short version

It started as a media server on a machine in my house. It's now nine Talos Linux nodes running Kubernetes, reconciled from git by ArgoCD, with about fifty applications under management.

I run it because operating something is the only way I've found to learn what it actually does when it breaks.

## What's in it

- **Control plane:** three dedicated nodes, so losing one doesn't take the cluster with it.
- **GPU workloads:** shared by time-slicing, so several workloads use a card instead of one pinning it. I evaluated NVIDIA's MPS first and rejected it, because its exclusive mode blocks the video encode engines the media stack depends on. That's a real trade-off with a real loser, and I'd rather say which one I picked than imply there wasn't a choice.
- **GitOps:** everything reconciles from git. A push is the deploy and a revert is the rollback.
- **Below the cluster:** five Proxmox nodes with Ceph underneath. OpenTofu provisions the machines, Ansible configures them.
- **CI that blocks:** the security scanning stops a commit that leaks a secret or ships a known-vulnerable image, rather than filing a warning nobody reads.

## The migration

The whole thing used to run on Docker Swarm, and that platform wasn't small. Ten nodes, five managers and five workers, somewhere around fifty services across eleven stacks, on the same Proxmox and Ceph underneath.

I moved it to Kubernetes without losing service. That meant standing the new cluster up alongside the old one, porting stack by stack, cutting traffic over a service at a time, and only decommissioning the old managers once nothing pointed at them. The GPU nodes were repurposed Swarm workers.

The reason for moving wasn't that Swarm had failed. It was that I'd started writing tooling to work around its limits, and building that tooling is how I worked out I'd reached them.

## Why it matters

Nobody vibe-codes a GitOps cluster into existence. Running this taught me the failure modes that slides don't: what a node dropping at 2am actually looks like, how storage behaves when it's unhappy, what one bad manifest does to a live service. That transfers directly to the enterprise work I do by day.

The test I hold it to is whether I can fix it at 2am without wanting to throw the laptop. Most of the time now, yes.

## Related reading

- [A tour of the rack](https://probablyfine.dev/blog/a-tour-of-the-rack): the hardware, up close.
- [The lab, in full](https://probablyfine.dev/labs): the living inventory.
