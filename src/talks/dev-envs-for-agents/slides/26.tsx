import Slide from "../../../components/slides/Slide";
import { Blockquote } from "../../../components/slides/diagrams";
import { CursorLogo, ClaudeLogo } from "../../../components/slides/logos";

export default function ScaleSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <Blockquote
                    compact
                    quote="Cursor writes almost 1 billion lines of accepted code a day. The entire world produces just a few billion lines a day."
                    person={{
                        name: "Aman Sanger",
                        title: "Co-founder, Cursor",
                    }}
                    source="Apr 2025"
                    icon={<CursorLogo className="size-16 text-(--slide-fg-muted)" />}
                />
                <div className="h-px w-full max-w-[640px] bg-(--slide-fg)/10" />
                <Blockquote
                    compact
                    quote="4% of all public GitHub commits are authored by Claude Code. At the current trajectory, it'll be 20%+ of all daily commits by end of 2026."
                    person={{
                        name: "SemiAnalysis",
                        title: "Semiconductor research firm",
                    }}
                    source="Feb 2026"
                    icon={<ClaudeLogo className="size-16 text-(--slide-fg-muted)" />}
                />
            </div>
        </Slide>
    );
}
