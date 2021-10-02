import Image from "next/image";
import Link from "next/link";
import React from "react";

const CustomLink = (props) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} />
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
    img: ({ src, height, width, title, ...rest }) =>
        title ? (
            <figure>
                <Image layout="responsive" src={src} height={height} width={width} {...rest} />
                <figcaption className="w-full text-center">
                    <div className="text-xl text-th-subtext">{title}</div>
                </figcaption>
            </figure>
        ) : (
            <Image layout="responsive" src={src} height={height} width={width} {...rest} />
        ),
    a: CustomLink,
    hr: () => <hr className="mt-10 mb-10" />,
    HindiText: ({ children }: { children: React.ReactNode }) => <span className="hindi">{children}</span>,
};

export default MDXComponents;
