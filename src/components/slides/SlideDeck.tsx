import { useState, useEffect, useCallback, useRef } from "react";
import DotGrid from "./DotGrid";
import SlideControls from "./SlideControls";
import type { SlideComponent, TalkTheme } from "./types";

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

interface SlideDeckProps {
    slides: SlideComponent[];
    theme: TalkTheme;
    exitHref?: string;
}

function getInitialSlide(total: number): number {
    if (typeof window === "undefined") return 0;
    const hash = window.location.hash;
    const num = parseInt(hash.replace("#", ""), 10);
    return num >= 1 && num <= total ? num - 1 : 0;
}

function useScale(parentRef: React.RefObject<HTMLDivElement | null>) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        const update = () => {
            const rect = parent.getBoundingClientRect();
            setScale(
                Math.min(rect.width / CANVAS_WIDTH, rect.height / CANVAS_HEIGHT)
            );
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(parent);
        return () => observer.disconnect();
    }, [parentRef]);

    return scale;
}

const DASH_V =
    "linear-gradient(to bottom, var(--slide-border) 50%, transparent 50%)";
const DASH_H =
    "linear-gradient(to right, var(--slide-border) 50%, transparent 50%)";
const EDGE_INSET = 16;

function SlideBackground() {
    return (
        <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
        >
            <DotGrid id="dots-slide-bg" />
            <div
                className="absolute bg-(--slide-bg)"
                style={{
                    inset: EDGE_INSET,
                }}
            />
            {[EDGE_INSET, CANVAS_WIDTH - EDGE_INSET].map((x) => (
                <div
                    key={`v-${x}`}
                    className="absolute top-0 h-full w-px"
                    style={{
                        left: x,
                        backgroundImage: DASH_V,
                        backgroundSize: "1px 24px",
                        backgroundRepeat: "repeat-y",
                    }}
                />
            ))}
            {[EDGE_INSET, CANVAS_HEIGHT - EDGE_INSET].map((y) => (
                <div
                    key={`h-${y}`}
                    className="absolute left-0 h-px w-full"
                    style={{
                        top: y,
                        backgroundImage: DASH_H,
                        backgroundSize: "24px 1px",
                        backgroundRepeat: "repeat-x",
                    }}
                />
            ))}
        </div>
    );
}

export default function SlideDeck({ slides, theme, exitHref }: SlideDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(() =>
        getInitialSlide(slides.length)
    );
    const scale = useScale(containerRef);

    const goTo = useCallback(
        (index: number) => {
            if (index >= 0 && index < slides.length) {
                setCurrentSlide(index);
                window.history.replaceState(null, "", `#${index + 1}`);
            }
        },
        [slides.length]
    );

    const next = useCallback(
        () => goTo(currentSlide + 1),
        [currentSlide, goTo]
    );
    const prev = useCallback(
        () => goTo(currentSlide - 1),
        [currentSlide, goTo]
    );

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault();
                    next();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    prev();
                    break;
                case "f":
                    if (
                        e.target instanceof HTMLInputElement ||
                        e.target instanceof HTMLTextAreaElement
                    )
                        break;
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case "Escape":
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else if (exitHref) {
                        window.location.href = exitHref;
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev, toggleFullscreen, exitHref]);

    useEffect(() => {
        const handleHashChange = () => {
            const num = parseInt(window.location.hash.replace("#", ""), 10);
            if (num >= 1 && num <= slides.length) {
                setCurrentSlide(num - 1);
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [slides.length]);

    const CurrentSlide = slides[currentSlide];

    return (
        <div
            ref={containerRef}
            style={theme as React.CSSProperties}
            className="relative flex h-full w-full items-center justify-center overflow-hidden bg-(--slide-bg)"
        >
            <div
                style={{
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    flexShrink: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                }}
                className="relative text-(--slide-fg)"
            >
                <SlideBackground />
                <CurrentSlide />
            </div>
            <SlideControls
                currentSlide={currentSlide}
                totalSlides={slides.length}
                onNext={next}
                onPrev={prev}
                onToggleFullscreen={toggleFullscreen}
                exitHref={exitHref}
            />
        </div>
    );
}
