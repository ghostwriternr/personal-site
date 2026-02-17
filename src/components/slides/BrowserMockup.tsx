import { Globe, LockSimple } from "@phosphor-icons/react";
import DotGrid from "./DotGrid";

interface BrowserMockupProps {
    url?: string;
    tabTitle?: string;
    children?: React.ReactNode;
    className?: string;
}

function TabSvg() {
    return (
        <svg
            width="160"
            height="32"
            viewBox="0 0 200 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
        >
            <path
                d="M16.1689 0.5H184.033C188.175 0.500002 191.533 3.85787 191.533 8V34C191.533 38 195 41.5 200 41.5H0C5 41.5 8.669 38 8.669 34V8C8.669 3.85787 12.0268 0.5 16.1689 0.5Z"
                fill="var(--slide-bg)"
            />
            <path
                d="M16.1689 0.5H184.033C188.175 0.500002 191.533 3.85787 191.533 8V34C191.533 38 195 41.5 200 41.5"
                stroke="var(--slide-border)"
                fill="none"
            />
            <path
                d="M16.1689 0.5C12.0268 0.5 8.669 3.85787 8.669 8V34C8.669 38 5 41.5 0 41.5"
                stroke="var(--slide-border)"
                fill="none"
            />
        </svg>
    );
}

export default function BrowserMockup({
    url = "https://example.com",
    tabTitle,
    children,
    className = "",
}: BrowserMockupProps) {
    const displayTitle = tabTitle ?? "Preview";

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) ${className}`}
        >
            <div className="relative">
                <DotGrid id="dots-browser" className="opacity-50" />
                <div className="relative z-10 flex h-10 w-full items-end">
                    <div className="flex h-full items-center gap-1.5 border-b border-(--slide-border) px-4">
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg-surface)" />
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg-surface)" />
                        <span className="block h-3 w-3 rounded-full border border-(--slide-border) bg-(--slide-bg-surface)" />
                    </div>
                    <div className="relative h-[36px] w-[160px] shrink-0">
                        <TabSvg />
                        <span className="pointer-events-none absolute inset-0 z-10 flex items-center gap-1.5 truncate px-4 font-mono text-xs text-(--slide-fg-muted) select-none">
                            <Globe
                                size={12}
                                weight="bold"
                                className="shrink-0"
                            />
                            {displayTitle}
                        </span>
                    </div>
                    <div className="flex-1 border-b border-(--slide-border)" />
                </div>
            </div>

            <div className="flex items-center bg-(--slide-bg) px-2 py-2">
                <div className="flex flex-1 items-center rounded-md bg-(--slide-bg-active) px-3 py-1.5">
                    <LockSimple
                        size={12}
                        weight="bold"
                        className="mr-2 shrink-0 text-(--slide-fg-muted)"
                    />
                    <span className="truncate font-mono text-xs text-(--slide-fg-muted)">
                        {url}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-hidden bg-(--slide-bg)">
                {children}
            </div>
        </div>
    );
}
