import { Facebook, Github, Gmail, Goodreads, Instagram, Linkedin } from "@icons-pack/react-simple-icons";

export function Body() {
    return (
        <>
            <div className="mt-8 grid grid-cols-12 items-center">
                <div className="col-start-3 col-span-6">
                    <h1 className="flex text-4xl font-semibold" style={{ color: "#47184c" }}>
                        <div className="mr-2">Hello</div>&#8226;<div className="ml-2 mr-2 hindi">नमस्ते</div>&#8226;
                        <div className="ml-2 mr-2 tamil">வணக்கம்</div>&#8226;
                        <div className="ml-2 telugu">స్వాగతం</div>
                    </h1>
                    <h2 className="mt-8 col-span-4 text-2xl">
                        I'm a software engineer, currently working at Setu. I enjoy writing, curating music and playing
                        the Piano. Open Source maintainer &amp; supporter. Dreaming of the sky and a prosperous India.
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
                        <a href="https://www.goodreads.com/ghostwriternr" target="_blank" rel="noopener noreferrer">
                            <Goodreads />
                        </a>
                    </div>
                </div>
                <div
                    className="col-start-9 col-span-2"
                    style={{
                        background: "#ffe69a",
                        padding: 10,
                        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);",
                    }}
                >
                    <img
                        src="/images/profile.jpg"
                        alt="Profile"
                        style={{
                            clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
