import { getCollection } from "astro:content";
import { defineMiddleware } from "astro:middleware";
import {
    generate404Markdown,
    generateAboutMarkdown,
    generateLlmsTxt,
    generatePoetryIndexMarkdown,
    generatePostsIndexMarkdown,
    generateTalksIndexMarkdown,
} from "./lib/content-formatters";
import type { TalkMeta } from "./components/slides/types";

const talkModules = import.meta.glob<{ meta: TalkMeta }>(
    "./talks/*/index.tsx",
    { eager: true }
);

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

/**
 * Helper to create a text/plain response
 */
function textResponse(
    content: string,
    options: { status?: number; cache?: boolean } = {}
): Response {
    const { status = 200, cache = true } = options;
    const headers: Record<string, string> = {
        "Content-Type": "text/plain; charset=utf-8",
    };
    if (cache) {
        headers["Cache-Control"] = "public, max-age=3600";
    }
    return new Response(content, { status, headers });
}

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
    // Only intercept if the request prefers markdown
    if (!prefersMarkdown(request)) {
        return next();
    }

    const baseUrl = url.origin || "https://ghostwriternr.me";
    const pathname = url.pathname;

    // Fetch collections once for routes that need them
    const getBlogPosts = async () => {
        const posts = await getCollection("blog");
        return posts
            .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
            .map((p) => ({
                id: p.id,
                title: p.data.title,
                description: p.data.description,
            }));
    };

    const getPoems = async () => {
        const poems = await getCollection("poetry");
        return poems
            .sort(
                (a, b) =>
                    new Date(b.data.date).valueOf() -
                    new Date(a.data.date).valueOf()
            )
            .map((p) => ({ id: p.id, title: p.data.title }));
    };

    // Root path - serve llms.txt content
    if (pathname === "/" || pathname === "") {
        const [posts, poems] = await Promise.all([getBlogPosts(), getPoems()]);
        return textResponse(generateLlmsTxt(baseUrl, posts, poems));
    }

    // About page - /about/
    if (pathname === "/about" || pathname === "/about/") {
        return textResponse(generateAboutMarkdown());
    }

    // Poetry index - /poetry/
    if (pathname === "/poetry" || pathname === "/poetry/") {
        const poems = await getPoems();
        return textResponse(generatePoetryIndexMarkdown(baseUrl, poems));
    }

    // Blog posts index - /posts/
    if (pathname === "/posts" || pathname === "/posts/") {
        const posts = await getBlogPosts();
        return textResponse(generatePostsIndexMarkdown(baseUrl, posts));
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
            return textResponse(content);
        } else {
            return textResponse(generate404Markdown(), {
                status: 404,
                cache: false,
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
            return textResponse(content);
        } else {
            return textResponse(generate404Markdown(), {
                status: 404,
                cache: false,
            });
        }
    }

    // Talks index - /talks/
    if (pathname === "/talks" || pathname === "/talks/") {
        const talks = Object.entries(talkModules)
            .map(([path, mod]) => {
                const slug = path.match(/talks\/([^/]+)\//)?.[1] || "";
                return {
                    slug,
                    title: mod.meta.title,
                    description: mod.meta.description,
                };
            })
            .sort((a, b) => a.title.localeCompare(b.title));
        return textResponse(generateTalksIndexMarkdown(baseUrl, talks));
    }

    // Talks - /talks/[slug]/
    const talkMatch = pathname.match(/^\/talks\/([^/]+)\/?$/);
    if (talkMatch) {
        const slug = talkMatch[1];
        const mod = talkModules[`./talks/${slug}/index.tsx`];
        if (mod) {
            const { meta } = mod;
            const content = `# ${meta.title}\n\n${meta.event ? `*${meta.event} — ${meta.date}*` : `*${meta.date}*`}\n\n${meta.description}`;
            return textResponse(content);
        } else {
            return textResponse(generate404Markdown(), {
                status: 404,
                cache: false,
            });
        }
    }

    // 404 page
    if (pathname === "/404" || pathname === "/404/") {
        return textResponse(generate404Markdown(), {
            status: 404,
            cache: false,
        });
    }

    // Any other unmatched route - return 404 for LLMs
    return textResponse(generate404Markdown(), { status: 404, cache: false });
});
