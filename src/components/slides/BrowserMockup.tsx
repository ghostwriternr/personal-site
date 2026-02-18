import type { ReactNode } from "react";
import { Globe, LockSimple } from "@phosphor-icons/react";
import DotGrid from "./DotGrid";

export interface BrowserTab {
    url: string;
    title?: string;
    content: ReactNode;
}

interface BrowserMockupProps {
    tabs?: BrowserTab[];
    activeTabIndex?: number;
    onTabChange?: (index: number) => void;
    url?: string;
    tabTitle?: string;
    children?: ReactNode;
    className?: string;
}

function TabShape({ active }: { active: boolean }) {
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
                fill={active ? "var(--slide-bg)" : "var(--slide-bg-surface)"}
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
    tabs,
    activeTabIndex = 0,
    onTabChange,
    url = "https://example.com",
    tabTitle,
    children,
    className = "",
}: BrowserMockupProps) {
    const isMultiTab = tabs && tabs.length > 0;
    const displayTabs: BrowserTab[] = isMultiTab
        ? tabs
        : [{ url, title: tabTitle ?? "Preview", content: children }];
    const activeIdx = isMultiTab
        ? Math.min(activeTabIndex, tabs.length - 1)
        : 0;
    const activeUrl = displayTabs[activeIdx]?.url ?? url;

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

                    {displayTabs.map((tab, i) => (
                        <button
                            key={tab.url}
                            className="relative h-[36px] w-[160px] shrink-0 cursor-pointer"
                            onClick={() => onTabChange?.(i)}
                            type="button"
                        >
                            <TabShape active={i === activeIdx} />
                            <span
                                className="pointer-events-none absolute inset-0 z-10 flex items-center gap-1.5 truncate px-4 font-mono text-xs select-none"
                                style={{
                                    color: "var(--slide-fg-muted)",
                                    opacity: i === activeIdx ? 1 : 0.5,
                                }}
                            >
                                <Globe
                                    size={12}
                                    weight="bold"
                                    className="shrink-0"
                                />
                                {tab.title ?? "Preview"}
                            </span>
                        </button>
                    ))}

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
                        {activeUrl}
                    </span>
                </div>
            </div>

            <div className="relative flex-1 overflow-hidden bg-(--slide-bg)">
                {displayTabs.map((tab, i) => (
                    <div
                        key={tab.url}
                        className="absolute inset-0"
                        style={{ display: i === activeIdx ? "block" : "none" }}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
