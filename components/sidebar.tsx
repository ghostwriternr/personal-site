import Link from "next/link";

import { usePage } from "@me/pages/pageContext";

import { ThemeSwitcher } from "./themeSwitch";

export function Sidebar() {
    const page = usePage();

    return (
        <div className="fixed mt-2 flex flex-col h-screen w-20 border-r-4 border-th-theme-accent-dark">
            <div className="mt-2 mb-2 flex justify-center">
                <Link href="/" passHref>
                    <img className="cursor-pointer" src="/images/me.png" alt="Avatar" height="60" width="60" />
                </Link>
            </div>
            <div className="flex-grow flex flex-col items-center">
                <div
                    className="flex-grow flex w-full justify-center items-center cursor-pointer hover:text-th-secondary"
                    onClick={() => page.dispatch("code")}
                >
                    <span
                        className={`transform -rotate-90 text-xl ${
                            page.state === "code" ? "font-bold text-th-primary" : ""
                        }`}
                    >
                        Blog
                    </span>
                </div>
                <div
                    className="flex-grow flex w-full justify-center items-center cursor-pointer hover:text-th-secondary"
                    onClick={() => page.dispatch("poetry")}
                >
                    <span
                        className={`transform -rotate-90 text-xl ${
                            page.state === "poetry" ? "font-bold text-th-primary" : ""
                        }`}
                    >
                        Poetry
                    </span>
                </div>
                <div
                    className="flex-grow flex w-full justify-center items-center cursor-pointer hover:text-th-secondary"
                    onClick={() => page.dispatch("poetry")}
                >
                    <span
                        className={`transform -rotate-90 text-xl ${
                            page.state === "poetry" ? "font-bold text-th-primary" : ""
                        }`}
                    >
                        Work
                    </span>
                </div>
                <div
                    className="flex-grow flex w-full justify-center items-center cursor-pointer hover:text-th-secondary"
                    onClick={() => page.dispatch("about")}
                >
                    <span
                        className={`transform -rotate-90 text-xl ${
                            page.state === "about" ? "font-bold text-th-primary" : ""
                        }`}
                    >
                        About
                    </span>
                </div>
            </div>
            <div className="mt-auto pt-6 mb-6 flex justify-center">
                <ThemeSwitcher />
            </div>
        </div>
    );
}
