import Head from "next/head";
import Link from "next/link";

import { ThemeSwitcher } from "@me/components/themeSwitch";

type LayoutProps = {
    title: string;
    className?: string;
    children: React.ReactNode;
};

export function Layout({ title, className, ...props }: LayoutProps) {
    return (
        <div className="h-screen">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className={className}>
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
                        <div className="fixed bottom-4 left-4">
                            <ThemeSwitcher />
                        </div>
                        <div className="grid grid-cols-12 pt-4">{props.children}</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
