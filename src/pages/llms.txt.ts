import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

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

    const content = `# Naresh Ramesh

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

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
