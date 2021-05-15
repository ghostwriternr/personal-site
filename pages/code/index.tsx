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
                            <div key={post.id} className="group cursor-pointer">
                                <Link href={`/blog/${post.slug}`} passHref>
                                    <>
                                        <img
                                            src={post.header?.teaser}
                                            alt="Blog"
                                            className="object-cover w-full h-80"
                                        />
                                        <div className="mt-2">
                                            <div className="flex text-xl font-bold">
                                                <h2 className="">{post.title}</h2>
                                                <div className="ml-2 text-transparent group-hover:text-th-text">
                                                    &rarr;
                                                </div>
                                            </div>
                                            <p className="text-lg">{post.date}</p>
                                        </div>
                                    </>
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
