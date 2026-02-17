import { useState, useEffect, useCallback, useRef } from "react";
import DotGrid from "./DotGrid";
import SlideControls from "./SlideControls";
import { StepContext } from "./useStep";
import {
    SlideActionsContext,
    useSlideActionsProvider,
} from "./useSlideActions";
import { useSlideBroadcast } from "./useSlideBroadcast";
import type { SlideComponent, TalkTheme } from "./types";

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

interface SlideDeckProps {
    slides: SlideComponent[];
    theme: TalkTheme;
    exitHref?: string;
    talkSlug?: string;
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

function SlideBackground({ hideEdges }: { hideEdges?: boolean }) {
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
            {!hideEdges &&
                [EDGE_INSET, CANVAS_WIDTH - EDGE_INSET].map((x) => (
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
            {!hideEdges &&
                [EDGE_INSET, CANVAS_HEIGHT - EDGE_INSET].map((y) => (
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

function stepsFor(slide: SlideComponent): number {
    return slide.steps ?? 1;
}

export default function SlideDeck({
    slides,
    theme,
    exitHref,
    talkSlug,
}: SlideDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(() =>
        getInitialSlide(slides.length)
    );
    const [currentStep, setCurrentStep] = useState(0);
    const scale = useScale(containerRef);

    const handleBroadcastNavigate = useCallback(
        (slide: number, step: number) => {
            if (slide >= 0 && slide < slides.length) {
                setCurrentSlide(slide);
                setCurrentStep(step);
                window.history.replaceState(null, "", `#${slide + 1}`);
            }
        },
        [slides.length]
    );

    const { broadcast } = useSlideBroadcast({
        channelName: talkSlug ? `talk-sync:${talkSlug}` : "talk-sync:default",
        onNavigate: handleBroadcastNavigate,
    });

    const goTo = useCallback(
        (index: number, step = 0) => {
            if (index >= 0 && index < slides.length) {
                setCurrentSlide(index);
                setCurrentStep(step);
                window.history.replaceState(null, "", `#${index + 1}`);
                broadcast(index, step);
            }
        },
        [slides.length, broadcast]
    );

    const next = useCallback(() => {
        const totalSteps = stepsFor(slides[currentSlide]);
        if (currentStep < totalSteps - 1) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            broadcast(currentSlide, newStep);
        } else {
            goTo(currentSlide + 1, 0);
        }
    }, [currentSlide, currentStep, slides, goTo, broadcast]);

    const prev = useCallback(() => {
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            broadcast(currentSlide, newStep);
        } else if (currentSlide > 0) {
            const prevSteps = stepsFor(slides[currentSlide - 1]);
            goTo(currentSlide - 1, prevSteps - 1);
        }
    }, [currentSlide, currentStep, slides, goTo, broadcast]);

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
                case "p":
                    if (
                        e.target instanceof HTMLInputElement ||
                        e.target instanceof HTMLTextAreaElement
                    )
                        break;
                    if (talkSlug) {
                        e.preventDefault();
                        window.open(`/talks/${talkSlug}/?presenter`, "_blank");
                    }
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
    }, [next, prev, toggleFullscreen, exitHref, talkSlug]);

    useEffect(() => {
        const handleHashChange = () => {
            const num = parseInt(window.location.hash.replace("#", ""), 10);
            if (num >= 1 && num <= slides.length) {
                setCurrentSlide(num - 1);
                setCurrentStep(0);
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [slides.length]);

    const CurrentSlide = slides[currentSlide];
    const slideActions = useSlideActionsProvider();

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
                className="relative text-lg text-(--slide-fg)"
            >
                <SlideBackground hideEdges={CurrentSlide.edgeToEdge} />
                <SlideActionsContext.Provider value={slideActions}>
                    <StepContext.Provider value={currentStep}>
                        <CurrentSlide />
                    </StepContext.Provider>
                </SlideActionsContext.Provider>
            </div>
            <SlideControls
                currentSlide={currentSlide}
                totalSlides={slides.length}
                onNext={next}
                onPrev={prev}
                onToggleFullscreen={toggleFullscreen}
                exitHref={exitHref}
                slideActions={slideActions.actions}
                presenterHref={
                    talkSlug ? `/talks/${talkSlug}/?presenter` : undefined
                }
            />
        </div>
    );
}
