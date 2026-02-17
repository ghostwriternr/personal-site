import { GithubLogo, XLogo } from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";
import bioPhoto from "../../../assets/bio.jpeg";

export default function ClosingSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl items-center gap-16">
                <div className="flex flex-1 flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-lufga text-5xl font-light text-(--slide-fg)">
                            Naresh Ramesh
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-lg text-(--slide-accent-light)">
                                @ghostwriternr
                            </span>
                            <div className="flex items-center gap-3 text-(--slide-fg-muted)">
                                <XLogo className="size-5" weight="fill" />
                                <GithubLogo className="size-5" weight="fill" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-(--slide-fg-muted)">
                        <span className="text-2xl">Systems Engineer at Cloudflare</span>
                        <span className="text-2xl">Sandboxes whisperer</span>
                        <span className="text-2xl">Pixel art enthusiast</span>
                        <span className="text-2xl">Recovering founder</span>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                        <span className="font-mono text-base text-(--slide-fg-muted)">
                            sandbox.cloudflare.com
                        </span>
                        <span className="text-base text-(--slide-fg-muted)">
                            Craig Dennis: "Using Sandboxes to Safely
                            Execute Untrusted Code"
                        </span>
                    </div>
                </div>
                <div className="shrink-0">
                    <img
                        src={bioPhoto.src}
                        alt="Naresh Ramesh"
                        className="size-64 rounded-xl object-cover"
                    />
                </div>
            </div>
        </Slide>
    );
}
