import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { Intro } from "@me/components/intro";
import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

import { usePage } from "@me/lib/pageContext";

export default function Home({ blog, code }) {
    const page = usePage();

    return (
        <Layout title="Naresh Ramesh" className="bg-home bg-fixed bg-cover">
            <motion.div
                className="col-span-12 md:col-start-3 md:col-span-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <Intro />
                <AnimatePresence>
                    {page.state === "code" && (
                        <motion.div
                            key="blog-posts"
                            className="mt-8 -ml-8 -mr-8 divide-x-0 divide-y-2 divide-th-tertiary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.24 }}
                        >
                            {code.map((post) => {
                                return (
                                    <div
                                        key={post.id}
                                        className="group cursor-pointer pt-10 pb-10 hover:bg-th-theme-accent"
                                    >
                                        <Link href={`/code/${post.slug}`} prefetch={false} passHref>
                                            <div className="flex place-content-between pl-8 pr-8">
                                                <h2 className="flex text-2xl font-bold">
                                                    {post.title}
                                                    <div className="ml-2 text-transparent group-hover:text-th-text">
                                                        &rarr;
                                                    </div>
                                                </h2>
                                                <span className="text-lg text-th-secondary">{post.date}</span>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                    {page.state === "poetry" && (
                        <motion.div
                            key="poetry"
                            className="grid md:grid-cols-2 gap-8 mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.24 }}
                        >
                            {blog.map((post) => {
                                return (
                                    <div key={post.id} className="group cursor-pointer">
                                        <Link href={`/blog/${post.slug}`} prefetch={false} passHref>
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Layout>
    );
}

export async function getStaticProps() {
    const blog = await getAllFilesFrontMatter("blog");
    const code = await getAllFilesFrontMatter("code");
    return { props: { blog, code } };
}
