import Slide from "../../../components/slides/Slide";

function ClosingCallbackSlide() {
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

ClosingCallbackSlide.notes = `A year ago, sandboxes were a niche concern. Now every major coding agent, every vibe coding platform, every code interpreter runs in one. The infrastructure that used to be optional is becoming the default.

These are the problems worth working on. Thanks.`;

export default ClosingCallbackSlide;
