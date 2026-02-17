import Slide from "../../../components/slides/Slide";

function ThesisSlide() {
    return (
        <Slide>
            <p className="font-lufga max-w-4xl text-center text-5xl leading-tight font-light text-(--slide-fg)">
                Every agent needs a computer.
                <br />
                And shaping that computer
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

ThesisSlide.notes = `Every agent needs a computer. And designing that computer — making it fast, isolated, networked, persistent — is a design problem with real tradeoffs.

I'm Naresh. I've been on both sides of this — I built coding agents, now I build the infrastructure they run on at Cloudflare.`;

export default ThesisSlide;
