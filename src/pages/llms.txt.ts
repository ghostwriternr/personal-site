import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { generateLlmsTxt } from "../lib/content-formatters";

export const GET: APIRoute = async ({ site }) => {
    const blogPosts = (await getCollection("blog")).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    const poems = (await getCollection("poetry")).sort(
        (a, b) =>
            new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    const baseUrl =
        site?.toString().replace(/\/$/, "") || "https://ghostwriternr.me";

    const posts = blogPosts.map((p) => ({
        id: p.id,
        title: p.data.title,
        description: p.data.description,
    }));

    const poemsList = poems.map((p) => ({
        id: p.id,
        title: p.data.title,
    }));

    const content = generateLlmsTxt(baseUrl, posts, poemsList);

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
