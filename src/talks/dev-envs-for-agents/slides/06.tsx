import Slide from "../../../components/slides/Slide";

export default function ComputerCallbackSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-8">
                <p className="font-lufga text-center text-5xl leading-tight font-light text-(--slide-fg)">
                    That preview URL is a computer.
                </p>
                <p className="font-lufga max-w-2xl text-center text-xl font-light text-(--slide-fg-muted)">
                    Every one of those layers is a design decision with real
                    tradeoffs.
                </p>
            </div>
        </Slide>
    );
}
