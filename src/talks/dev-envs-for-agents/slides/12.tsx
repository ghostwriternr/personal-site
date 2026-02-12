import Slide from "../../../components/slides/Slide";

export default function ThresholdSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-6">
                <span className="font-mono text-8xl font-bold text-(--slide-accent-light)">
                    200ms
                </span>
                <p className="font-lufga max-w-xl text-center text-xl font-light text-(--slide-fg-muted)">
                    Below that, it's magic. Above that, it's waiting.
                </p>
            </div>
        </Slide>
    );
}
