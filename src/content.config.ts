import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
        }),
});

const poetry = defineCollection({
    // Load Markdown and MDX files in the `src/content/poetry/` directory.
    loader: glob({ base: "./src/content/poetry", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            date: z.string(),
            excerpt: z.string().optional(),
            image: image(),
            categories: z.array(z.string()),
            tags: z.array(z.string()),
        }),
});

export const collections = { blog, poetry };
