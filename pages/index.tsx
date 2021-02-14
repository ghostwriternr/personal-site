import { motion } from "framer-motion";

import { Intro } from "../components/intro";
import { Layout } from "../components/layout";
import { Sections } from "../components/sections";

export default function Home() {
    return (
        <Layout title="Naresh Ramesh" className="bg-th-theme-bg bg-home bg-fixed bg-cover">
            <div className="absolute top-0 left-0 h-2 w-screen bg-th-theme-accent-dark" />
            <motion.div
                className="col-span-12 md:col-start-3 md:col-span-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.24 }}
            >
                <Intro />
                <Sections />
            </motion.div>
        </Layout>
    );
}
