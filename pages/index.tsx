import Head from "next/head";

import { Body } from "../components/body";
import { Header } from "../components/header";

export default function Home() {
    return (
        <div className="h-screen">
            <Head>
                <title>Naresh Ramesh</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="h-2 w-screen" style={{ background: "#ffd081" }}></div>
                <div className="p-4">
                    <Header />
                    <Body />
                </div>
            </main>
        </div>
    );
}
