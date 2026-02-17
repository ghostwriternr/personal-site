import Slide from "../../../components/slides/Slide";

function RuntimeStatementSlide() {
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

RuntimeStatementSlide.notes = `First question — the most fundamental one: what does the agent actually get to work with?

You could give it a REPL. A restricted container — some tools, some access. Or full Linux — apt-get, pip, git, npm, compilers, dev servers, background processes. A real computer.`;

export default RuntimeStatementSlide;
