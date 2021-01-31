import Head from "next/head";

import { Intro } from "../components/intro";
import { Sections } from "../components/sections";

export default function Home() {
    return (
        <div className="h-screen">
            <Head>
                <title>Naresh Ramesh</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="h-2 w-screen" style={{ background: "#ffd081" }} />
                <div className="p-4">
                    <img className="fixed hidden md:block" src="/images/me.png" alt="Avatar" height="60" width="60" />
                    <div className="grid grid-cols-12 mt-4 md:mt-8">
                        <div className="col-span-12 md:col-start-3 md:col-span-8">
                            <Intro />
                            <Sections />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
