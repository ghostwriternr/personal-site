import { useState, useEffect } from "react";
import SlideDeck from "./SlideDeck";
import type { SlideComponent, TalkMeta } from "./types";

const talkModules = import.meta.glob<{
    meta: TalkMeta;
    slides: SlideComponent[];
}>("../../talks/*/index.tsx");

interface TalkLoaderProps {
    slug: string;
}

export default function TalkLoader({ slug }: TalkLoaderProps) {
    const [slides, setSlides] = useState<SlideComponent[] | null>(null);

    useEffect(() => {
        const loader = talkModules[`../../talks/${slug}/index.tsx`];
        if (loader) {
            loader().then((mod) => setSlides(mod.slides));
        }
    }, [slug]);

    if (!slides) return null;

    const isPresenting =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("present");
    const exitHref = isPresenting ? `/talks/${slug}/` : undefined;

    return <SlideDeck slides={slides} exitHref={exitHref} />;
}
