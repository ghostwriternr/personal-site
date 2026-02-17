import {
    ArrowsClockwise,
    ChartBar,
    type Icon as PhosphorIcon,
    Spinner,
    TerminalWindow,
    WaveformSlash,
} from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";

const capabilities: { icon: PhosphorIcon; title: string; desc: string }[] = [
    {
        icon: Spinner,
        title: "Background processes",
        desc: "Run concurrent long-lived services, not just sequential commands.",
    },
    {
        icon: WaveformSlash,
        title: "Streaming",
        desc: "Real-time output as it happens, not buffered after completion.",
    },
    {
        icon: ArrowsClockwise,
        title: "Continuity",
        desc: "Sessions where cd, env vars, and installed packages persist across commands.",
    },
    {
        icon: TerminalWindow,
        title: "Terminal / PTY",
        desc: "Interactive bidirectional shell over WebSocket, not just exec/response.",
    },
    {
        icon: ChartBar,
        title: "Rich outputs",
        desc: "Structured data from code execution — charts, tables, images — not just stdout.",
    },
];

export default function NonTrivialSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg-muted)">
                    The non-trivial parts
                </p>
                <div className="flex w-full max-w-3xl flex-col gap-5">
                    {capabilities.map((cap) => {
                        const Icon = cap.icon;
                        return (
                            <div key={cap.title} className="flex items-start gap-4">
                                <Icon
                                    size={24}
                                    weight="light"
                                    className="mt-0.5 shrink-0 text-(--slide-fg-muted)"
                                />
                                <div>
                                    <h3 className="font-lufga text-xl font-medium">
                                        {cap.title}
                                    </h3>
                                    <p className="mt-1 leading-relaxed text-(--slide-fg-muted)">
                                        {cap.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Slide>
    );
}
