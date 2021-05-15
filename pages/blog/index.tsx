import { motion } from "framer-motion";
import Image from "next/image";
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
                    {posts.map((post) => {
                        return (
                            <Link href={`/blog/${post.slug}`} passHref>
                                <div key={post.id} className="group cursor-pointer">
                                    <div className="relative w-full h-60 md:h-80">
                                        <Image src={post.header?.teaser} alt="Blog" layout="fill" objectFit="cover" />
                                    </div>
                                    <div className="mt-2 pl-4 pr-4 md:pl-0 md:pr-0">
                                        <div className="flex text-xl font-bold">
                                            <h2 className="">{post.title}</h2>
                                            <div className="ml-2 text-transparent group-hover:text-th-text">&rarr;</div>
                                        </div>
                                        <p className="text-lg">{post.date}</p>
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
