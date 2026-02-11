interface SlideControlsProps {
    currentSlide: number;
    totalSlides: number;
    onNext: () => void;
    onPrev: () => void;
    onToggleFullscreen: () => void;
    exitHref?: string;
}

export default function SlideControls({
    currentSlide,
    totalSlides,
    onNext,
    onPrev,
    onToggleFullscreen,
    exitHref,
}: SlideControlsProps) {
    return (
        <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-200 hover:opacity-100">
            <div className="flex gap-2">
                {exitHref && (
                    <a
                        href={exitHref}
                        className="rounded px-3 py-1 text-[var(--color-subtext)]"
                        title="Exit presentation (Esc)"
                    >
                        &#x2715;
                    </a>
                )}
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={currentSlide === 0}
                    className="rounded px-3 py-1 text-[var(--color-subtext)] disabled:opacity-20"
                >
                    &#8592;
                </button>
            </div>
            <span className="text-xs text-[var(--color-subtext)] tabular-nums">
                {currentSlide + 1} / {totalSlides}
            </span>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onToggleFullscreen}
                    className="rounded px-3 py-1 text-[var(--color-subtext)]"
                    title="Toggle fullscreen (F)"
                >
                    &#x26F6;
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={currentSlide === totalSlides - 1}
                    className="rounded px-3 py-1 text-[var(--color-subtext)] disabled:opacity-20"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}
