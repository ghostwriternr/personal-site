// Functions to format site content as markdown for LLM-friendly responses
import {
    bio,
    notFound,
    site,
    socialLinks,
    workExperience,
} from "../content/site";

/**
 * Format social links as markdown list
 */
export function formatSocialLinksMarkdown(): string {
    return socialLinks
        .map((link) => {
            const url = link.url.replace("mailto:", "");
            return `- ${link.name}: ${url}`;
        })
        .join("\n");
}

/**
 * Format work experience as markdown
 */
export function formatWorkExperienceMarkdown(): string {
    return workExperience
        .map(
            (job) =>
                `### ${job.role} at ${job.company}\n*${job.period}*\n\n${job.description}`
        )
        .join("\n\n---\n\n");
}

/**
 * Generate the llms.txt content - site overview for LLMs
 */
export function generateLlmsTxt(
    baseUrl: string,
    blogPosts: { id: string; title: string; description: string }[],
    poems: { id: string; title: string }[]
): string {
    return `# ${site.title}

${bio.short}
${bio.workSummary}

## Blog Posts

${blogPosts.map((post) => `- [${post.title}](${baseUrl}/posts/${post.id}/): ${post.description}`).join("\n")}

## Poetry

${poems.map((poem) => `- [${poem.title}](${baseUrl}/poetry/${poem.id}/)`).join("\n")}

## Links

- Website: ${baseUrl}
${formatSocialLinksMarkdown()}
`;
}

/**
 * Generate about page content in markdown
 */
export function generateAboutMarkdown(): string {
    return `# ${site.title}

Hey! I am ${site.title}. Welcome to my tiny space on the internet.

${bio.extended.join("\n\n")}

## Work Experience

${formatWorkExperienceMarkdown()}

## Links

${formatSocialLinksMarkdown()}
`;
}

/**
 * Generate blog posts index in markdown
 */
export function generatePostsIndexMarkdown(
    baseUrl: string,
    posts: { id: string; title: string; description: string }[]
): string {
    return `# Blog Posts by ${site.title}

${posts.map((post) => `- [${post.title}](${baseUrl}/posts/${post.id}/): ${post.description}`).join("\n")}
`;
}

/**
 * Generate poetry index in markdown
 */
export function generatePoetryIndexMarkdown(
    baseUrl: string,
    poems: { id: string; title: string }[]
): string {
    return `# Poetry by ${site.title}

A collection of poems written over the years.

${poems.map((poem) => `- [${poem.title}](${baseUrl}/poetry/${poem.id}/)`).join("\n")}
`;
}

export function generateTalksIndexMarkdown(
    baseUrl: string,
    talks: { slug: string; title: string; description: string }[]
): string {
    return `# Talks by ${site.title}

${talks.map((talk) => `- [${talk.title}](${baseUrl}/talks/${talk.slug}/): ${talk.description}`).join("\n")}
`;
}

/**
 * Generate 404 content in markdown
 */
export function generate404Markdown(): string {
    return `# ${notFound.title} - Page Not Found

${notFound.subtitle}

${notFound.poem}
`;
}
