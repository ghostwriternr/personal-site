import Link from "next/link";
import { CSSProperties } from "react";

type LayoutProps = {
    style?: CSSProperties;
    children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
    return (
        <div style={props.style}>
            <div className="p-4">
                <Link href="/" passHref>
                    <img
                        className="fixed hidden md:block cursor-pointer"
                        src="/images/me.png"
                        alt="Avatar"
                        height="60"
                        width="60"
                    />
                </Link>
                <div className="grid grid-cols-12 pt-4">{props.children}</div>
            </div>
        </div>
    );
}
