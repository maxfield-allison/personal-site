---
title: Two Root Causes, One Bad Stick of RAM
summary: Nine months of a storage system quietly corrupting itself, two separate causes, and the one where I got lucky and said so.
date: 2024-03-22
draft: true
---

Through the summer of 2023 the machine that ran my media service kept getting worse. Not a clean failure. Locked out of things that were configured correctly, services that wouldn't come up, a general sense that the floor was soft.

I said in the group at one point that I was considering shutting the whole thing down. Then, in the same breath, that I had backups and the data was mostly intact, so starting fresh would cost me time rather than anything I couldn't replace. Both of those were true and it helped to write them next to each other.

## The first cause

August, after a hardware failure and then what looked like a power supply problem and then a decision to wipe it and rebuild: one stick of RAM with a single bad memory address.

It had been quietly corrupting things for a long time. Not enough to fall over, enough to leave damage that looked like a dozen unrelated problems. Memtest found it in an afternoon after I'd spent weeks not looking there.

## The second cause, which was the real one

Replacing the RAM didn't fix it, and that's the useful part.

I'd built the ZFS pool against `/dev/sdX` device names. Linux hands those out in whatever order it finds the disks, so across reboots my disks had been shuffling between vdevs. The pool was reporting around fifty thousand errors and sitting degraded, and I'd been reading that as a symptom of the bad memory.

It wasn't. It was a second, independent problem that the first one had been hiding. I rebuilt the pool addressing disks by their stable IDs instead. The eight-terabyte drives underneath it had over forty thousand power-on hours and hadn't done anything wrong.

## What I'd do differently

I let a plausible cause stop me looking. The RAM was real, and finding it felt like the end of the investigation rather than the middle.

Six months later the primary node was still crashing occasionally and I was still chasing it. When I finally got a stable run I told everyone straight out that I'd landed on it by luck and wasn't going to pretend otherwise, and asked them to tell me if anything still felt off, because a hundred people using the thing are better instrumentation than I am.

Then I pulled the GPU out entirely, said I'd leave it out for a month and put it back if nothing crashed, and warned people that streams might look worse in the meantime. That's the part I'd keep. One variable, a defined window, and the people affected told what it would cost them.
