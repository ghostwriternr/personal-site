import Slide from "../../../components/slides/Slide";
import { Blockquote } from "../../../components/slides/diagrams";
import { CursorLogo, ClaudeLogo } from "../../../components/slides/logos";

function ScaleSlide() {
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
                    icon={
                        <CursorLogo className="size-16 text-(--slide-fg-muted)" />
                    }
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
                    icon={
                        <ClaudeLogo className="size-16 text-(--slide-fg-muted)" />
                    }
                />
            </div>
        </Slide>
    );
}

ScaleSlide.notes = `Cursor's cofounder said almost a billion lines of accepted code per day. The entire world produces a few billion lines a day total.

SemiAnalysis estimates 4% of all public GitHub commits are authored by Claude Code. At this trajectory, 20%+ by end of 2026.

Regardless of the exact numbers, the direction is clear. Code generation is now a first-class execution workload. Every generated line runs somewhere.`;

export default ScaleSlide;
