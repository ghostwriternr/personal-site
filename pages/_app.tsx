import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { MDXProvider } from "@mdx-js/react";

import "@me/styles/globals.css";
import MDXComponents from "@me/components/MDXComponents";
import { PageProvider } from "@me/lib/pageContext";
import useRouterScroll from "@me/lib/scroll";

function MyApp({ Component, pageProps }: AppProps) {
    useRouterScroll();

    return (
        <ThemeProvider defaultTheme="system">
            <PageProvider>
                <MDXProvider components={MDXComponents}>
                    <Component {...pageProps} />
                </MDXProvider>
            </PageProvider>
        </ThemeProvider>
    );
}

export default MyApp;
