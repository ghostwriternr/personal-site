import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <Image src="/images/me.png" alt="Picture of the author" height="76" width="76" layout="fixed" />
                <div className="flex flex-col ml-4">
                    <h1 className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500 font-semibold">
                        Naresh Ramesh
                    </h1>
                    <span className="flex text-lg">
                        <div className="mr-2">Hello</div>/<div className="ml-2 mr-2 hindi">नमस्ते</div>/
                        <div className="ml-2 mr-2 tamil">வணக்கம்</div>/<div className="ml-2 telugu">స్వాగతం</div>
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-center text-right text-lg">
                <span>
                    I'm a <strong>software engineer</strong>,{" "}
                    <Link href="/blog">
                        <a>
                            <strong>writer</strong>
                        </a>
                    </Link>
                    , <strong>music aficionado</strong>.
                </span>
                <span>Open Source maintainer and supporter.</span>
                <span>Dreaming of a prosperous India.</span>
            </div>
        </div>
    );
}
