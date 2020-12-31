import Head from "next/head";

import { Header } from "../components/header";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Naresh Ramesh</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className={styles.indicator}></div>
                <div className={styles.content}>
                    <Header />
                </div>
            </main>
        </div>
    );
}
