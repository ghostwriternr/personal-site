import Slide from "../../../components/slides/Slide";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import type { TerminalLine } from "../../../components/slides/TerminalMockup";

const terminalLines: TerminalLine[] = [
    { text: "npx tsx demo.ts", type: "command", delay: 600 },
    { text: "", type: "output", delay: 300 },
    {
        text: "Creating sandbox 'demo-session'…",
        type: "output",
        delay: 800,
    },
    { text: "Sandbox ready (2.3s)", type: "success", delay: 1200 },
    { text: "Writing app.js…", type: "output", delay: 600 },
    {
        text: "Running npm install… ok",
        type: "output",
        delay: 1000,
    },
    {
        text: "Running npm start… ok (port 5173)",
        type: "output",
        delay: 800,
    },
    { text: "Exposing port 5173…", type: "info", delay: 600 },
    { text: "", type: "output", delay: 300 },
    {
        text: "Preview ready: https://preview-7f3a.example.dev",
        type: "success",
        delay: 1000,
    },
];

export default function SDKDemoSlide() {
    return (
        <Slide>
            <div className="flex h-full w-full items-center gap-4 px-8">
                <TerminalMockup
                    title="~/demo"
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
