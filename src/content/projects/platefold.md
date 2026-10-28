---
title: Plate|Fold
summary: Generated technical documents were easy for me to produce and awkward for other people to read. Plate|Fold turns them into PDFs with room for the diagrams.
license: https://opensource.org/licenses/MIT
kind: independent software
problem: Readers needed generated Markdown and Mermaid documentation in a familiar format, with diagrams they could read.
outcome: Released a multi-format PDF tool with per-figure page sizing and desktop, command-line and server interfaces.
role: Product direction, architecture decisions and releases; AI-assisted implementation
stack:
  - Python
  - TypeScript
  - Rust / Tauri
  - Chromium
links:
  - label: Product
    url: https://platefold.page
  - label: GitHub
    url: https://github.com/maxfield-allison/platefold
  - label: Documentation
    url: https://maxfield-allison.github.io/platefold/
featured: true
order: 7
date: 2026-10-27
draft: false
---

## The reader shouldn't need my workflow

For another project, I'd built a system that generated documentation as Markdown files. I used Mermaid diagrams to explain how things fit together. Most of the people who needed those documents weren't familiar with Markdown, and I didn't want to make them learn a new set of tools just to read the result. PDF let them use software they already had while I kept the workflow that produced the documentation.

Getting a useful PDF was harder. Some converters didn't support Mermaid, and a diagram was still unreadable if the export squeezed all its labels into the text column. That's why I started md2pdf, the small utility that became Plate|Fold.

## Give the figure a page that fits

Plate|Fold measures each figure and looks for a page that keeps it readable. It starts with the text column, then tries a landscape page, a larger sheet, or a page sized to the figure.

That lets a wide diagram have its own page while the rest of the document stays on normal-sized pages. Tables follow the same process.

<figure class="placement-example">
  <p class="placement-example__title">More room when the figure needs it</p>
  <ol class="placement-options">
    <li><strong>Text column</strong><span>Keep a small figure beside the text.</span></li>
    <li><strong>Landscape page</strong><span>Turn the page to give a wider figure more room.</span></li>
    <li><strong>Larger sheet</strong><span>Use a larger page when landscape still isn't enough.</span></li>
    <li><strong>Custom page</strong><span>Size the page to the figure's proportions.</span></li>
  </ol>
  <figcaption>This illustrates the page-selection process. <a href="https://maxfield-allison.github.io/platefold/assets/samples/ladder-tour.pdf">Open the sample PDF to see the actual output.</a></figcaption>
</figure>

## Build around the renderer

The original tool was Windows-focused. I wanted a product people could use from a desktop, a command line or a browser, and I wanted it to handle more than Markdown.

I chose to keep the rendering engine and build other interfaces around it. The desktop app uses Tauri with a packaged Python worker. The command line and authenticated Linux browser server use the same conversion engine, so adding a way to use the tool doesn't mean replacing the renderer.

The supported inputs grew beyond Markdown to include CSV, TSV, DOCX and XLSX. DOC, ODT and RTF require a separately installed converter. Word documents are reflowed into Plate|Fold's layout, and spreadsheets become sections and tables. Supporting more formats is part of the plan; the current release doesn't try to reproduce every document page for page.

## My own installs changed the product

I set the requirements and reviewed the architectural choices, with AI agents writing the implementation and helping with tests and documentation.

Dark exports had white margins. The installer took too long to unpack its files. I wanted the workspace to stay put as the content changed. That feedback led to changes in the output and interface. Later, exporting a 92-page CSV exposed a preview that was doing the work of paginating the whole document before showing its first page.

I also wanted accessibility considered from the first release. The output includes tagged PDF structure and automated checks. That is useful work, but it does not establish PDF/UA or WCAG conformance, and the product does not claim either.

## From a useful utility to a public release

[Plate|Fold 1.0.3](https://github.com/maxfield-allison/platefold/releases/tag/v1.0.3) ships Windows x64 and Linux x86-64 desktop packages, a signed and notarized Apple Silicon macOS package, command-line interfaces and container images. Release checks cover the packaged files as well as the source, including the installation and update paths listed in the platform documentation.

There are limits. Font differences can change pagination, Excel charts are not converted, and macOS has less hands-on testing than Windows and Linux. The documentation spells those out so people can decide whether the tool fits their work.
