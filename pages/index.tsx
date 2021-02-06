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
                <Layout>
                    <Intro />
                    <Sections />
                </Layout>
            </main>
        </div>
    );
}
