import Slide from "../../../components/slides/Slide";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import type { TerminalLine } from "../../../components/slides/TerminalMockup";

const terminalLines: TerminalLine[] = [
    {
        text: 'agent-run --fresh --task "build a tiny web app" --preview',
        type: "command",
    },
    { text: "", type: "output" },
    { text: "Creating workspace… ok", type: "output" },
    { text: "Provisioning isolated runtime… ok", type: "output" },
    { text: "Writing files… ok (5 files)", type: "output" },
    { text: "Starting dev server… ok (port 5173)", type: "output" },
    { text: "Exposing preview…", type: "info" },
    { text: "", type: "output" },
    {
        text: "Preview ready: https://preview-7f3a.example.dev",
        type: "success",
    },
];

export default function FreezeFrameSlide() {
    return (
        <Slide>
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-8">
                <div className="flex w-full items-center gap-4">
                    <TerminalMockup
                        title="~/project"
                        lines={terminalLines}
                        className="h-[360px] w-[65%]"
                    />
                    <BrowserMockup
                        url="https://preview-7f3a.example.dev"
                        className="h-[360px] w-[35%]"
                    />
                </div>
                <p className="font-lufga max-w-3xl text-center text-lg leading-relaxed text-(--slide-fg)">
                    One command and one link. But to make that link exist, the
                    platform had to create a filesystem, boot an isolated
                    runtime, start a server, wire up networking, and expose it
                    safely to the internet.
                </p>
            </div>
        </Slide>
    );
}
