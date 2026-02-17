import Slide from "../../../components/slides/Slide";

const lines = [
    "Every major AI lab.",
    'Every "vibe coding" tool.',
    "Every agent framework.",
];

export default function IndustryConvergenceSlide() {
    return (
        <Slide>
            <div className="flex flex-col gap-8">
                <p className="font-lufga text-lg text-(--slide-fg-muted)">
                    Who's building this:
                </p>
                <div className="flex flex-col gap-4">
                    {lines.map((line) => (
                        <p
                            key={line}
                            className="font-lufga text-3xl font-light text-(--slide-fg)"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </Slide>
    );
}
