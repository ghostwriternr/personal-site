import { motion } from "framer-motion";
import Link from "next/link";

import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

export default function Blog({ posts }) {
    return (
        <Layout title="A Silhouette's Squire">
            <motion.div
                className="col-span-12 md:col-start-3 md:col-span-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold">A Silhouette's Squire</h1>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {posts.map((blog) => {
                        return (
                            <Link key={blog.id} href={`/blog/${blog.slug}`} prefetch={false} passHref>
                                <div className="cursor-pointer">
                                    <img src={blog.header?.teaser} alt="Blog" className="object-cover w-full h-80" />
                                    <div className="mt-2">
                                        <h2 className="text-xl font-bold">{blog.title}</h2>
                                        <p className="text-lg">{blog.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </motion.div>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("blog");
    return { props: { posts } };
}
