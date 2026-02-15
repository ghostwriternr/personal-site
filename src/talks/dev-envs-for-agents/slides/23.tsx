import Slide from "../../../components/slides/Slide";

export default function BillionSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-6">
                <span className="font-mono text-8xl font-bold text-(--slide-accent-light)">
                    1 billion
                </span>
                <p className="font-lufga text-xl font-light text-(--slide-fg-muted)">
                    Lines of code accepted daily (Cursor alone)
                </p>
            </div>
        </Slide>
    );
}
