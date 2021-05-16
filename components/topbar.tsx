import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
import { IconSun, IconMoonStars } from "@tabler/icons";

import { navigateVariants, textVariants } from "@me/lib/framer";
import { Page, usePage } from "@me/lib/pageContext";

import { MenuButton } from "./MenuButton";

export function Topbar() {
    const page = usePage();
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleClick = (p: Page) => {
        page.dispatch(p);
        router.push("/").then(() => setIsOpen(false));
    };

    return (
        <div className={`z-50 absolute flex flex-col w-screen bg-th-background p-4 ${isOpen ? "overflow-hidden" : ""}`}>
            <div className="flex place-content-between">
                <div className="flex justify-center" onClick={() => handleClick("code")}>
                    <Image
                        className="cursor-pointer"
                        src="/images/me.png"
                        alt="Avatar"
                        height="40"
                        width="40"
                        priority
                    />
                </div>
                <div className="flex justify-center h-10 pt-2 pb-2">
                    <MenuButton
                        isOpen={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                        strokeWidth="2"
                        color="#e17150"
                        lineProps={{ strokeLinecap: "round" }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        width="24"
                        height="24"
                    />
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={navigateVariants}
                        className="flex flex-col divide-y-2 divide-th-tertiary text-4xl"
                        style={{ height: "calc(100vh - 72px)" }}
                    >
                        <motion.div
                            key="Blog"
                            className="flex flex-grow justify-center items-center"
                            variants={textVariants}
                            onClick={() => handleClick("code")}
                        >
                            <span>Blog</span>
                        </motion.div>
                        <motion.div
                            key="Poetry"
                            className="flex flex-grow justify-center items-center"
                            variants={textVariants}
                            onClick={() => handleClick("poetry")}
                        >
                            <span>Poetry</span>
                        </motion.div>
                        <motion.div
                            key="About"
                            className="flex flex-grow justify-center items-center"
                            variants={textVariants}
                            onClick={() => handleClick("about")}
                        >
                            <span>About</span>
                        </motion.div>
                        <motion.div
                            key="Theme"
                            className="flex flex-grow justify-center items-center"
                            variants={textVariants}
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? <IconSun size={30} /> : <IconMoonStars size={30} />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
