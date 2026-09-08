---
title: Kubernetes Homelab
summary: What started as a way to watch movies now runs Kubernetes on Proxmox and Ceph. I keep finding things I want to try on it.
kind: infrastructure
role: Design and operation, with AI-assisted implementation
stack:
  - GitLab
  - Kubernetes
  - Talos Linux
  - ArgoCD
  - GitOps
  - Proxmox
  - Ceph
  - OpenTofu
  - Ansible
  - GPU time-slicing
featured: true
order: 4
date: 2026-03-01
draft: false
---

I like finding out how things work by running them myself. The lab gives me somewhere to do that, whether it's a new AI service or a self-hosted replacement for something I've been paying for. A fair amount of it looks like what a platform team might run, except there's one person responsible for it and it's in my house.

That does put some limits on what I want to take on. I use AI agents to help with implementation, and automation takes care of a lot of routine work, but I still need to understand what I'm running. I also want the configuration in git so I can work out how to rebuild something without relying on my memory. The data needs its own backups.

The workload cluster has nine Talos Linux nodes, three of them control plane. ArgoCD applies the application configuration from git. Underneath sits a five-node Proxmox cluster with Ceph; OpenTofu provisions the VMs and Ansible configures them. GitLab runs on a dedicated VM. That's where the repositories and container images live, where CI jobs run, and where I record the work. Linux runners cover x86-64 and ARM64, with macOS and Windows runners powered down until they're needed. I keep GitLab and the databases outside Kubernetes so I don't need a working Kubernetes cluster to reach the tools and data I'd use to recover it. They still share the infrastructure underneath.

## Some Choices Behind It

GPU sharing uses time-slicing so several workloads can use a card. NVIDIA's MPS was another option I considered, but its exclusive mode got in the way of the video encoding the media services needed. That ruled it out for this setup.

I like working through git because I can see what changed and go back to an earlier configuration. ArgoCD picks up the changes, and I check what happened after it applies them. CI also checks for secrets and vulnerable images before changes get that far.

Talos removes a lot of the host maintenance. There's no SSH or package manager on the nodes; I manage them through the API and their configuration. Prometheus and Alertmanager tell me when something needs attention. When a failure takes some figuring out, I keep the incident record and a runbook so I have somewhere to start next time.

## Moving from Swarm

Ten nodes, five managers and five workers, somewhere near fifty services across eleven stacks, on the same Proxmox and Ceph.

For the migration, I ran the new cluster alongside the old one and moved services over a stack at a time. Traffic moved after each stack was ready, and the old managers stayed up until nothing pointed at them. That let me move without losing service. The GPU nodes were repurposed Swarm workers.

Swarm had served me well. I'd started building tooling around its limits, though, and Kubernetes gave me more of what I wanted to try next. I still have backups of the old cluster.

## Leaving It Until Tomorrow

I want to be able to leave unfinished work in a state I understand and come back to it rested. The lab is fun, but I don't want every project to turn into a late night. Knowing what changed and what still needs doing helps me put it down.

## A Closer Look

- [A tour of the rack](https://probablyfine.dev/blog/a-tour-of-the-rack): the hardware, up close.
- [The lab, in full](https://probablyfine.dev/labs): the living inventory.
