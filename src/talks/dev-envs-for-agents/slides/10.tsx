import Slide from "../../../components/slides/Slide";

const points = [
    {
        label: "Containers",
        detail: "Share host kernel",
        sub: "Fast, lightweight",
    },
    {
        label: "MicroVMs",
        detail: "Own kernel, own network",
        sub: "Container-like speed, VM-like boundaries",
    },
    {
        label: "Full VMs",
        detail: "Gold standard isolation",
        sub: "10+ seconds to boot",
    },
];

export default function IsolationSpectrumSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg)">
                    Isolation
                </p>

                <div className="flex items-start">
                    {points.map((point, i) => (
                        <div
                            key={point.label}
                            className="flex flex-1 flex-col items-center gap-3"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-lufga text-xl font-light text-(--slide-accent-light)">
                                    {point.label}
                                </span>
                                <span className="text-sm text-(--slide-fg)">
                                    {point.detail}
                                </span>
                                <span className="text-xs text-(--slide-fg-muted)">
                                    {point.sub}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="shrink-0 text-xs text-(--slide-fg-muted)">
                        Faster / lighter
                    </span>
                    <div className="h-px flex-1 bg-(--slide-border)" />
                    <div className="h-2 w-2 rotate-45 border-t border-r border-(--slide-fg-muted)" />
                    <span className="shrink-0 text-xs text-(--slide-fg-muted)">
                        Stronger isolation
                    </span>
                </div>
            </div>
        </Slide>
    );
}
