import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Project case studies. One MDX/Markdown file per project in src/content/projects/.
// This is the canonical structure the site renders project cards and detail pages from.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    // Short lowercase classifier shown in the case-study kicker, e.g.
    // "open source". Sits next to the folio: "case study no. 1 · open source".
    kind: z.string().optional(),
    stack: z.array(z.string()).default([]),
    problem: z.string().optional(),
    outcome: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// Blog posts. One MDX/Markdown file per post in src/content/posts/.
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
