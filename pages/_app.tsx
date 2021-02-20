import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { MDXProvider } from "@mdx-js/react";

import "../styles/globals.css";
import MDXComponents from "../components/MDXComponents";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme="system">
            <MDXProvider components={MDXComponents}>
                <Component {...pageProps} />
            </MDXProvider>
        </ThemeProvider>
    );
}

export default MyApp;
