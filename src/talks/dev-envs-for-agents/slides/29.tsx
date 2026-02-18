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

ClosingCallbackSlide.notes = `One command, one link, no localhost. That's where we started.

Behind it: four decisions, each with real tradeoffs. Runtime — what the agent gets. Isolation — what wraps it. Networking — how traffic finds it. Persistence — what survives.

These decisions exist whether you build or buy. Knowing the tradeoffs is the job. Thanks.`;

export default ClosingCallbackSlide;
