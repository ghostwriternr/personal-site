import { useEffect, useCallback, useRef, useMemo } from "react";
import Slide from "../../../components/slides/Slide";
import { useStep } from "../../../components/slides/useStep";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import { ArrowFatUp, KeyReturn } from "@phosphor-icons/react";
import { useSandbox } from "../../../components/slides/useSandbox";
import { useSlideActions } from "../../../components/slides/useSlideActions";

const WS_URL = "wss://goose-pond-editor.ghostwriternr.me/ws/session";
const PROMPT = "make the goose follow my cursor";

const idleLines = [
    { text: "press Enter to start", type: "info" as const },
];

const fullLines = [
    { text: "service at capacity — try again shortly", type: "error" as const },
];

function SandboxSlide() {
    const step = useStep();
    const showHooks = step >= 1;
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { lines, previewUrl, status, elapsed, start } = useSandbox({
        url: WS_URL,
        prompt: PROMPT,
        sessionKey: "goose-pond",
    });

    useEffect(() => {
        if (status === "done" && iframeRef.current) {
            iframeRef.current.src += "";
        }
    }, [status]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (
                e.key === "Enter" &&
                (status === "idle" || status === "done")
            ) {
                e.preventDefault();
                start();
            }
            if (e.key === "r" && e.shiftKey) {
                e.preventDefault();
                localStorage.removeItem("sandbox-session:goose-pond");
                window.location.reload();
            }
        },
        [status, start],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useSlideActions(
        useMemo(
            () => [
                {
                    id: "start",
                    label: (
                        <>
                            <KeyReturn size={14} /> start
                        </>
                    ),
                    onClick: start,
                },
                {
                    id: "reset",
                    label: (
                        <>
                            <ArrowFatUp size={14} />R reset
                        </>
                    ),
                    onClick: () => {
                        localStorage.removeItem("sandbox-session:goose-pond");
                        window.location.reload();
                    },
                },
            ],
            [start],
        ),
    );

    const timerLabel = (() => {
        if (status === "idle" || status === "full") return null;
        if (status === "connecting") return "connecting…";
        return `${elapsed.toFixed(1)}s`;
    })();

    const timerColor =
        status === "done"
            ? "text-green-400"
            : status === "error" || status === "full"
              ? "text-red-400"
              : "text-(--slide-fg-muted)";

    const displayLines = (() => {
        if (status === "full") return fullLines;
        if (status === "idle" && lines.length === 0) return idleLines;
        return lines;
    })();

    const paneHeight = showHooks ? "h-[320px]" : "h-[420px]";

    return (
        <Slide>
            {timerLabel && (
                <div className="absolute bottom-6 left-6 z-10">
                    <span
                        className={`font-mono text-sm tabular-nums ${timerColor}`}
                    >
                        {timerLabel}
                    </span>
                </div>
            )}
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-8">
                <div
                    className={`flex w-full items-center gap-4 transition-all duration-500 ${paneHeight}`}
                >
                    <TerminalMockup
                        title="~/sandbox"
                        lines={displayLines}
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
                                    {status === "idle" || status === "full"
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

SandboxSlide.steps = 2;

export default SandboxSlide;
