import Image from "next/image";
import Link from "next/link";

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
    img: ({ src, height, width, ...rest }) => (
        <Image layout="responsive" src={src} height={height} width={width} {...rest} />
    ),
    a: CustomLink,
};

export default MDXComponents;
