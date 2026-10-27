---
title: Vacancyd
summary: I had AI services that needed more compute and a powerful GPU already sitting in my workstation. Vacancyd makes the spare capacity available while keeping the owner in control.
kind: independent software
problem: AI services needed compute while an existing workstation had spare capacity its owner still needed to control.
outcome: Released a resource-admission service with owner controls, configurable reclaim behavior and documented Windows and Linux support.
role: Product policy, architecture decisions and releases; AI-assisted implementation
stack:
  - Rust
  - Windows services
  - Linux
  - TypeScript / Tauri
  - Containers
links:
  - label: Product
    url: https://vacancyd.com
  - label: GitHub
    url: https://github.com/maxfield-allison/vacancyd
  - label: Documentation
    url: https://docs.vacancyd.com
featured: true
order: 8
date: 2026-10-27
draft: true
---

## I already had the GPU

I was spinning up AI and machine-learning services on my Talos Kubernetes cluster and looking at another GPU for one of the nodes. Shopping for a 3090 was getting increasingly depressing as the weeks went by.

Eventually it clicked: I had a powerful GPU right in front of me. I wasn't using all of it all the time, even when I was sitting at the workstation. It could help with the services elsewhere in the lab. I wanted that spare capacity without turning my workstation into a hypervisor or another cluster node. The desktop still had its own job to do. My way of thinking about it was spare room: let other consumers use what's available, and give the owner control over when it is available. That became Vacancyd.

## Permission and capacity are different questions

An idle timer alone couldn't describe what I wanted. Being logged in doesn't mean I'm using the GPU, and locking the screen doesn't create more GPU memory. Watching a film, playing a game and working at the desk also put different demands on the machine.

I shaped the policy around those distinctions. Vacancyd sits in front of a dedicated inference server and decides whether to admit new work. It checks owner policy alongside the resources a request needs: GPU memory, system memory and CPU. When it cannot accept the request, it returns HTTP 503 with a reason and Retry-After, giving the caller a way to choose another backend.

That makes the workstation an optional source of capacity. The rest of the system needs somewhere else to send work when the owner wants the machine back.

## Borrowed work must not veto itself

One of the early problems showed why a simple GPU-utilization threshold was insufficient. Inference consumes the GPU. If every increase in utilization looks like owner activity, a borrowed job can trigger the very rule that refuses borrowing.

The Windows design moved toward attributing pressure to the owner's activity rather than treating the whole device as one number. I also wanted lending to remain possible while I was working when the resources were there. Presence at the desk didn't need to be a blanket refusal.

The owner console shows capacity and the reasons borrowing is being withheld, with manual controls when the owner wants to pause it.

![Vacancyd's owner console showing the resource overview and lending state with example data.](/images/projects/vacancyd-console-example.jpg)

*The actual console frontend rendered with synthetic example data. This is an interface illustration, not a measurement from my workstation.*

## Returning control needs a policy too

Deciding to stop admitting work is only part of the problem. A request may already be running when the owner returns.

I wanted a bounded drain as the default, with advanced choices to cancel immediately or let accepted work finish. The distinction matters because closing a connection does not prove the inference server stopped computing or released its memory. Vacancyd documents those limits instead of presenting cancellation as a guarantee it cannot make.

The same care applies to deployment. Requests sent directly to the inference server bypass the gate. That upstream needs to be dedicated to borrowing and kept out of reach of borrowers who could go around the policy.

## Prototype quickly, then make it a product

I owned the problem definition, policy decisions and releases, and directed AI agents for implementation, tests and documentation. I installed and exercised the service on my workstation, including lock/unlock behavior, upgrades and owner controls. That use kept exposing details a generic availability check would miss.

The architecture separates resource probes, presence signals and upstream adapters so supporting another workload doesn't require replacing the whole service. The public release covers documented routes for Ollama, ComfyUI, Chatterbox TTS, llama.cpp and OpenAI-compatible servers; it does not assume every server implements every route in the same way.

AI makes it possible for me to prove an idea quickly. The policy, failure behavior and adapter boundaries are where that prototype becomes a product I can keep developing.

## What shipped

[Vacancyd 1.0.0](https://github.com/maxfield-allison/vacancyd/releases/tag/v1.0.0) is published under Apache-2.0 with signed Windows delivery, Linux packages, container images and an owner console. Windows x86-64 and Linux x86-64 are supported; Linux ARM64 is a preview and macOS is not supported. Linux's activity detection is narrower than Windows', and there is no built-in TLS.

It gives the other services a way to ask for the workstation's spare room while leaving the owner in control. I can keep treating the machine as my workstation, with resource sharing expressed through an application and a policy rather than a change to what the computer is for.
