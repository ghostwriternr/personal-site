import Slide from "../../../components/slides/Slide";

const layers = [
    { label: "Internet", detail: null },
    { label: "Cloudflare Edge", detail: null },
    { label: "Worker", detail: "your code, your auth, your routing" },
    { label: "Durable Object", detail: "lifecycle, addressing, sleep/wake" },
    {
        label: "Firecracker microVM",
        detail: "own kernel, own network, own filesystem",
    },
    { label: "Container", detail: "agent's code runs here" },
    { label: "Port 5173", detail: "preview URL target" },
];

export default function ArchitectureSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-0">
                {layers.map((layer, i) => (
                    <div
                        key={layer.label}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 rounded-lg border border-(--slide-border) bg-(--slide-bg-surface) px-6 py-3">
                            <span className="font-lufga text-base text-(--slide-fg)">
                                {layer.label}
                            </span>
                            {layer.detail && (
                                <span className="font-mono text-xs text-(--slide-fg-muted)">
                                    {layer.detail}
                                </span>
                            )}
                        </div>
                        {i < layers.length - 1 && (
                            <div className="flex flex-col items-center">
                                <div className="h-4 w-px bg-(--slide-border)" />
                                <div className="h-1.5 w-1.5 rotate-45 border-r border-b border-(--slide-fg-muted)" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Slide>
    );
}
