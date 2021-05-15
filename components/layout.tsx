import Head from "next/head";

import { Sidebar } from "./sidebar";

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
                <div className={`min-h-screen ${className}`}>
                    <div className="fixed z-50 top-0 left-0 h-2 w-screen bg-th-theme-accent-dark" />
                    <div className="hidden md:block">
                        <Sidebar />
                    </div>
                    <div className="md:ml-20 pt-12 pb-12 grid grid-cols-12" style={{ width: "calc(100vw - 5rem)" }}>
                        {props.children}
                    </div>
                </div>
            </main>
        </div>
    );
}
