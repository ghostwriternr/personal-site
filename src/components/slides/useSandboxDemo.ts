import { useState, useCallback, useRef, useEffect } from "react";
import type { TerminalLine } from "./TerminalMockup";

type DemoStatus = "idle" | "running" | "done" | "error";

interface SandboxDemoResult {
    lines: TerminalLine[];
    previewUrl: string | null;
    status: DemoStatus;
    elapsed: number;
    start: () => void;
}

function parseSSE(
    raw: string
): { event: string; data: Record<string, unknown> } | null {
    let event = "";
    let data = "";

    for (const line of raw.split("\n")) {
        if (line.startsWith("event: ")) event = line.slice(7).trim();
        else if (line.startsWith("data: ")) data = line.slice(6).trim();
    }

    if (!event || !data) return null;
    try {
        return { event, data: JSON.parse(data) };
    } catch {
        return null;
    }
}

function sseLineType(step: string, hasUrl: boolean): TerminalLine["type"] {
    if (hasUrl) return "success";
    if (step === "agent") return "info";
    return "output";
}

export function useSandboxDemo(
    apiUrl: string,
    prompt: string
): SandboxDemoResult {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<DemoStatus>("idle");
    const [elapsed, setElapsed] = useState(0);

    const rafRef = useRef(0);
    const abortRef = useRef<AbortController | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        return () => {
            cancelAnimationFrame(rafRef.current);
            abortRef.current?.abort();
        };
    }, []);

    const start = useCallback(async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLines([
            {
                text: `demo "${prompt}"`,
                type: "command",
            },
        ]);
        setPreviewUrl(null);
        setStatus("running");
        setElapsed(0);

        startTimeRef.current = performance.now();
        const tick = () => {
            setElapsed((performance.now() - startTimeRef.current) / 1000);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        const stopTimer = () => cancelAnimationFrame(rafRef.current);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                throw new Error(`HTTP ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            for (;;) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split("\n\n");
                buffer = parts.pop() ?? "";

                for (const part of parts) {
                    const evt = parseSSE(part);
                    if (!evt) continue;

                    if (evt.event === "status") {
                        const msg = evt.data.message as string;
                        const url = evt.data.url as string | undefined;
                        const step = evt.data.step as string;
                        const type = sseLineType(step, !!url);
                        const text = url ? `${msg} ${url}` : msg;

                        setLines((prev) => [...prev, { text, type }]);
                        if (url) setPreviewUrl(url);
                    } else if (evt.event === "done") {
                        setLines((prev) => [
                            ...prev,
                            {
                                text: evt.data.message as string,
                                type: "success" as const,
                            },
                        ]);
                        setPreviewUrl(evt.data.url as string);
                        setStatus("done");
                        stopTimer();
                    } else if (evt.event === "error") {
                        setLines((prev) => [
                            ...prev,
                            {
                                text: evt.data.message as string,
                                type: "error" as const,
                            },
                        ]);
                        setStatus("error");
                        stopTimer();
                    }
                }
            }

            setStatus((prev) => (prev === "running" ? "done" : prev));
            stopTimer();
        } catch (err: unknown) {
            if (controller.signal.aborted) return;
            const message = err instanceof Error ? err.message : String(err);
            setLines((prev) => [
                ...prev,
                { text: `Error: ${message}`, type: "error" as const },
            ]);
            setStatus("error");
            stopTimer();
        }
    }, [apiUrl, prompt]);

    return { lines, previewUrl, status, elapsed, start };
}
