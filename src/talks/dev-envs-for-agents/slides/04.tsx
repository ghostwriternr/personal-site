import Slide from "../../../components/slides/Slide";

export default function ThesisSlide() {
    return (
        <Slide>
            <p className="font-lufga max-w-4xl text-center text-5xl leading-tight font-light text-(--slide-fg)">
                Every agent needs a computer.
                <br />
                And designing that computer
                <br />
                is a{" "}
                <span className="text-(--slide-accent-light)">
                    design problem
                </span>
                .
            </p>
        </Slide>
    );
}
