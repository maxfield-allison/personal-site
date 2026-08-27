---
title: Two Root Causes, One Bad Stick of RAM
summary: Nine months of a storage system quietly corrupting itself, two separate causes, how I got lucky.
date: 2024-03-22
draft: true  # HELD - same media-server exposure as nine-years-of-users
---

Through the summer of 2023 the machine running my media service kept getting worse. Not a clean failure. I was locked out of things that were configured correctly, services wouldn't come up or recover themselves, and I had a general sense that something deep in the system was amiss.

I told my friend group at one point I was considering shutting the whole thing down. Then in the next line, that I had backups and the data was mostly intact, so starting over would cost me time and not much else. Both true, it still sucked, but it helped to type both lines out.

## The first cause

August, after a hardware failure that looked like a power supply issue, then deciding to nuke and pave the node, I ran memtest. One stick of RAM with a single bad memory address, about a minute and 20 seconds in to the run.

It had been quietly corrupting things for a long time. Never enough to fall over. Enough to leave damage that looked like a dozen unrelated problems. Memtest found it in an afternoon, after I'd spent weeks not looking there.

## The second cause

After an RMA

I'd built the ZFS pool against `/dev/sdX` names. Linux hands those out in whatever order it finds the disks, so across reboots mine had been shuffling between vdevs. The pool was reporting around fifty thousand errors and sitting degraded, and I'd been reading that as fallout from the bad memory.

It wasn't. It was a second, independent problem the first one had been hiding. I rebuilt the pool addressing disks by their stable IDs. The 8 TB drives underneath had over forty thousand power-on hours and hadn't done anything wrong.

## What I'd do differently

I let a plausible cause stop me looking. The RAM was real, and finding it felt like the end of the investigation instead of the middle of it.

Six months later the primary node was still crashing now and then. When I finally got a stable run I told everyone straight out that I'd landed on it by luck and wasn't going to pretend otherwise, and asked them to say something if anything still felt off. A hundred people using the thing are better instrumentation than I am.

Then I pulled the GPU out, said I'd leave it out for a month and put it back if nothing crashed, and warned people their streams might look worse in the meantime. One variable, a window, and the people it cost told what it would cost them.
