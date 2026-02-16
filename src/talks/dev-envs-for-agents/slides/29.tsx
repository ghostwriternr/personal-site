import Slide from "../../../components/slides/Slide";

export default function ClosingSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-8">
                <span className="font-mono text-2xl text-(--slide-accent-light)">
                    @ghostwriternr
                </span>
                <div className="flex flex-col items-center gap-3">
                    <span className="font-mono text-sm text-(--slide-fg-muted)">
                        developers.cloudflare.com/containers
                    </span>
                    <span className="text-sm text-(--slide-fg-muted)">
                        Craig Dennis: "Using Sandboxes to Safely Execute
                        Untrusted Code" (workshop)
                    </span>
                </div>
            </div>
        </Slide>
    );
}
