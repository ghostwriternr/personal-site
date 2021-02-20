import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import path from "path";
import renderToString from "next-mdx-remote/render-to-string";
import MDXComponents from "../components/MDXComponents";

const root = process.cwd();

export async function getFiles(type: "blog" | "code") {
    return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: "blog" | "code", slug: string) {
    const source = fs.readFileSync(path.join(root, "data", type, `${slug}.md`), "utf-8");
    const { data, content } = matter(source);
    const mdxSource = await renderToString(content, {
        components: MDXComponents,
        mdxOptions: {
            remarkPlugins: [require("remark-autolink-headings"), require("remark-slug"), require("remark-code-titles")],
            rehypePlugins: [mdxPrism],
        },
    });

    return {
        mdxSource,
        frontMatter: {
            wordCount: content.split(/\s+/gu).length,
            slug: slug || null,
            ...data,
        },
    };
}

export async function getAllFilesFrontMatter(type: "blog" | "code") {
    const files = fs.readdirSync(path.join(root, "data", type));

    return files.reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf-8");
        const { data } = matter(source);

        return [{ ...data, slug: postSlug.replace(".md", "") }, ...allPosts];
    }, []);
}
