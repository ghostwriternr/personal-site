import { motion } from "framer-motion";
import Link from "next/link";

import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

export default function Code({ posts }) {
    return (
        <Layout title="Kill Dash Nine">
            <motion.div
                className="col-span-12 md:col-start-3 md:col-span-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold">Kill Dash Nine</h1>
                <div className="mt-8 -ml-8 -mr-8 divide-x-0 divide-y-2 divide-th-tertiary">
                    {posts.map((post) => {
                        return (
                            <div key={post.id} className="group cursor-pointer pt-10 pb-10 hover:bg-th-theme-accent">
                                <Link href={`/code/${post.slug}`} prefetch={false} passHref>
                                    <div className="flex place-content-between pl-8 pr-8">
                                        <h2 className="flex text-2xl font-bold">
                                            {post.title}
                                            <div className="ml-2 text-transparent group-hover:text-th-text">&rarr;</div>
                                        </h2>
                                        <span className="text-lg text-th-secondary">{post.date}</span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("code");
    return { props: { posts } };
}
