---
title: Kubernetes Homelab
summary: A 9-node Talos Linux Kubernetes cluster running around 38 services under GitOps, migrated from Docker Swarm without losing service. My working lab for the patterns real infrastructure teams use.
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
order: 2
date: 2026-03-01
---

## The short version

It started as a Plex server. It is now a 9-node Kubernetes cluster on Talos
Linux, managed with ArgoCD, running around 38 services. I use it to learn the
patterns real infrastructure teams use by operating them, not by reading about
them.

## What's in it

- **Control plane:** 3 dedicated nodes, so losing one doesn't take the cluster
  down.
- **GPU workloads:** shared via time-slicing, so several workloads use a card
  instead of one hogging it. I evaluated NVIDIA MPS and rejected it, because its
  exclusive mode blocks the video encode engines the media stack needs.
- **GitOps:** everything reconciles from git through ArgoCD. A push to the repo is
  the deploy. Rollback is a git revert.
- **Below the cluster:** it all runs on a five-node Proxmox cluster with Ceph
  storage underneath. OpenTofu provisions the VMs and LXCs, Ansible configures the
  platform. Infrastructure as code, all the way down.
- **CI that blocks bad commits:** security scanning runs in the pipeline and stops
  anything that leaks secrets or ships a known-vulnerable image.

## The migration

The whole thing used to run on Docker Swarm. I moved it to Kubernetes (I call it
Evolution 3) without losing service along the way. That meant standing up the new
cluster, porting each stack, cutting traffic over service by service, and
decommissioning the old managers once nothing depended on them. GPU nodes were
repurposed from the old Swarm workers.

## Why it matters

Nobody vibe-codes a GitOps Kubernetes cluster into existence. Running this taught
me the failure modes that slides never do: what happens at 2am when a node drops,
how storage behaves under pressure, what a bad manifest does to a live service.
That knowledge transfers straight to the enterprise Azure work I do by day.

The honest test I hold it to: can I fix it at 2am without wanting to throw my
laptop. Most of the time now, yes.

## Related reading

- [A tour of the rack](https://probablyfine.dev/blog/a-tour-of-the-rack): the hardware behind the cluster.
- [The lab, in full](https://probablyfine.dev/labs): the living hardware inventory.
