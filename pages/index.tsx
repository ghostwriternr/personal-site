import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import GrpcLogo from "@me/components/logos/grpc";
import IntuitLogo from "@me/components/logos/intuit";
import SetuLogo from "@me/components/logos/setu";
import { Intro } from "@me/components/intro";
import { Layout } from "@me/components/layout";
import { getAllFilesFrontMatter } from "@me/lib/mdx";

import { usePage } from "@me/lib/pageContext";
import { navigateVariants, textVariants } from "@me/lib/framer";

export default function Home({ blog, code }) {
    const { theme } = useTheme();
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
                    {(() => {
                        switch (page.state) {
                            case "code":
                                return (
                                    <motion.div
                                        key="blog-posts"
                                        className="mt-8 pl-4 pr-4 md:pl-0 md:pr-0 divide-x-0 divide-y-2 divide-th-tertiary"
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
                                                                <span className="text-lg text-th-secondary font-semibold">
                                                                    {post.date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                );
                            case "poetry":
                                return (
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
                                                                    alt={post.header?.title}
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
                                );
                            case "about":
                                return (
                                    <motion.div
                                        key="about"
                                        className="pl-4 pr-4 md:pl-0 md:pr-0 mt-8 flex justify-center"
                                        initial="hidden"
                                        animate="show"
                                        variants={navigateVariants}
                                    >
                                        <div className="mb-4 w-full text-center">
                                            <hr className="mb-8 border-th-tertiary" />
                                            <h2 className="text-2xl md:text-3xl font-semibold">Work Experience</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xl">
                                                <div className="flex flex-col pt-4 items-center">
                                                    <SetuLogo theme={theme} />
                                                    <span className="mt-4">
                                                        Fullstack Engineer in the payments team, working on UPI
                                                        Deeplinks &amp; BBPS and owner for the developer console.
                                                    </span>
                                                    <span className="mt-2">2020&nbsp;&mdash;</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <IntuitLogo />
                                                    <span className="mt-5">
                                                        Backend Engineer for QBO Billing &amp; Subscriptions and Mint.
                                                        Site Leader for Open Source at IDC.
                                                    </span>
                                                    <span className="mt-2">2018&nbsp;&mdash;&nbsp;2020</span>
                                                </div>
                                                <div className="flex flex-col pt-3 items-center">
                                                    <GrpcLogo />
                                                    <span className="mt-2">
                                                        Google Summer of Code (GSoC) student, adding support for
                                                        building gRPC Python with Bazel.
                                                    </span>
                                                    <span className="mt-2">2018</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-xl">
                                                <a
                                                    href="https://raw.githubusercontent.com/ghostwriternr/resume/master/naresh_resume.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-th-primary"
                                                >
                                                    Detailed Resume
                                                </a>
                                            </div>
                                            <hr className="mt-8 border-th-tertiary" />
                                        </div>
                                    </motion.div>
                                );
                        }
                    })()}
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
