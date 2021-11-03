import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        rel="preload"
                        href="/fonts/Lufga/regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Lufga/bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Lufga/semibold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Lufga/italic.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link rel="preload" href="/fonts/Argesta/display.otf" as="font" crossOrigin="anonymous" />
                    <link rel="preload" href="/fonts/Argesta/text_bold.otf" as="font" crossOrigin="anonymous" />
                    <link rel="preload" href="/fonts/Argesta/display_italic.otf" as="font" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Newsreader&family=Hind+Guntur&family=Hind+Madurai&family=Poppins&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
