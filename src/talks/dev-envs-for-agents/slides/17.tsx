import Slide from "../../../components/slides/Slide";
import { Blockquote } from "../../../components/slides/diagrams";
import { ManusLogo } from "../../../components/slides/logos";

export default function ColdStartHookSlide() {
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
                    icon={<ManusLogo className="size-24 text-(--slide-fg-muted)" />}
                />
            </div>
        </Slide>
    );
}
