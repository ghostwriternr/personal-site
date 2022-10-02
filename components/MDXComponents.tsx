import Image from "next/image";
import Link from "next/link";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/shadesOfPurple";
import React from "react";

const CustomLink = (
    props: JSX.IntrinsicAttributes &
        React.ClassAttributes<HTMLAnchorElement> &
        React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
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

const Code = ({ children, className }) => {
    let language: Language = "markdown";
    if (className) language = className.replace(/language-/, "");

    return (
        <Highlight {...defaultProps} code={children} language={language} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: "20px" }}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

const MDXComponents = {
    img: ({ src, height, width, title, blurDataURL, ...rest }) => {
        return title ? (
            <figure>
                <Image
                    layout="responsive"
                    src={src}
                    height={height}
                    width={width}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    alt=""
                    {...rest}
                />
                <figcaption className="w-full text-center">
                    <div className="text-xl text-th-subtext">{title}</div>
                </figcaption>
            </figure>
        ) : (
            <Image
                layout="responsive"
                src={src}
                height={height}
                width={width}
                placeholder="blur"
                blurDataURL={blurDataURL}
                alt=""
                {...rest}
            />
        );
    },
    a: CustomLink,
    code: Code,
    hr: () => <hr className="mt-10 mb-10" />,
    HindiText: ({ children }: { children: React.ReactNode }) => <span className="hindi">{children}</span>,
};

export default MDXComponents;
