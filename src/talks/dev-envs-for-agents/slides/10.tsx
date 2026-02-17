import Slide from "../../../components/slides/Slide";
import { Blockquote } from "../../../components/slides/diagrams";
import { DeepMindLogo } from "../../../components/slides/logos";

export default function IsolationHookSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <Blockquote
                    quote="The great paradox of agents is that the very thing that makes them useful — that they're able to accomplish a range of tasks — involves giving away control."
                    person={{
                        name: "Iason Gabriel",
                        title: "Senior Staff Research Scientist, Google DeepMind",
                    }}
                    source="MIT Technology Review, June 2025"
                    icon={
                        <DeepMindLogo className="size-24 text-(--slide-fg-muted)" />
                    }
                />
            </div>
        </Slide>
    );
}
