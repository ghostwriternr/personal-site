import Slide from "../../../components/slides/Slide";

export default function ClosingCallbackSlide() {
    return (
        <Slide>
            <p className="font-lufga max-w-4xl text-center text-5xl leading-tight font-light text-(--slide-fg)">
                Every agent needs a computer.
                <br />
                And with agents being everywhere,
                <br />
                every application will be using{" "}
                <span className="text-(--slide-accent-light)">sandboxes</span>.
            </p>
        </Slide>
    );
}
