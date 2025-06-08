import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { poetrySchema } from "./schemas/poetry";
import { blogSchema } from "./schemas/blog";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: blogSchema,
});

const poetry = defineCollection({
    // Load Markdown and MDX files in the `src/content/poetry` directory.
    loader: glob({ base: "./src/content/poetry", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: poetrySchema,
});

export const collections = { blog, poetry };
