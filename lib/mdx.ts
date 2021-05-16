import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

import imageMetadata from "../plugins/image-metadata";

const root = process.cwd();

type BlogFrontMatter = {
    wordCount: number;
    slug: string;
};

type FileMeta = {
    mdxSource: any;
    frontMatter: BlogFrontMatter;
};

type BlogMeta = {
    title: string;
    date: string;
    header: Header;
    excerpt: string;
    categories: string[];
    tags: string[];
    slug: string;
};

interface Header {
    overlay_image: string;
    teaser: string;
}

export async function getFiles(type: "blog" | "code"): Promise<string[]> {
    return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: "blog" | "code", slug: string): Promise<FileMeta> {
    const source = fs.readFileSync(path.join(root, "data", type, `${slug}.md`), "utf-8");
    const { data, content } = matter(source);
    data.date = new Date(data.date).toLocaleDateString("en-IN", { dateStyle: "long" });

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [require("remark-autolink-headings"), require("remark-slug"), require("remark-code-titles")],
            rehypePlugins: [mdxPrism, imageMetadata],
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

export async function getAllFilesFrontMatter(type: "blog" | "code"): Promise<any[]> {
    const files = fs.readdirSync(path.join(root, "data", type));

    return files.reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf-8");
        const { data } = matter(source);
        data.date = new Date(data.date).toLocaleDateString("en-IN", { dateStyle: "long" });

        return [{ ...data, slug: postSlug.replace(".md", "") }, ...allPosts];
    }, []);
}
