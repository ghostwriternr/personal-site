import Slide from "../../../components/slides/Slide";
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
            <div className="flex w-full max-w-3xl flex-col gap-3">
                {layers.map((layer, i) => (
                    <div
                        key={layer.name}
                        className="flex items-baseline gap-4 border-l-2 py-3 pl-5 transition-all duration-300"
                        style={{
                            borderColor:
                                i <= step
                                    ? "var(--slide-accent-light)"
                                    : "transparent",
                            opacity: i <= step ? 1 : 0,
                            transform:
                                i <= step
                                    ? "translateX(0)"
                                    : "translateX(-12px)",
                        }}
                    >
                        <span className="font-lufga shrink-0 text-2xl font-light text-(--slide-fg)">
                            {layer.name}
                        </span>
                        <span className="text-base text-(--slide-fg-muted)">
                            {layer.detail}
                        </span>
                    </div>
                ))}
            </div>
        </Slide>
    );
}

LayerDiagramSlide.steps = 5;

export default LayerDiagramSlide;
