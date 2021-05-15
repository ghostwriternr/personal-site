import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { MDXRemote } from "next-mdx-remote";

import { Layout } from "@me/components/layout";
import { getFileBySlug, getFiles } from "@me/lib/mdx";
import MDXComponents from "@me/components/MDXComponents";

function CodePostPage({ mdxSource, frontMatter }) {
    const router = useRouter();

    return (
        <Layout title={frontMatter.title}>
            <motion.div
                className="article-text col-span-12 md:col-start-3 md:col-span-8 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-center">{frontMatter.title}</h1>
                <div className="mb-8">
                    <div className="grid grid-cols-6">
                        <div className="prose col-start-1 col-span-6 md:col-start-2 md:col-span-4 text-2xl">
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
