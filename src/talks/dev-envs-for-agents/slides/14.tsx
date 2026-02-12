import Slide from "../../../components/slides/Slide";

const hops = [
    { label: "Internet", mono: null },
    { label: "Your routing layer", mono: "auth · rate limiting · logging" },
    { label: "Environment", mono: "port 5173" },
];

export default function RoutingSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <div className="flex items-center justify-between px-4">
                    {hops.map((hop, i) => (
                        <div
                            key={hop.label}
                            className="flex items-center gap-6"
                        >
                            <div className="flex flex-col items-center gap-2 rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) px-6 py-5">
                                <span className="font-lufga text-lg text-(--slide-fg)">
                                    {hop.label}
                                </span>
                                {hop.mono && (
                                    <span className="font-mono text-xs text-(--slide-fg-muted)">
                                        {hop.mono}
                                    </span>
                                )}
                            </div>
                            {i < hops.length - 1 && (
                                <div className="flex items-center">
                                    <div className="h-px w-16 bg-(--slide-border)" />
                                    <div className="h-2 w-2 rotate-45 border-t border-r border-(--slide-fg-muted)" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="font-lufga max-w-2xl self-center text-center text-lg font-light text-(--slide-fg-muted)">
                    The routing layer isn't just plumbing — it's where you put
                    auth, rate limiting, and decide who can reach this
                    environment.
                </p>
            </div>
        </Slide>
    );
}
