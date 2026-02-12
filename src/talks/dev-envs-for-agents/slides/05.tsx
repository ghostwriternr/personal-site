import Slide from "../../../components/slides/Slide";

const decisions = ["Isolation", "Cold Start", "Networking", "Persistence"];

export default function FourDecisionsSlide() {
    return (
        <Slide>
            <div className="flex items-center gap-12">
                {decisions.map((word, i) => (
                    <span
                        key={word}
                        className="font-lufga text-4xl font-light text-(--slide-accent-light)"
                    >
                        {word}
                        {i < decisions.length - 1 && (
                            <span className="ml-12 text-(--slide-fg-muted)">
                                ·
                            </span>
                        )}
                    </span>
                ))}
            </div>
        </Slide>
    );
}
