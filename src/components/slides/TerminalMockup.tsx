import { useEffect, useMemo, useRef, useState } from "react";
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
    onSubmit?: (value: string) => void;
    onEnter?: () => void;
    inputPlaceholder?: string;
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
    onSubmit,
    onEnter,
    inputPlaceholder,
}: TerminalMockupProps) {
    const [visibleCount, setVisibleCount] = useState(
        animate ? 0 : lines.length
    );
    const patternId = useMemo(
        () => `dots-${title.replace(/\W/g, "")}`,
        [title]
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const el = scrollRef.current;
        if (el && lines.length > 0) {
            el.scrollTop = el.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        if ((onSubmit || onEnter) && inputRef.current) {
            inputRef.current.focus();
        }
    }, [onSubmit, onEnter]);

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

            <div
                ref={scrollRef}
                className="flex-1 overflow-auto bg-(--slide-bg) p-5 font-mono text-sm leading-relaxed"
            >
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
                {(onSubmit || onEnter) && (
                    <div className="flex items-center whitespace-pre-wrap text-(--slide-accent-light)">
                        <span className="mr-2 text-(--slide-fg-muted) select-none">
                            $
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={inputPlaceholder}
                            className="flex-1 bg-transparent font-mono text-sm text-(--slide-accent-light) placeholder:text-(--slide-fg-muted)/40 outline-none border-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.stopPropagation();
                                    const value = e.currentTarget.value.trim();
                                    if (value && onSubmit) {
                                        onSubmit(value);
                                        e.currentTarget.value = "";
                                    } else if (!value && onEnter) {
                                        onEnter();
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
