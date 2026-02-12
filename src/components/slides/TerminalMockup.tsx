import { useEffect, useMemo, useState } from "react";
import DotGrid from "./DotGrid";

export interface TerminalLine {
    text: string;
    type?: "command" | "output" | "success" | "error" | "info" | "url";
    delay?: number;
}

interface TerminalMockupProps {
    title?: string;
    lines: TerminalLine[];
    animate?: boolean;
    baseDelay?: number;
    className?: string;
}

const lineColor: Record<NonNullable<TerminalLine["type"]>, string> = {
    command: "text-(--slide-accent-light)",
    output: "text-(--slide-fg-muted)",
    success: "text-green-400",
    error: "text-red-400",
    info: "text-(--slide-fg-muted)",
    url: "text-(--slide-accent-light) underline",
};

export default function TerminalMockup({
    title = "Terminal",
    lines,
    animate = false,
    baseDelay = 400,
    className = "",
}: TerminalMockupProps) {
    const [visibleCount, setVisibleCount] = useState(
        animate ? 0 : lines.length
    );
    const patternId = useMemo(
        () => `dots-${title.replace(/\W/g, "")}`,
        [title]
    );

    useEffect(() => {
        if (!animate) {
            setVisibleCount(lines.length);
            return;
        }

        setVisibleCount(0);
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        let cumulative = 300;

        for (let i = 0; i < lines.length; i++) {
            cumulative += lines[i].delay ?? baseDelay;
            timeouts.push(setTimeout(() => setVisibleCount(i + 1), cumulative));
        }

        return () => timeouts.forEach(clearTimeout);
    }, [animate, lines, baseDelay]);

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-xl border border-(--slide-border) bg-(--slide-bg) ${className}`}
        >
            <div className="relative flex h-10 items-center border-b border-(--slide-border) px-4">
                <DotGrid id={patternId} className="opacity-50" />
                <div className="relative z-10 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg)" />
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg)" />
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg)" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-(--slide-bg) p-5 font-mono text-sm leading-relaxed">
                {lines.map((line) => (
                    <div
                        key={line.text}
                        className={`whitespace-pre-wrap transition-opacity duration-300 ${
                            lineColor[line.type ?? "output"]
                        } ${lines.indexOf(line) < visibleCount ? "opacity-100" : "opacity-0"}`}
                    >
                        {line.type === "command" && (
                            <span className="mr-2 text-(--slide-fg-muted) select-none">
                                $
                            </span>
                        )}
                        {line.text}
                    </div>
                ))}
                {animate && visibleCount < lines.length && (
                    <span className="inline-block h-4 w-2 animate-pulse bg-(--slide-fg-muted)" />
                )}
            </div>
        </div>
    );
}
