import Slide from "../../../components/slides/Slide";

export default function TitleSlide() {
    return (
        <Slide>
            <div className="text-center">
                <h1 className="text-display-lg text-[var(--color-primary)]">
                    Sample Talk
                </h1>
                <p className="text-body-xl mt-4 text-[var(--color-subtext)]">
                    A test of the slide engine
                </p>
            </div>
        </Slide>
    );
}
