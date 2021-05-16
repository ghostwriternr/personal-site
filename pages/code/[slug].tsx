import { motion } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

import { Layout } from "@me/components/layout";
import MDXComponents from "@me/components/MDXComponents";
import { getFileBySlug, getFiles } from "@me/lib/mdx";
import { usePage } from "@me/lib/pageContext";

function CodePostPage({ mdxSource, frontMatter }) {
    const page = usePage();
    React.useEffect(() => {
        page.dispatch("code");
        window.scrollTo({ left: 0, top: 0 });
    }, []);

    return (
        <Layout title={frontMatter.title}>
            <motion.div
                className="article-text col-span-12 md:col-start-3 md:col-span-8 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <div className="text-center mb-16">
                    <p className="text-xl mb-2">{frontMatter.date}</p>
                    <h1 className="text-4xl md:text-5xl font-bold">{frontMatter.title}</h1>
                </div>
                <div className="mb-8">
                    <div className="grid grid-cols-12">
                        <div className="prose col-start-2 col-span-10 md:col-start-3 md:col-span-8 text-xl md:text-2xl">
                            <MDXRemote {...mdxSource} components={MDXComponents} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const post = await getFileBySlug("code", params.slug);
    return { props: post };
}

export async function getStaticPaths() {
    const posts = await getFiles("code");

    return {
        paths: posts.map((post) => ({
            params: {
                slug: post.replace(/\.md/, ""),
            },
        })),
        fallback: false,
    };
}

export default CodePostPage;
