---
title: Kubernetes Homelab
summary: Nine Talos nodes, GitOps, Ceph underneath, migrated off a ten-node Docker Swarm without losing service. Enterprise patterns, one operator, and no team to hand it to at five o'clock.
kind: infrastructure
role: Designed, built, and operate it
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

The whole thing is built to one constraint: get as close to how a real platform team does it as I can, using open source, while being pragmatic about the fact that there is exactly one of me (though AI is now impacting that fact to a measurable degree...)

That guideline helps to rule things out. Anything that needs more than one person on call doesn't work here. Anything I can't rebuild from git after a bad night doesn't work here either. What's left is a lot of automation and a strong preference for boring that I certainly didn't have when I was younger.

It's nine Talos Linux nodes now, three of them control plane, with about fifty applications reconciled out of git by ArgoCD. Underneath sits a five-node Proxmox cluster with Ceph. OpenTofu provisions the VMs and Ansible configures them.

GitLab sits at the center of it on a dedicated VM. It is the GitOps source, container registry, CI control plane, and durable record for operational work. Linux runners cover x86-64 and ARM64. The macOS and Windows runners stay powered down until a job needs them. GitLab and the databases stay outside Kubernetes so a broken workload cluster cannot take down its own source of truth or stateful services with it. It is still a single-operator data center under the stairs.

- **GPU sharing** by time-slicing, so several workloads can use a card instead of one pinning to it. I looked at NVIDIA's MPS first and turned it down: its exclusive mode blocks the video encode engines the media stack needs. Picking one meant losing something either way.
- **A push is the deploy** and a revert is the rollback. The most wonderful operational model and the biggest reason one person can run this.
- **CI that actually blocks.** GitLab CI blocks a merge when secret scanning or a known-vulnerable dnsweaver image fails.
- **Talos** because there's no SSH and no package manager to drift. The node is an API and a config file. Less of it can rot while I'm not paying attention to it.
- **Monitoring with consequences.** Prometheus and Alertmanager page me. Runbooks and incident records mean I don't have to solve the same failure twice.

## The Swarm it replaced wasn't small

Ten nodes, five managers and five workers, somewhere near fifty services across eleven stacks, on the same Proxmox and Ceph.

I moved it without losing service: new cluster alongside the old, port a stack, cut traffic over, repeat, and only decommission the old managers once nothing pointed at them. The GPU nodes were repurposed Swarm workers.

The reason for moving wasn't that Swarm had failed me. It's that I'd started writing tooling to paper over its limits. Docker Swarm is an excellent tool, I still have backups of the old cluster.

## The test I hold it to

Can I step away from my desk in the middle of an issue or a rollout and get to bed at a reasonable hour, leaving anything outstanding to the rested and caffeinated me the next morning? Now, 100% of the time.

## Related reading

- [A tour of the rack](https://probablyfine.dev/blog/a-tour-of-the-rack): the hardware, up close.
- [The lab, in full](https://probablyfine.dev/labs): the living inventory.
