import { z, type SchemaContext } from "astro:content";

export const poetrySchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string().optional(),
    image: image(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  });
