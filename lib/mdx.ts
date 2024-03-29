import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import RemarkAutolinkHeadings from "remark-autolink-headings";
import RemarkSlug from "remark-slug";
import RemarkCodeTitles from "remark-code-titles";

import imageMetadata from "../plugins/image-metadata";
import { getPlaiceholder } from "plaiceholder";

const root = process.cwd();

type BlogFrontMatter = {
    wordCount: number;
    slug: string;
};

type FileMeta = {
    mdxSource: any;
    frontMatter: BlogFrontMatter;
};

export async function getFiles(type: "blog" | "code"): Promise<string[]> {
    return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: "blog" | "code", slug: string): Promise<FileMeta> {
    let source: string;
    try {
        source = fs.readFileSync(path.join(root, "data", type, `${slug}.md`), "utf-8");
    } catch (ex) {
        source = fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf-8");
    }
    const { data, content } = matter(source);
    data.date = new Date(data.date).toLocaleDateString("en-IN", { dateStyle: "long" });

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [RemarkAutolinkHeadings, RemarkSlug, RemarkCodeTitles],
            rehypePlugins: [imageMetadata],
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

    return await files.reduce(async (allPosts, postSlug) => {
        const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf-8");
        const { data } = matter(source);
        data.date = new Date(data.date).toLocaleDateString("en-IN", { dateStyle: "long" });

        const headerImage = data.header?.["overlay_image"] ?? data.header?.["image"];
        const frontMatter = { ...data, slug: postSlug.replace(/\.md(x)?/, "") };
        if (headerImage) {
            const { base64 } = await getPlaiceholder(headerImage);
            return [{ ...frontMatter, blurDataURL: base64 }, ...(await allPosts)];
        }

        return [frontMatter, ...(await allPosts)];
    }, Promise.resolve([]));
}
