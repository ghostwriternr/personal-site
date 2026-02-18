import { useEffect, useCallback, useRef, useMemo, useState } from "react";
import Slide from "../../../components/slides/Slide";
import { useStep } from "../../../components/slides/useStep";
import TerminalMockup from "../../../components/slides/TerminalMockup";
import BrowserMockup from "../../../components/slides/BrowserMockup";
import { ArrowFatUp } from "@phosphor-icons/react";
import { useSandbox } from "../../../components/slides/useSandbox";
import { useSlideActions } from "../../../components/slides/useSlideActions";

const WS_URL = "wss://goose-pond-editor.ghostwriternr.me/ws/session";
const INITIAL_URL = "https://goose-pond.ghostwriternr.me/";

const fullLines = [
    { text: "service at capacity — try again shortly", type: "error" as const },
];

function extractPrompt(input: string): string {
    const quoted = input.match(/^sandbox\s+"(.+)"$/);
    if (quoted) return quoted[1];
    const unquoted = input.match(/^sandbox\s+(.+)$/);
    if (unquoted) return unquoted[1];
    return input;
}

function SandboxSlide() {
    const step = useStep();
    const showHooks = step >= 1;
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {
        lines,
        previewUrl,
        status,
        elapsed,
        hasStoredSession,
        start,
        restore,
    } = useSandbox({
        url: WS_URL,
        sessionKey: "goose-pond",
    });

    useEffect(() => {
        if (status === "done" && iframeRef.current) {
            iframeRef.current.src += "";
        }
    }, [status]);

    useEffect(() => {
        if (previewUrl) setActiveTabIndex(1);
    }, [previewUrl]);

    const canInput =
        status === "idle" ||
        status === "done" ||
        status === "expired" ||
        status === "error";

    const handleTerminalSubmit = useCallback(
        (input: string) => {
            start(extractPrompt(input));
        },
        [start]
    );

    const handleTerminalEnter = useCallback(() => {
        if (hasStoredSession) {
            restore();
        }
    }, [hasStoredSession, restore]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "r" && e.shiftKey) {
            e.preventDefault();
            localStorage.removeItem("sandbox-session:goose-pond");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useSlideActions(
        useMemo(
            () => [
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
            []
        )
    );

    const timerLabel = (() => {
        if (status === "idle" || status === "full") return null;
        if (status === "connecting") return "connecting…";
        if (status === "expired") return "expired";
        return `${elapsed.toFixed(1)}s`;
    })();

    const timerColor =
        status === "done"
            ? "text-green-400"
            : status === "error" || status === "full" || status === "expired"
              ? "text-red-400"
              : "text-(--slide-fg-muted)";

    const restoreHint =
        hasStoredSession && status === "idle" && lines.length === 0;

    const displayLines = (() => {
        if (status === "full") return fullLines;
        if (restoreHint)
            return [
                {
                    text: "Previous session found — press Enter to restore",
                    type: "info" as const,
                },
            ];
        return lines;
    })();

    const paneHeight = showHooks ? "h-[320px]" : "h-[420px]";

    return (
        <Slide hideGoose>
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
                        onSubmit={canInput ? handleTerminalSubmit : undefined}
                        onEnter={canInput ? handleTerminalEnter : undefined}
                        inputPlaceholder='sandbox "make the goose follow my cursor"'
                    />
                    <BrowserMockup
                        className="h-full w-1/2"
                        activeTabIndex={activeTabIndex}
                        onTabChange={setActiveTabIndex}
                        tabs={[
                            {
                                url: INITIAL_URL,
                                title: "goose-pond",
                                content: (
                                    <iframe
                                        src={INITIAL_URL}
                                        className="h-full w-full border-0"
                                        title="Goose Pond"
                                    />
                                ),
                            },
                            ...(previewUrl
                                ? [
                                      {
                                          url: previewUrl,
                                          title: "Preview",
                                          content: (
                                              <iframe
                                                  ref={iframeRef}
                                                  src={previewUrl}
                                                  className="h-full w-full border-0"
                                                  title="Sandbox preview"
                                              />
                                          ),
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </div>
                {showHooks && (
                    <div className="flex max-w-3xl flex-col gap-3 text-center">
                        <p className="font-lufga text-lg leading-relaxed text-(--slide-fg)">
                            There's no localhost here.
                        </p>
                        <p className="font-lufga leading-relaxed text-(--slide-fg-muted)">
                            The agent, and that preview URL we use to look at
                            it's work, had to find its way from the internet to
                            a specific port in a specific environment. And if
                            the user closes the tab and comes back tomorrow… the
                            agent expects to pick up where it left off.
                        </p>
                    </div>
                )}
            </div>
        </Slide>
    );
}

SandboxSlide.steps = 2;
SandboxSlide.notes = `Fresh session. No pre-warmed server. Watch.

[1] There's no localhost here. The agent, and that preview URL we use to look at its work, had to find its way from the internet to a specific port in a specific environment. And if the user closes the tab and comes back tomorrow — the agent expects to pick up where it left off.`;

export default SandboxSlide;
