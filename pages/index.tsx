import Head from "next/head";

import { Intro } from "../components/intro";
import { Layout } from "../components/layout";
import { Sections } from "../components/sections";

export default function Home() {
    return (
        <div className="h-screen">
            <Head>
                <title>Naresh Ramesh</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <>
                    <div className="h-2 w-screen" style={{ background: "#ffd081" }} />
                    <Layout
                        style={{
                            backgroundColor: "#ffecb4",
                            backgroundImage: "url('/images/bg.svg')",
                            backgroundAttachment: "fixed",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="col-span-12 md:col-start-3 md:col-span-8">
                            <Intro />
                            <Sections />
                        </div>
                    </Layout>
                </>
            </main>
        </div>
    );
}
