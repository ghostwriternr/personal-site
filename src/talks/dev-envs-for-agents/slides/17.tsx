import Slide from "../../../components/slides/Slide";
import { Blockquote } from "../../../components/slides/diagrams";
import { ManusLogo } from "../../../components/slides/logos";

function ColdStartHookSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <Blockquote
                    quote="Manus doesn't just run some pieces of code. It uses 27 different tools, and it needs a full virtual computer."
                    person={{
                        name: "Tao Zhang",
                        title: "Co-founder, Manus",
                    }}
                    source="From a published E2B case study"
                    icon={
                        <ManusLogo className="size-24 text-(--slide-fg-muted)" />
                    }
                />
            </div>
        </Slide>
    );
}

ColdStartHookSlide.notes = `Manus — one of the most capable general-purpose agents out there. 27 tools, needs a full virtual computer.

They tried Docker first. 10-20 seconds to spawn each environment. They abandoned it.

Cold start isn't a nice-to-have — it's a deal-breaker. And persistence is how you solve it.`;

export default ColdStartHookSlide;
