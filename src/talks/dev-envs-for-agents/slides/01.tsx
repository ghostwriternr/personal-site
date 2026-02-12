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

export default function DemoSlide() {
    return (
        <Slide>
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
                />
            </div>
        </Slide>
    );
}
