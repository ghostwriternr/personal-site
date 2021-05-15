import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { MDXRemote } from "next-mdx-remote";

import { Layout } from "@me/components/layout";
import { getFileBySlug, getFiles } from "@me/lib/mdx";

import MDXComponents from "@me/components/MDXComponents";

function BlogPostPage({ mdxSource, frontMatter }) {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">{frontMatter.title}</h1>
                {frontMatter.header && (
                    <div className="col-span-full">
                        <Image
                            src={
                                frontMatter.header["overlay_image"]
                                    ? frontMatter.header["overlay_image"]
                                    : frontMatter.header["image"]
                            }
                            alt="Overlay image"
                            layout="responsive"
                            width="2000"
                            height="1000"
                            objectFit="cover"
                        />
                    </div>
                )}
                <div className="mb-8">
                    <div className="grid grid-cols-6">
                        <div className="prose col-start-1 col-span-6 md:col-start-2 md:col-span-4 mt-8 text-2xl">
                            <MDXRemote {...mdxSource} components={MDXComponents} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
}

// pass props to BlogPostPage component
export async function getStaticProps({ params }: StaticPath): Promise<{
    props: {
        mdxSource: any;
        frontMatter: {
            wordCount: number;
            slug: string;
        };
    };
}> {
    const post = await getFileBySlug("blog", params.slug);
    return { props: post };
}

type StaticPathParams = {
    slug: string;
};

type StaticPath = {
    params: StaticPathParams;
};

export async function getStaticPaths(): Promise<{
    paths: StaticPath[];
    fallback: boolean;
}> {
    const posts = await getFiles("blog");

    return {
        paths: posts.map<StaticPath>((post) => ({
            params: {
                slug: post.replace(/\.md/, ""),
            },
        })),
        fallback: false,
    };
}

export default BlogPostPage;
