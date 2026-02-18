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
                    quote="I shipped 22 PRs yesterday and 27 the day before, each one 100% written by Claude. I haven't written any code by hand in over two months."
                    person={{
                        name: "Boris Cherny",
                        title: "Creator of Claude Code, Anthropic",
                    }}
                    source="Jan 2026"
                    icon={
                        <ClaudeLogo className="size-16 text-(--slide-fg-muted)" />
                    }
                />
            </div>
        </Slide>
    );
}

ScaleSlide.notes = `Cursor's cofounder: almost a billion lines of accepted code per day. The entire world produces a few billion lines a day total.

Boris Cherny — the person who built Claude Code — ships 20+ PRs a day, hasn't written a line of code by hand in months. 90% of Claude Code's own codebase was written by Claude Code.

Every one of those lines runs somewhere. That's the demand side of the sandbox problem.`;

export default ScaleSlide;
