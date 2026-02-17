import Slide from "../../../components/slides/Slide";

const milestones = [
    { era: "Today", items: ["Ephemeral sandboxes", "SDK-driven lifecycle"] },
    { era: "Tomorrow", items: ["Transparent snapshots", "GPU access"] },
    { era: "Future", items: ["Multi-sandbox orchestration", "Sandbox as IDE"] },
];

export default function WhatsNextSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-8">
                <p className="font-lufga text-3xl font-light text-(--slide-fg)">
                    Where is this heading?
                </p>

                <div className="flex items-start gap-6">
                    {milestones.map((m, i) => (
                        <div
                            key={m.era}
                            className="flex flex-1 items-start gap-4"
                        >
                            <div className="flex flex-col gap-3">
                                <span className="font-lufga text-lg text-(--slide-accent-light)">
                                    {m.era}
                                </span>
                                {m.items.map((item) => (
                                    <span
                                        key={item}
                                        className="text-sm text-(--slide-fg-muted)"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                            {i < milestones.length - 1 && (
                                <div className="mt-3 flex flex-1 items-center">
                                    <div className="h-px flex-1 bg-(--slide-border)" />
                                    <div className="h-1.5 w-1.5 rotate-45 border-t border-r border-(--slide-fg-muted)" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Slide>
    );
}
