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
                <div className="mt-8">
                    {posts.map((blog) => {
                        return (
                            <Link key={blog.id} href={`/code/${blog.slug}`} prefetch={false} passHref>
                                <div className="cursor-pointer">
                                    <div className="mt-2">
                                        <h2 className="text-xl font-bold">{blog.title}</h2>
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
    const posts = await getAllFilesFrontMatter("code");
    return { props: { posts } };
}
