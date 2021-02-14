import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme="system">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
