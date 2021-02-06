import Link from "next/link";

export function Sections() {
    return (
        <div className="grid gap-4 mt-16">
            <Link href="/blog">
                <div
                    className="relative inline-block"
                    style={{
                        padding: "8px",
                        background: "#ffe69a",
                        clipPath: "polygon(0 0, calc(100% - 68px) 0, 100% 68px, 100% 100%, 0 100%)",
                    }}
                >
                    <img
                        className="block"
                        src="/images/hero-blog.jpg"
                        alt="Blog"
                        style={{ clipPath: "polygon(0 0, calc(100% - 64px) 0, 100% 64px, 100% 100%, 0 100%)" }}
                    />
                    <div className="absolute top-0 right-0 h-full w-1/2">
                        <div className="flex flex-col justify-center items-center h-full">
                            <h2 className="text-2xl font-bold">A Silhouette's Squire</h2>
                            <p className="text-lg">My poetry &amp; prose from over the years.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div
                className="relative inline-block"
                style={{
                    padding: "8px",
                    background: "#ffe69a",
                    clipPath: "polygon(68px 0, 100% 0, 100% 100%, 0 100%, 0 68px)",
                }}
            >
                <img
                    className="block"
                    src="/images/swartz.jpg"
                    alt="Blog"
                    style={{ clipPath: "polygon(64px 0, 100% 0, 100% 100%, 0 100%, 0 64px)" }}
                />
                <div className="absolute top-0 left-0 h-full w-1/2">
                    <div className="flex flex-col justify-center items-center h-full">
                        <h2 className="text-2xl font-bold">Kill Dash Nine</h2>
                        <p className="text-lg">Ramblings about code and software.</p>
                    </div>
                </div>
            </div>
            <div
                className="relative inline-block text-white"
                style={{
                    padding: "8px",
                    backgroundImage: "url('/images/confetti.svg')",
                    clipPath: "polygon(0 0, calc(100% - 68px) 0, 100% 68px, 100% 100%, 0 100%)",
                }}
            >
                <div className="flex justify-center w-1/2">
                    <img src="/images/stormtroopocat.png" alt="Blog" />
                </div>
                <div className="absolute top-0 right-0 h-full w-1/2">
                    <div className="flex flex-col justify-center items-center h-full">
                        <h2 className="text-2xl font-bold">Projects</h2>
                        <p className="text-lg">Some favourite projects I have worked on.</p>
                    </div>
                </div>
            </div>
            <div
                className="relative inline-block text-white"
                style={{ border: "8px solid #ffe69a", background: "#fcaf61" }}
            >
                <img className="block" src="/images/career.png" alt="Blog" />
                <div className="absolute top-0 left-0 h-full w-1/2">
                    <div className="flex flex-col justify-center items-center h-full">
                        <h2 className="text-2xl font-bold">Career</h2>
                        <p className="text-lg">Me through the years.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
