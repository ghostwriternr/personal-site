import { useEffect, useCallback, useRef, useMemo, useState } from "react";
import Slide from "../../../components/slides/Slide";
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

function DemoReprise() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [activeTabIndex, setActiveTabIndex] = useState(1);
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
            <div className="flex h-full w-full items-center gap-4 px-8 py-10">
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
                        {
                            url: previewUrl ?? "about:blank",
                            title: "Preview",
                            content: previewUrl ? (
                                <iframe
                                    ref={iframeRef}
                                    src={previewUrl}
                                    className="h-full w-full border-0"
                                    title="Sandbox preview"
                                />
                            ) : null,
                        },
                    ]}
                />
            </div>
        </Slide>
    );
}

DemoReprise.notes = `Same demo as the opening. But notice the restore — when you get the four decisions right, picking up a previous session should be practically instant.`;

export default DemoReprise;
