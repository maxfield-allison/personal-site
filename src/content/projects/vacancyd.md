---
title: Vacancyd
summary: I had AI services that needed more compute and a powerful GPU already sitting in my workstation. Vacancyd makes the spare capacity available while keeping the owner in control.
license: https://www.apache.org/licenses/LICENSE-2.0
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
draft: false
---

## I already had the GPU

I was spinning up AI and machine-learning services on my Talos Kubernetes cluster and looking at another GPU for one of the nodes. Shopping for a 3090 was getting increasingly depressing as the weeks went by.

Eventually it clicked: I had a powerful GPU right in front of me. I wasn't using all of it all the time, even when I was sitting at the workstation. It could help with the services elsewhere in the lab. I wanted that spare capacity without turning my workstation into a hypervisor or another cluster node. The desktop still had its own job to do. I thought of it as spare room: let other services use what's available, with the owner deciding when they can use it. That became Vacancyd.

## Permission and capacity are different questions

An idle timer alone couldn't tell me whether the machine had room to lend. Being logged in doesn't mean I'm using the GPU, and locking the screen doesn't create more GPU memory. Watching a movie, playing a game and working at the desk also put different demands on the machine.

Those differences shaped the policy. Vacancyd sits in front of a dedicated inference server and decides whether to admit new work. It checks owner policy and the resources a request needs: GPU memory, system memory and CPU. When it cannot accept the request, it returns HTTP 503 with a reason and Retry-After, giving the caller a way to choose another backend.

That makes the workstation an optional source of capacity. The rest of the system needs somewhere else to send work when the owner wants the machine back.

## Borrowed work must not veto itself

One of the early problems showed why a simple GPU-utilization threshold wasn't enough. Inference consumes the GPU. If every increase in utilization looks like owner activity, a borrowed job can trigger the very rule that refuses borrowing.

On Windows, Vacancyd distinguishes the owner's GPU activity from borrowed work. I still wanted it to lend while I was working if there was room.

The owner console shows available capacity, explains why it won't accept borrowed work, and lets the owner pause lending.

<figure>
  <a href="/images/projects/vacancyd-console-example.jpg" aria-label="Open the full-size Vacancyd console example">
    <img src="/images/projects/vacancyd-console-example.jpg" alt="Vacancyd's owner console showing resource capacity and lending status with example data." width="1440" height="760" loading="lazy" decoding="async" />
  </a>
  <figcaption>The console frontend with example data, not measurements from my workstation. <a href="/images/projects/vacancyd-console-example.jpg">Open the full-size console example.</a></figcaption>
</figure>

## Returning control needs a policy too

Deciding to stop admitting work is only part of the problem. A request may already be running when the owner returns.

I wanted the default to give running work a limited time to finish, with options to cancel immediately or let it finish without a time limit. The distinction matters because closing a connection does not prove the inference server stopped computing or released its memory.

The deployment matters too. Requests sent directly to the inference server bypass the gate. The inference server needs to be dedicated to borrowing, and borrowers must not be able to reach it directly.

## Prototype quickly, then make it a product

I owned the problem definition, policy decisions and releases, and directed AI agents for implementation, tests and documentation. I installed and used the service on my workstation, including lock/unlock behavior, upgrades and owner controls.

The architecture separates resource probes, presence signals and upstream adapters so supporting another workload doesn't require replacing the whole service. The public release covers documented routes for Ollama, ComfyUI, Chatterbox TTS, llama.cpp and OpenAI-compatible servers; it does not assume every server implements every route in the same way.

AI makes it possible for me to prove an idea quickly. Then I can work through the policy, failure cases and interfaces that make it a product I can keep developing.

## What shipped

[Vacancyd 1.0.0](https://github.com/maxfield-allison/vacancyd/releases/tag/v1.0.0) is published under Apache-2.0 with signed Windows delivery, Linux packages, container images and an owner console. Windows x86-64 and Linux x86-64 are supported; Linux ARM64 is a preview and macOS is not supported. Linux's activity detection is narrower than Windows', and there is no built-in TLS.

Other services can use the workstation's spare capacity, and I can keep using it as my workstation. The app handles when that sharing is allowed.
