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

ClosingCallbackSlide.notes = `Remember the opening? One command, one link, no localhost.

Now you know what's behind it — four decisions, each with real tradeoffs. Runtime, isolation, networking, persistence.

Whether you build this yourself or use a platform, these are the decisions you'll make.`;

export default ClosingCallbackSlide;
