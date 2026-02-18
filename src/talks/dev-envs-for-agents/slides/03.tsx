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

ThesisSlide.notes = `Every agent needs a computer. And designing that computer is a design problem with real tradeoffs.

I'm Naresh. In my past life, I worked on coding agents that twice topped SWE-bench. Now I build the sandboxed environments they run in.`;

export default ThesisSlide;
