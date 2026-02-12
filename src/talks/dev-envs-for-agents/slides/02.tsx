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
    { text: "workspace: empty    cache: none", type: "info" },
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
            <span className="absolute bottom-6 left-6 font-mono text-sm text-green-400 tabular-nums">
                14.2s
            </span>
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
                <div className="flex max-w-3xl flex-col gap-3 text-center">
                    <p className="font-lufga text-lg leading-relaxed text-(--slide-fg)">
                        There's no localhost here.
                    </p>
                    <p className="font-lufga text-base leading-relaxed text-(--slide-fg-muted)">
                        That preview URL had to find its way from the internet
                        to a specific port in a specific environment.
                    </p>
                    <p className="font-lufga text-base leading-relaxed text-(--slide-fg-muted)">
                        And if the user closes the tab and comes back tomorrow…
                        the agent expects to pick up where it left off.
                    </p>
                </div>
            </div>
        </Slide>
    );
}
