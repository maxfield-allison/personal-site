---
title: Two Root Causes, One Bad Stick of RAM
summary: Nine months of a storage system quietly corrupting itself, two separate causes, and the one where I got lucky and said so.
date: 2024-03-22
draft: true
---

Through the summer of 2023 the machine running my media service kept getting worse. Not a clean failure. Locked out of things that were configured correctly, services that wouldn't come up, a general sense that the floor was soft.

I told the group at one point I was considering shutting the whole thing down. Then in the next line, that I had backups and the data was mostly intact, so starting over would cost me time and not much else. Both true, and it helped to see them next to each other.

## The first cause

August, after a hardware failure and then what looked like a power supply and then deciding to wipe it and start clean: one stick of RAM with a single bad memory address.

It had been quietly corrupting things for a long time. Never enough to fall over. Enough to leave damage that looked like a dozen unrelated problems. Memtest found it in an afternoon, after I'd spent weeks not looking there.

## The second cause, which was the real one

New RAM didn't fix it. That's the useful part.

I'd built the ZFS pool against `/dev/sdX` names. Linux hands those out in whatever order it finds the disks, so across reboots mine had been shuffling between vdevs. The pool was reporting around fifty thousand errors and sitting degraded, and I'd been reading that as fallout from the bad memory.

It wasn't. It was a second, independent problem the first one had been hiding. I rebuilt the pool addressing disks by their stable IDs. The 8 TB drives underneath had over forty thousand power-on hours and hadn't done anything wrong.

## What I'd do differently

I let a plausible cause stop me looking. The RAM was real, and finding it felt like the end of the investigation instead of the middle of it.

Six months later the primary node was still crashing now and then. When I finally got a stable run I told everyone straight out that I'd landed on it by luck and wasn't going to pretend otherwise, and asked them to say something if anything still felt off. A hundred people using the thing are better instrumentation than I am.

Then I pulled the GPU out, said I'd leave it out for a month and put it back if nothing crashed, and warned people their streams might look worse in the meantime. One variable, a window, and the people it cost told what it would cost them.
