import Head from "next/head";
import Link from "next/link";

import { Layout } from "../../components/layout";

function BlogPostPage(props) {
    return (
        <div className="h-screen">
            <Head>
                <title>{props.blog.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Layout>
                    <div className="article-text">
                        {props.blog.header && (
                            <img
                                src={
                                    props.blog.header["overlay_image"]
                                        ? props.blog.header["overlay_image"]
                                        : props.blog.header["image"]
                                }
                                alt="Overlay image"
                            />
                        )}
                        <h1 className="text-4xl md:text-6xl mt-8">{props.blog.title}</h1>
                        <section className="mt-8" dangerouslySetInnerHTML={{ __html: props.blog.content }}></section>
                    </div>
                </Layout>
            </main>
        </div>
    );
}

// pass props to BlogPostPage component
export async function getStaticProps(context) {
    const fs = require("fs");
    const html = require("remark-html");
    const highlight = require("remark-highlight.js");
    const unified = require("unified");
    const markdown = require("remark-parse");
    const matter = require("gray-matter");

    const slug = context.params.slug; // get slug from params
    const path = `${process.cwd()}/_posts/${slug}.md`;

    // read file content and store into rawContent variable
    const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
    });

    const { data, content } = matter(rawContent); // pass rawContent to gray-matter to get data and content
    const { date, ...otherData } = data;

    const result = await unified()
        .use(markdown)
        .use(highlight) // highlight code block
        .use(html)
        .process(content); // pass content to process

    return {
        props: {
            blog: {
                ...otherData,
                content: result.toString(),
            },
        },
    };
}

// generate HTML paths at build time
export async function getStaticPaths(context) {
    const fs = require("fs");

    const path = `${process.cwd()}/_posts`;
    const files = fs.readdirSync(path, "utf-8");

    const markdownFileNames = files.filter((fn) => fn.endsWith(".md")).map((fn) => fn.replace(".md", ""));

    return {
        paths: markdownFileNames.map((fileName) => {
            return {
                params: {
                    slug: fileName,
                },
            };
        }),
        fallback: false,
    };
}

export default BlogPostPage;
