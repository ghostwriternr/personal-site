import {
    ArrowsClockwiseIcon,
    ChartBarIcon,
    type Icon as PhosphorIcon,
    SpinnerIcon,
    TerminalWindowIcon,
    WaveformSlashIcon,
} from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";

const capabilities: { icon: PhosphorIcon; title: string; desc: string }[] = [
    {
        icon: SpinnerIcon,
        title: "Background processes",
        desc: "Run and manage concurrent long-lived services.",
    },
    {
        icon: WaveformSlashIcon,
        title: "Streaming",
        desc: "Real-time logs from all commands & processes, as it happens.",
    },
    {
        icon: ArrowsClockwiseIcon,
        title: "Continuity",
        desc: "Sessions where cd, env vars, and installed packages persist across commands.",
    },
    {
        icon: TerminalWindowIcon,
        title: "Terminal / PTY",
        desc: "Embed a live bash session directly in your app — think xterm in the browser.",
    },
    {
        icon: ChartBarIcon,
        title: "Code interpreter",
        desc: "Execute code directly — return raw stdout, as well as charts, tables, images.",
    },
];

function NonTrivialSlide() {
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
                            <div
                                key={cap.title}
                                className="flex items-start gap-4"
                            >
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

NonTrivialSlide.notes = `What actually separates a code runner from a dev environment is the next layer.

Background processes — the agent starts a dev server and keeps working in parallel. Streaming — it reacts to output as it happens, not after the command exits. Continuity — cd and npm install carry over; the agent isn't starting from scratch on every command. A real PTY — not just exec/response, but a live shell session you can embed in a UI. And a code interpreter — execute code and get back not just stdout, but charts, tables, images.

The difference between a code runner and a dev environment is this list.`;

export default NonTrivialSlide;
