import { useEffect, useState } from "react";
import Slide from "../../../components/slides/Slide";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import type { TerminalLine } from "../../../components/slides/TerminalMockup";

const terminalLines: TerminalLine[] = [
    {
        text: 'agent-run --fresh --task "build a tiny web app" --preview',
        type: "command",
        delay: 600,
    },
    { text: "", type: "output", delay: 400 },
    { text: "workspace: empty    cache: none", type: "info", delay: 600 },
    { text: "Creating workspace… ok", type: "output", delay: 800 },
    {
        text: "Provisioning isolated runtime… ok",
        type: "output",
        delay: 1000,
    },
    { text: "Writing files… ok (5 files)", type: "output", delay: 1200 },
    {
        text: "Starting dev server… ok (port 5173)",
        type: "output",
        delay: 800,
    },
    { text: "Exposing preview…", type: "info", delay: 600 },
    { text: "", type: "output", delay: 400 },
    {
        text: "Preview ready: https://preview-7f3a.example.dev",
        type: "success",
        delay: 1000,
    },
];

/** Total animation duration: initial 300ms + sum of all line delays */
const TOTAL_DURATION_MS =
    300 + terminalLines.reduce((sum, line) => sum + (line.delay ?? 400), 0);

function ElapsedTimer() {
    const [elapsed, setElapsed] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const start = performance.now();
        const tick = () => {
            const now = performance.now() - start;
            if (now >= TOTAL_DURATION_MS) {
                setElapsed(TOTAL_DURATION_MS / 1000);
                setDone(true);
                return;
            }
            setElapsed(now / 1000);
            requestAnimationFrame(tick);
        };
        const raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <span
            className={`font-mono text-sm tabular-nums ${done ? "text-green-400" : "text-(--slide-fg-muted)"}`}
        >
            {elapsed.toFixed(1)}s
        </span>
    );
}

export default function DemoSlide() {
    return (
        <Slide>
            <div className="absolute bottom-6 left-6 z-10">
                <ElapsedTimer />
            </div>
            <div className="flex h-full w-full items-center gap-4 px-8">
                <TerminalMockup
                    title="~/project"
                    lines={terminalLines}
                    animate
                    className="h-[420px] w-[65%]"
                />
                <BrowserMockup
                    url="https://preview-7f3a.example.dev"
                    className="h-[420px] w-[35%]"
                >
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                        <span className="font-lufga text-lg text-(--slide-fg)">
                            My App
                        </span>
                        <div className="flex w-full max-w-[200px] items-center gap-2">
                            <div className="h-8 flex-1 rounded border border-(--slide-border) bg-(--slide-bg-active) px-2" />
                            <div className="h-8 rounded bg-(--slide-accent) px-3 py-1">
                                <span className="text-xs font-medium text-(--slide-fg)">
                                    Add
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full max-w-[200px] flex-col gap-1.5">
                            <div className="h-2 w-3/4 rounded bg-(--slide-bg-active)" />
                            <div className="h-2 w-1/2 rounded bg-(--slide-bg-active)" />
                        </div>
                    </div>
                </BrowserMockup>
            </div>
        </Slide>
    );
}
