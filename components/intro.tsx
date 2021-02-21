import { Facebook, Github, Gmail, Goodreads, Instagram, Linkedin, Spotify } from "@icons-pack/react-simple-icons";

import { HeadShot } from "@me/components/headshot";

export function Intro() {
    return (
        <div className="grid grid-cols-8 items-center">
            <div className="col-span-8 md:col-span-6">
                <div className="table-cell text-center">
                    <h1
                        className="text-6xl text-th-primary"
                        style={{
                            textShadow: "3px 3px 0px var(--secondary), 6px 6px 0px var(--tertiary)",
                        }}
                    >
                        Naresh Ramesh
                    </h1>
                </div>
                <div className="flex justify-center md:justify-start mt-4">
                    <h1 className="flex flex-wrap text-xl md:text-4xl text-th-primary">
                        <div className="mr-2">Hello</div>&#8226;<div className="ml-2 mr-2 hindi">नमस्ते</div>&#8226;
                        <div className="ml-2 mr-2 tamil">வணக்கம்</div>&#8226;
                        <div className="ml-2 telugu">స్వాగతం</div>
                    </h1>
                </div>
                <div className="pl-4 pr-4 md:pl-0 md:pr-0 md:hidden">
                    <HeadShot />
                </div>
                <h2 className="mt-4 col-span-4 text-xl md:text-2xl">
                    I'm a software engineer, currently working at Setu. I enjoy writing, curating music and playing the
                    Piano. Open Source maintainer &amp; supporter. Dreaming of the sky and a prosperous India.
                </h2>
                <div className="mt-4 flex space-x-4">
                    <a href="https://github.com/ghostwriternr" target="_blank" rel="noopener noreferrer">
                        <Github />
                    </a>
                    <a href="https://www.linkedin.com/in/naresh-ramesh" target="_blank" rel="noopener noreferrer">
                        <Linkedin />
                    </a>
                    <a href="mailto:ghostwriternr@gmail.com">
                        <Gmail />
                    </a>
                    <a href="https://www.facebook.com/naresh.ramesh" target="_blank" rel="noopener noreferrer">
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com/noresh.romesh" target="_blank" rel="noopener noreferrer">
                        <Instagram />
                    </a>
                    <a
                        href="https://open.spotify.com/user/22gndvram3iydupmjvgg7fz2a"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Spotify />
                    </a>
                    <a href="https://www.goodreads.com/ghostwriternr" target="_blank" rel="noopener noreferrer">
                        <Goodreads />
                    </a>
                </div>
            </div>
            <div className="invisible md:visible md:col-start-7 md:col-span-2">
                <HeadShot />
            </div>
        </div>
    );
}
