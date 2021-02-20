import Image from "next/image";
import Link from "next/link";

export function Sections() {
    return (
        <div className="grid gap-4 md:mt-12">
            <Link href="/blog" passHref>
                <div
                    className="relative inline-block cursor-pointer bg-th-theme-accent p-2"
                    style={{
                        clipPath: "polygon(0 0, calc(100% - 68px) 0, 100% 68px, 100% 100%, 0 100%)",
                    }}
                >
                    <div
                        className="block"
                        style={{ clipPath: "polygon(0 0, calc(100% - 64px) 0, 100% 64px, 100% 100%, 0 100%)" }}
                    >
                        <Image
                            src="/images/hero-blog.jpg"
                            alt="Blog"
                            layout="responsive"
                            width={3000}
                            height={1000}
                            objectFit="cover"
                        />
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/2">
                        <div className="flex flex-col justify-center items-center h-full text-black">
                            <h2 className="md:text-2xl font-bold">A Silhouette's Squire</h2>
                            <p className="text-sm md:text-lg">My poetry &amp; prose from over the years.</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/code" passHref>
                <div
                    className="relative inline-block cursor-pointer bg-th-theme-accent p-2"
                    style={{
                        clipPath: "polygon(68px 0, 100% 0, 100% 100%, 0 100%, 0 68px)",
                    }}
                >
                    <div className="block" style={{ clipPath: "polygon(64px 0, 100% 0, 100% 100%, 0 100%, 0 64px)" }}>
                        <Image
                            src="/images/swartz.jpg"
                            alt="Code"
                            layout="responsive"
                            width={3000}
                            height={1000}
                            objectFit="cover"
                        />
                    </div>
                    <div className="absolute top-0 left-0 h-full w-1/2">
                        <div className="flex flex-col justify-center items-center h-full text-black">
                            <h2 className="text-2xl font-bold">Kill Dash Nine</h2>
                            <p className="text-lg">Ramblings about code and software.</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
