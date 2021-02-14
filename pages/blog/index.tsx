import Head from "next/head";
import Link from "next/link";

import { Layout } from "../../components/layout";

export default function Blog(props) {
    return (
        <div className="h-screen">
            <Head>
                <title>A Silhouette's Squire</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Layout>
                    <div className="col-span-12 md:col-start-3 md:col-span-8">
                        <h1 className="text-4xl md:text-6xl font-bold">A Silhouette's Squire</h1>
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            {props.blogs.map((blog, idx: number) => {
                                return (
                                    <Link
                                        key={blog.id}
                                        href={`/blog/${blog.fileName.substr(0, blog.fileName.lastIndexOf("."))}`}
                                        passHref
                                    >
                                        <div className="cursor-pointer">
                                            <img
                                                src={blog.header?.teaser}
                                                alt="Blog"
                                                className="object-cover w-full h-80"
                                            />
                                            <div className="mt-2">
                                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                                <p className="text-lg">{blog.excerpt}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </Layout>
            </main>
        </div>
    );
}

export async function getStaticProps() {
    const fs = require("fs");
    const matter = require("gray-matter");
    const { v4: uuid } = require("uuid");

    const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

    const blogs = files
        .filter((fn: string) => fn.endsWith(".md"))
        .sort((a, b) => b.localeCompare(a))
        .map((fn: string) => {
            const path = `${process.cwd()}/_posts/${fn}`;
            const rawContent = fs.readFileSync(path, {
                encoding: "utf-8",
            });
            const { data } = matter(rawContent);
            const { date, ...otherData } = data;

            return { ...otherData, fileName: fn, id: uuid() };
        });

    // By returning { props: blogs }, the IndexPage component
    // will receive `blogs` as a prop at build time
    return {
        props: { blogs },
    };
}
