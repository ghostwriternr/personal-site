import { useState, useEffect } from "react";
import SlideDeck from "./SlideDeck";
import type { TalkModule } from "./types";

const talkModules = import.meta.glob<TalkModule>("../../talks/*/index.tsx");

interface TalkLoaderProps {
    slug: string;
}

export default function TalkLoader({ slug }: TalkLoaderProps) {
    const [talk, setTalk] = useState<TalkModule | null>(null);

    useEffect(() => {
        const loader = talkModules[`../../talks/${slug}/index.tsx`];
        if (loader) {
            loader().then(setTalk);
        }
    }, [slug]);

    if (!talk) return null;

    const isPresenting =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("present");
    const exitHref = isPresenting ? `/talks/${slug}/` : undefined;

    return (
        <SlideDeck
            slides={talk.slides}
            theme={talk.theme}
            exitHref={exitHref}
        />
    );
}
