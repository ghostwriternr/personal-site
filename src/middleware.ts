import { getCollection } from "astro:content";
import { defineMiddleware } from "astro:middleware";

/**
 * Check if the request prefers markdown/plain text over HTML
 * LLMs typically send Accept headers like "text/plain" or "text/markdown"
 * without "text/html" or with it at lower priority
 */
function prefersMarkdown(request: Request): boolean {
    const acceptHeader = request.headers.get("accept") || "";
    const acceptTypes = acceptHeader
        .split(",")
        .map((t) => t.trim().split(";")[0]);

    const plainIndex = acceptTypes.findIndex(
        (t) => t === "text/plain" || t === "text/markdown"
    );
    const htmlIndex = acceptTypes.indexOf("text/html");

    // Prefer markdown if text/plain or text/markdown is present
    // and either html is not present or plain/markdown comes first
    return plainIndex !== -1 && (htmlIndex === -1 || plainIndex < htmlIndex);
}

/**
 * Generate llms.txt content (reused from the endpoint)
 */
async function generateLlmsTxt(baseUrl: string): Promise<string> {
    const blogPosts = (await getCollection("blog")).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    const poems = (await getCollection("poetry")).sort(
        (a, b) =>
            new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    return `# Naresh Ramesh

Building agents at Cloudflare. I enjoy writing, curating music and making origami. Open Source maintainer & supporter. Dreaming of the sky and a prosperous India.
Previously Co-founder & CTO at CodeStory, where I led engineering for Aide, an open source AI-native IDE. Before that, Tech Lead at Setu, Software Engineer at Intuit, and Google Summer of Code at gRPC.

## Blog Posts

${blogPosts.map((post) => `- [${post.data.title}](${baseUrl}/posts/${post.id}/): ${post.data.description}`).join("\n")}

## Poetry

${poems.map((poem) => `- [${poem.data.title}](${baseUrl}/poetry/${poem.id}/)`).join("\n")}

## Links

- Website: ${baseUrl}
- GitHub: https://github.com/ghostwriternr
- Twitter/X: https://twitter.com/ghostwriternr
- LinkedIn: https://www.linkedin.com/in/naresh-ramesh
- Bluesky: https://bsky.app/profile/ghostwriternr.me
- Instagram: https://www.instagram.com/noresh.romesh
- YouTube Music: https://music.youtube.com/channel/UCxWjIwpCoSwtLGSKxkfJxcw
- Email: ghostwriternr@gmail.com
`;
}

/**
 * Format frontmatter as YAML
 */
function formatFrontmatter(data: Record<string, unknown>): string {
    const lines: string[] = [];
    for (const [key, value] of Object.entries(data)) {
        if (value instanceof Date) {
            lines.push(`${key}: ${value.toISOString().split("T")[0]}`);
        } else if (Array.isArray(value)) {
            lines.push(`${key}: [${value.map((v) => `"${v}"`).join(", ")}]`);
        } else if (typeof value !== "object" || value === null) {
            lines.push(`${key}: ${value}`);
        }
    }
    return lines.join("\n");
}

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
    // Only intercept if the request prefers markdown
    if (!prefersMarkdown(request)) {
        return next();
    }

    const baseUrl = url.origin || "https://ghostwriternr.me";
    const pathname = url.pathname;

    // Root path - serve llms.txt content
    if (pathname === "/" || pathname === "") {
        const content = await generateLlmsTxt(baseUrl);
        return new Response(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "public, max-age=3600",
            },
        });
    }

    // Blog posts - /posts/[slug]/
    const blogMatch = pathname.match(/^\/posts\/([^/]+)\/?$/);
    if (blogMatch) {
        const slug = blogMatch[1];
        const posts = await getCollection("blog");
        const post = posts.find((p) => p.id === slug);

        if (post) {
            const frontmatter = formatFrontmatter(
                post.data as Record<string, unknown>
            );
            const content = `---
${frontmatter}
---

${post.body}`;

            return new Response(content, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }
    }

    // Poetry - /poetry/[slug]/
    const poetryMatch = pathname.match(/^\/poetry\/([^/]+)\/?$/);
    if (poetryMatch) {
        const slug = poetryMatch[1];
        const poems = await getCollection("poetry");
        const poem = poems.find((p) => p.id === slug);

        if (poem) {
            const frontmatter = formatFrontmatter(
                poem.data as Record<string, unknown>
            );
            const content = `---
${frontmatter}
---

${poem.body}`;

            return new Response(content, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }
    }

    // Fall through to normal rendering for other routes
    return next();
});
