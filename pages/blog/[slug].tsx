import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { Layout } from "../../components/layout";

function BlogPostPage(props) {
    const router = useRouter();

    return (
        <div className="h-screen">
            <Head>
                <title>{props.blog.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Layout>
                    <div className="col-span-12 md:col-start-3 md:col-span-8">
                        <h1 className="text-4xl md:text-6xl font-bold mb-8">
                            <span onClick={() => router.back()} className="cursor-pointer mr-4">
                                &larr;
                            </span>
                            {props.blog.title}
                        </h1>
                        {props.blog.header && (
                            <div className="col-span-full">
                                <Image
                                    src={
                                        props.blog.header["overlay_image"]
                                            ? props.blog.header["overlay_image"]
                                            : props.blog.header["image"]
                                    }
                                    alt="Overlay image"
                                    layout="responsive"
                                    width="2000"
                                    height="1000"
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div className="article-text mb-8">
                            <div className="grid grid-cols-6">
                                <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4">
                                    <section
                                        className="text-xl mt-8 "
                                        dangerouslySetInnerHTML={{ __html: props.blog.content }}
                                    />
                                </div>
                            </div>
                        </div>
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
