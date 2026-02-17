import { useEffect, useRef, useCallback } from "react";

interface SlideBroadcastOptions {
    channelName: string;
    onNavigate: (slide: number, step: number) => void;
}

export function useSlideBroadcast({
    channelName,
    onNavigate,
}: SlideBroadcastOptions) {
    const channelRef = useRef<BroadcastChannel | null>(null);
    const onNavigateRef = useRef(onNavigate);
    onNavigateRef.current = onNavigate;

    useEffect(() => {
        const channel = new BroadcastChannel(channelName);
        channelRef.current = channel;

        channel.onmessage = (event) => {
            const { type, slide, step } = event.data;
            if (type === "navigate") {
                onNavigateRef.current(slide, step);
            }
        };

        return () => channel.close();
    }, [channelName]);

    const broadcast = useCallback((slide: number, step: number) => {
        channelRef.current?.postMessage({ type: "navigate", slide, step });
    }, []);

    return { broadcast };
}
