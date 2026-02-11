import Slide from "../../../components/slides/Slide";

export default function TitleSlide() {
    return (
        <Slide>
            <div className="text-center">
                <h1 className="font-but-head text-6xl text-(--slide-fg)">
                    Sample Talk
                </h1>
                <p className="mt-4 text-xl text-(--slide-fg-muted)">
                    A test of the slide engine
                </p>
            </div>
        </Slide>
    );
}
