import Slide from "../../../components/slides/Slide";

export default function RuntimeStatementSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-8">
                <p className="font-lufga text-center text-5xl leading-tight font-light text-(--slide-fg)">
                    Agents need the same tools developers need.
                </p>
                <p className="font-lufga max-w-2xl text-center text-3xl font-light text-(--slide-accent-light)">
                    But the less your sandbox does, the more your agent has to.
                </p>
            </div>
        </Slide>
    );
}
