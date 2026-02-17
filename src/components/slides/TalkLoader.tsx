import { useState, useEffect } from "react";
import SlideDeck from "./SlideDeck";
import PresenterDeck from "./PresenterDeck";
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

    const searchParams =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search)
            : new URLSearchParams();

    const isPresenting = searchParams.has("present");
    const isPresenter = searchParams.has("presenter");

    if (isPresenter) {
        return (
            <PresenterDeck
                slides={talk.slides}
                theme={talk.theme}
                talkSlug={slug}
            />
        );
    }

    const exitHref = isPresenting ? `/talks/${slug}/` : undefined;

    return (
        <SlideDeck
            slides={talk.slides}
            theme={talk.theme}
            exitHref={exitHref}
            talkSlug={slug}
        />
    );
}
