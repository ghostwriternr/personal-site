import Slide from "../../../components/slides/Slide";
import { StepCircle } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

const layers = [
    {
        name: "A fresh Linux environment",
        detail: "Completely isolated — nothing shared with anyone else",
    },
    {
        name: "A container inside it",
        detail: "Real Linux, not a REPL. apt-get, pip, git, npm — everything works",
    },
    {
        name: "Bash sessions & filesystem",
        detail: "A real working directory, real environment variables",
    },
    {
        name: "Port routing",
        detail: "No localhost — routed from the internet to a specific port in a specific environment",
    },
    {
        name: "Persistence",
        detail: "The agent expects to pick up where it left off. That doesn't happen by accident",
    },
];

function LayerDiagramSlide() {
    const step = useStep();

    return (
        <Slide>
            <div className="flex flex-col">
                {layers.map((layer, i) => {
                    const active = i <= step;
                    return (
                        <div key={layer.name} className="flex gap-8">
                            <div className="flex flex-col items-center">
                                <StepCircle active={active} />
                                {i < layers.length - 1 && (
                                    <div
                                        className="w-px flex-1 transition-opacity duration-300"
                                        style={{
                                            borderRight: "1px dashed",
                                            borderColor: active ? "var(--slide-border)" : "transparent",
                                            opacity: active ? 1 : 0,
                                        }}
                                    />
                                )}
                            </div>
                            <div
                                className="flex flex-col gap-1 pb-6 pt-2 transition-all duration-300"
                                style={{
                                    opacity: active ? 1 : 0,
                                    transform: active ? "translateY(0)" : "translateY(8px)",
                                }}
                            >
                                <span className="font-lufga text-xl font-medium text-(--slide-fg)">
                                    {layer.name}
                                </span>
                                <span className="max-w-lg text-base text-(--slide-fg-muted)">
                                    {layer.detail}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Slide>
    );
}

LayerDiagramSlide.steps = 5;

export default LayerDiagramSlide;
