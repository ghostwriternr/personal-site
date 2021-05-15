import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Intro } from "@me/components/intro";
import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

import { usePage } from "./pageContext";

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
                {page.state === "code" && (
                    <div className="mt-8">
                        {code.map((post) => {
                            return (
                                <Link key={post.id} href={`/code/${post.slug}`} prefetch={false} passHref>
                                    <div className="cursor-pointer">
                                        <div className="mt-2">
                                            <h2 className="text-xl font-bold">{post.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
                {page.state === "poetry" && (
                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        {blog.map((post) => {
                            return (
                                <Link key={post.id} href={`/blog/${post.slug}`} prefetch={false} passHref>
                                    <div className="cursor-pointer">
                                        <img
                                            src={post.header?.teaser}
                                            alt="Blog"
                                            className="object-cover w-full h-80"
                                        />
                                        <div className="mt-2">
                                            <h2 className="text-xl font-bold">{post.title}</h2>
                                            <p className="text-lg">{post.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </Layout>
    );
}

export async function getStaticProps() {
    const blog = await getAllFilesFrontMatter("blog");
    const code = await getAllFilesFrontMatter("code");
    return { props: { blog, code } };
}
