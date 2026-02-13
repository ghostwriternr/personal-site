import { useEffect, useCallback, useRef } from "react";
import Slide from "../../../components/slides/Slide";
import { useStep } from "../../../components/slides/useStep";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import { useSandboxDemo } from "../../../components/slides/useSandboxDemo";

const API_URL = "http://localhost:8787/demo";
const PROMPT = "make the goose follow my cursor";

const idleLines = [
    { text: "press Enter to start demo", type: "info" as const },
];

function DemoSlide() {
    const step = useStep();
    const showHooks = step >= 1;
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { lines, previewUrl, status, elapsed, start } = useSandboxDemo(
        API_URL,
        PROMPT
    );

    useEffect(() => {
        if (status === "done" && iframeRef.current) {
            iframeRef.current.src += "";
        }
    }, [status]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Enter" && status === "idle") {
                e.preventDefault();
                start();
            }
        },
        [status, start]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const timerColor =
        status === "done"
            ? "text-green-400"
            : status === "error"
              ? "text-red-400"
              : "text-(--slide-fg-muted)";

    const paneHeight = showHooks ? "h-[320px]" : "h-[420px]";

    return (
        <Slide>
            <div className="absolute bottom-6 left-6 z-10">
                <span
                    className={`font-mono text-sm tabular-nums ${timerColor}`}
                >
                    {status === "idle" ? "enter ↵" : `${elapsed.toFixed(1)}s`}
                </span>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-8">
                <div
                    className={`flex w-full items-center gap-4 transition-all duration-500 ${paneHeight}`}
                >
                    <TerminalMockup
                        title="~/demo"
                        lines={status === "idle" ? idleLines : lines}
                        className="h-full w-1/2"
                    />
                    <BrowserMockup
                        url={previewUrl ?? "about:blank"}
                        className="h-full w-1/2"
                    >
                        {previewUrl ? (
                            <iframe
                                ref={iframeRef}
                                src={previewUrl}
                                className="h-full w-full border-0"
                                title="Sandbox preview"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <span className="text-sm text-(--slide-fg-muted)">
                                    {status === "idle"
                                        ? ""
                                        : "Waiting for preview…"}
                                </span>
                            </div>
                        )}
                    </BrowserMockup>
                </div>
                {showHooks && (
                    <div className="flex max-w-3xl flex-col gap-3 text-center">
                        <p className="font-lufga text-lg leading-relaxed text-(--slide-fg)">
                            There's no localhost here.
                        </p>
                        <p className="font-lufga text-base leading-relaxed text-(--slide-fg-muted)">
                            That preview URL had to find its way from the
                            internet to a specific port in a specific
                            environment.
                        </p>
                        <p className="font-lufga text-base leading-relaxed text-(--slide-fg-muted)">
                            And if the user closes the tab and comes back
                            tomorrow… the agent expects to pick up where it left
                            off.
                        </p>
                    </div>
                )}
            </div>
        </Slide>
    );
}

DemoSlide.steps = 2;

export default DemoSlide;
