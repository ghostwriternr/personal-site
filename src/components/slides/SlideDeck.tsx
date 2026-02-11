import { useState, useEffect, useCallback, useRef } from "react";
import SlideControls from "./SlideControls";
import type { SlideComponent } from "./types";

interface SlideDeckProps {
    slides: SlideComponent[];
    exitHref?: string;
}

function getInitialSlide(total: number): number {
    if (typeof window === "undefined") return 0;
    const hash = window.location.hash;
    const num = parseInt(hash.replace("#", ""), 10);
    return num >= 1 && num <= total ? num - 1 : 0;
}

export default function SlideDeck({ slides, exitHref }: SlideDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(() =>
        getInitialSlide(slides.length)
    );

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
            className="relative h-full w-full bg-[var(--color-background)]"
        >
            <div className="h-full w-full">
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
