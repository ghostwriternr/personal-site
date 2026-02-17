import type { SlideAction } from "./useSlideActions";

interface SlideControlsProps {
    currentSlide: number;
    totalSlides: number;
    onNext: () => void;
    onPrev: () => void;
    onToggleFullscreen: () => void;
    exitHref?: string;
    slideActions?: SlideAction[];
}

export default function SlideControls({
    currentSlide,
    totalSlides,
    onNext,
    onPrev,
    onToggleFullscreen,
    exitHref,
    slideActions = [],
}: SlideControlsProps) {
    return (
        <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-200 hover:opacity-100 [@media(hover:none)]:opacity-100">
            <div className="flex items-center gap-2">
                {exitHref && (
                    <a
                        href={exitHref}
                        className="rounded px-3 py-1 text-(--slide-fg-muted)"
                        title="Exit presentation (Esc)"
                    >
                        &#x2715;
                    </a>
                )}
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={currentSlide === 0}
                    className="rounded px-3 py-1 text-(--slide-fg-muted) disabled:opacity-20"
                >
                    &#8592;
                </button>
                {slideActions.map((action) => (
                    <button
                        key={action.id}
                        type="button"
                        onClick={action.onClick}
                        className="flex items-center gap-1 rounded px-2 py-1 font-mono text-xs text-(--slide-fg-muted) hover:text-(--slide-fg) transition-colors"
                    >
                        {action.label}
                    </button>
                ))}
            </div>
            <span className="text-xs text-(--slide-fg-muted) tabular-nums">
                {currentSlide + 1} / {totalSlides}
            </span>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onToggleFullscreen}
                    className="rounded px-3 py-1 text-(--slide-fg-muted)"
                    title="Toggle fullscreen (F)"
                >
                    &#x26F6;
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={currentSlide === totalSlides - 1}
                    className="rounded px-3 py-1 text-(--slide-fg-muted) disabled:opacity-20"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}
