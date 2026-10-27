---
title: Plate|Fold
summary: Generated technical documents were easy for me to produce and awkward for other people to read. Plate|Fold turns them into PDFs with room for the diagrams.
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
draft: true
---

## The reader shouldn't need my workflow

I was working on automatic solution documentation and discovery. The system produced a lot of Markdown, and I'd made liberal use of Mermaid diagrams to explain how things fitted together. That worked for me. Most of the people who needed the documents weren't familiar with Markdown. I could explain the format and help everyone get a reader working, but PDF made more sense. They could open it with software they already had. I could keep the workflow that was producing the documentation.

The conversion was the problem. Mermaid support was patchy, and rendering a diagram wasn't enough if the export squeezed all its labels into a normal text column. A technically complete document could still be difficult to understand. That was the reason for md2pdf, the small utility that became Plate|Fold.

## Give the figure a page that fits

The page should adapt to the content.

Normal text should stay on a normal page. A wide diagram might need a landscape plate, a larger sheet, or a page cut to its proportions.

Plate|Fold measures the figure and works up that placement ladder. A single PDF can contain several page sizes, so a wide diagram gets the space it needs without making every paragraph in the document live on an enormous sheet. The same idea applies to tables.

![Seven pages from the public ladder-tour sample, shown at a common scale to compare ordinary pages with wider plates and a custom-width page.](/images/projects/platefold-ladder-tour.png)

*Example output from the public sample document. The pages share one scale; the changes in width are part of the PDF. [Read the sample at full size](https://maxfield-allison.github.io/platefold/assets/samples/ladder-tour.pdf).*


## Expand around the working engine

The original tool was Windows-focused. I wanted a product people could use from a desktop, a command line or a browser, and I wanted it to handle more than Markdown.

The existing renderer remained the engine. A Tauri desktop shell and packaged Python worker added the native interface, while the command line and authenticated Linux browser server exposed the same conversion work in other settings. Those boundaries let a new delivery surface join without replacing the renderer underneath it.

Format support grew in a similar way. Markdown, CSV, TSV, DOCX and XLSX have direct import paths. Legacy formats can use a separately installed converter. Word documents are reflowed into Plate|Fold's layout rather than reproduced page for page, and spreadsheets become sections and tables. Those are deliberate product boundaries; converting every possible document is the longer-term ambition.

## My own installs changed the product

I set the requirements and reviewed the architectural choices, with AI agents writing the implementation and helping with tests and documentation. Installing and using the candidates gave me a different kind of feedback.

Dark exports had white margins. Extraction made startup feel slow. I wanted the workspace to stay put as the content changed. Those observations became changes to the output and interface. Later, exporting a 92-page CSV exposed a preview that was doing the work of paginating the whole document before showing its first page.

I also wanted accessibility considered from the first release. The output includes tagged PDF structure and automated checks. That is useful work, but it does not establish PDF/UA or WCAG conformance, and the product does not claim either.

## From a useful utility to a public release

[Plate|Fold 1.0.3](https://github.com/maxfield-allison/platefold/releases/tag/v1.0.3) ships Windows x64 and Linux x86-64 desktop packages, a signed and notarized Apple Silicon macOS package, command-line interfaces and container images. The release process checks the actual packaged files as well as the source, including native installation and update paths within the documented platform coverage.

There are limits. Font differences can change pagination, Excel charts are not converted, and macOS has less hands-on coverage than Windows and Linux. Those belong in the documentation so someone can decide whether the tool fits their work.

