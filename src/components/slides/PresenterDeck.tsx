import { useState, useEffect, useCallback, useRef } from "react";
import { StepContext } from "./useStep";
import {
    SlideActionsContext,
    useSlideActionsProvider,
} from "./useSlideActions";
import type { SlideComponent, TalkTheme } from "./types";

interface PresenterDeckProps {
    slides: SlideComponent[];
    theme: TalkTheme;
    talkSlug: string;
}

function stepsFor(slide: SlideComponent): number {
    return slide.steps ?? 1;
}

function useContainerScale(
    containerRef: React.RefObject<HTMLDivElement | null>
) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateScale = () => {
            const rect = container.getBoundingClientRect();
            setScale(Math.min(rect.width / 1280, rect.height / 720));
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(container);
        return () => observer.disconnect();
    }, [containerRef]);

    return scale;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function SlidePreview({
    Slide,
    step,
    theme,
    label,
    width,
    height,
    opacity = 1,
}: {
    Slide: SlideComponent | null;
    step: number;
    theme: TalkTheme;
    label: string;
    width: number;
    height: number;
    opacity?: number;
}) {
    const slideActions = useSlideActionsProvider();

    if (!Slide) {
        return (
            <div className="flex flex-col gap-2">
                <span className="text-xs tracking-wide text-neutral-500 uppercase">
                    {label}
                </span>
                <div
                    className="flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900"
                    style={{ width, height }}
                >
                    <span className="text-neutral-600">
                        End of presentation
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2" style={{ opacity }}>
            <span className="text-xs tracking-wide text-neutral-500 uppercase">
                {label}
            </span>
            <div
                className="overflow-hidden rounded-lg border border-neutral-700"
                style={{ width, height }}
            >
                <div
                    style={{
                        ...(theme as React.CSSProperties),
                        width: 1280,
                        height: 720,
                        transform: `scale(${width / 1280})`,
                        transformOrigin: "top left",
                    }}
                    className="relative bg-(--slide-bg) text-lg text-(--slide-fg)"
                >
                    <SlideActionsContext.Provider value={slideActions}>
                        <StepContext.Provider value={step}>
                            <Slide />
                        </StepContext.Provider>
                    </SlideActionsContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default function PresenterDeck({
    slides,
    theme,
    talkSlug,
}: PresenterDeckProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const channelRef = useRef<BroadcastChannel | null>(null);
    const currentSlideContainerRef = useRef<HTMLDivElement>(null);
    const currentSlideScale = useContainerScale(currentSlideContainerRef);

    useEffect(() => {
        const channel = new BroadcastChannel(`talk-sync:${talkSlug}`);
        channelRef.current = channel;

        channel.onmessage = (event) => {
            const { type, slide, step } = event.data;
            if (type === "navigate") {
                setCurrentSlide(slide);
                setCurrentStep(step);
            }
        };

        channel.postMessage({ type: "presenter-ready" });

        return () => channel.close();
    }, [talkSlug]);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            setElapsed((e) => e + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    const broadcast = useCallback((slide: number, step: number) => {
        channelRef.current?.postMessage({ type: "navigate", slide, step });
    }, []);

    const goTo = useCallback(
        (index: number, step = 0) => {
            if (index >= 0 && index < slides.length) {
                setCurrentSlide(index);
                setCurrentStep(step);
                broadcast(index, step);
            }
        },
        [slides.length, broadcast]
    );

    const next = useCallback(() => {
        if (!isRunning) setIsRunning(true);
        const totalSteps = stepsFor(slides[currentSlide]);
        if (currentStep < totalSteps - 1) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            broadcast(currentSlide, newStep);
        } else if (currentSlide < slides.length - 1) {
            goTo(currentSlide + 1, 0);
        }
    }, [currentSlide, currentStep, slides, goTo, broadcast, isRunning]);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                case "ArrowDown":
                case " ":
                    e.preventDefault();
                    next();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    prev();
                    break;
                case "r":
                    if (e.metaKey || e.ctrlKey) break;
                    e.preventDefault();
                    setElapsed(0);
                    setIsRunning(false);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev]);

    const CurrentSlide = slides[currentSlide];
    const NextSlide = slides[currentSlide + 1] ?? null;
    const notes = CurrentSlide.notes ?? "No speaker notes for this slide.";
    const totalSteps = stepsFor(CurrentSlide);

    return (
        <div className="grid h-screen w-screen grid-cols-[1fr_360px] grid-rows-[1fr_auto] gap-4 overflow-hidden bg-neutral-950 p-4 text-white">
            <div className="flex flex-col gap-2 overflow-hidden">
                <span className="shrink-0 text-xs tracking-wide text-neutral-500 uppercase">
                    Slide {currentSlide + 1}/{slides.length}
                    {totalSteps > 1 &&
                        ` · Step ${currentStep + 1}/${totalSteps}`}
                </span>
                <div
                    ref={currentSlideContainerRef}
                    className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-neutral-700"
                    style={theme as React.CSSProperties}
                >
                    <div
                        className="absolute top-1/2 left-1/2 bg-(--slide-bg) text-lg text-(--slide-fg)"
                        style={{
                            width: 1280,
                            height: 720,
                            transform: `translate(-50%, -50%) scale(${currentSlideScale})`,
                        }}
                    >
                        <SlideActionsContext.Provider
                            value={useSlideActionsProvider()}
                        >
                            <StepContext.Provider value={currentStep}>
                                <CurrentSlide />
                            </StepContext.Provider>
                        </SlideActionsContext.Provider>
                    </div>
                </div>
            </div>

            {/* Right column: notes + next */}
            <div className="flex flex-col gap-4 overflow-hidden">
                <div className="flex min-h-0 flex-1 flex-col gap-2">
                    <span className="shrink-0 text-xs tracking-wide text-neutral-500 uppercase">
                        Notes
                    </span>
                    <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4">
                        <p className="text-base leading-relaxed break-words whitespace-pre-wrap text-neutral-200">
                            {notes}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <SlidePreview
                        Slide={NextSlide}
                        step={0}
                        theme={theme}
                        label="Next"
                        width={200}
                        height={112}
                        opacity={0.7}
                    />
                </div>
            </div>

            {/* Bottom bar spans both columns */}
            <div className="col-span-2 flex items-center justify-between border-t border-neutral-800 pt-3">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-3xl text-neutral-300 tabular-nums">
                        {formatTime(elapsed)}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setElapsed(0);
                            setIsRunning(false);
                        }}
                        className="rounded px-2 py-1 text-sm text-neutral-500 hover:text-neutral-300"
                    >
                        Reset (R)
                    </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <span>← → navigate</span>
                    <span className="text-neutral-700">|</span>
                    <span>Space advance</span>
                </div>
            </div>
        </div>
    );
}
