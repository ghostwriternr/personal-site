import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Intro } from "@me/components/intro";
import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

import { usePage } from "@me/lib/pageContext";
import { navigateVariants, textVariants } from "@me/lib/framer";

export default function Home({ blog, code }) {
    const page = usePage();

    return (
        <Layout title="Naresh Ramesh" className="bg-home bg-fixed bg-cover">
            <motion.div
                key="home"
                className="col-span-12 md:col-start-3 md:col-span-8"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={navigateVariants}
            >
                <Intro />
                <AnimatePresence>
                    {page.state === "code" && (
                        <motion.div
                            key="blog-posts"
                            className="mt-8 pl-4 pr-4 md:pl-0 md:pr-0 -ml-8 -mr-8 divide-x-0 divide-y-2 divide-th-tertiary"
                            initial="hidden"
                            animate="show"
                            variants={navigateVariants}
                        >
                            {code.map((post, index) => {
                                return (
                                    <motion.div key={`${post.id}-${index}`} variants={textVariants}>
                                        <Link href={`/code/${post.slug}`} passHref>
                                            <div className="group cursor-pointer pt-10 pb-10 hover:bg-th-theme-accent">
                                                <div className="flex flex-col md:flex-row place-content-between pl-8 pr-8">
                                                    <h2 className="flex text-2xl font-bold">
                                                        {post.title}
                                                        <div className="ml-2 text-transparent group-hover:text-th-text">
                                                            &rarr;
                                                        </div>
                                                    </h2>
                                                    <span className="text-lg text-th-secondary">{post.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                    {page.state === "poetry" && (
                        <motion.div
                            key="poetry"
                            className="grid md:grid-cols-2 gap-8 mt-8"
                            initial="hidden"
                            animate="show"
                            variants={navigateVariants}
                        >
                            {blog.map((post, index) => {
                                return (
                                    <motion.div key={`${post.id}-${index}`} variants={textVariants}>
                                        <Link href={`/blog/${post.slug}`} passHref>
                                            <div className="group cursor-pointer">
                                                <div className="relative w-full h-60 md:h-80">
                                                    <Image
                                                        src={post.header?.teaser}
                                                        alt="Blog"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="mt-2 pl-4 pr-4 md:pl-0 md:pr-0">
                                                    <div className="flex text-xl font-bold">
                                                        <h2 className="">{post.title}</h2>
                                                        <div className="ml-2 text-transparent group-hover:text-th-text">
                                                            &rarr;
                                                        </div>
                                                    </div>
                                                    <p className="text-lg">{post.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
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
