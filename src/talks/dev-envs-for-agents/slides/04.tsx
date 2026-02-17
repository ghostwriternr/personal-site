import Slide from "../../../components/slides/Slide";
import { StepCircle } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

const layers = [
    {
        name: "A MicroVM",
        detail: "Its own kernel, own network stack, full isolation",
    },
    {
        name: "A container inside it",
        detail: "Ubuntu 22.04, Python 3.11, Node.js 20, Git",
    },
    {
        name: "Bash sessions & filesystem",
        detail: "A shell into the container — where the agent actually works",
    },
    {
        name: "Networking",
        detail: "npm start runs on port 5173 inside the container",
    },
    {
        name: "Persistence",
        detail: "Files, packages, state — all survive between sessions",
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
                                            borderColor: active
                                                ? "var(--slide-border)"
                                                : "transparent",
                                            opacity: active ? 1 : 0,
                                        }}
                                    />
                                )}
                            </div>
                            <div
                                className="flex flex-col gap-1 pt-[6px] pb-6 transition-all duration-300"
                                style={{
                                    opacity: active ? 1 : 0,
                                    transform: active
                                        ? "translateY(0)"
                                        : "translateY(8px)",
                                }}
                            >
                                <span className="font-lufga text-xl font-medium text-(--slide-fg)">
                                    {layer.name}
                                </span>
                                <span className="max-w-lg text-(--slide-fg-muted)">
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
LayerDiagramSlide.notes = `Start with the isolation boundary — a microVM. Its own kernel, own network stack. No shared kernel attack surface with anything else running on the same machine.

[1] Inside it, a container. Ubuntu 22.04, Python 3.11, Node.js 20, Git. The environment the agent actually works in.

[2] Bash sessions and a filesystem. The agent runs commands, reads and writes files, installs packages.

[3] Networking. The agent runs npm start on port 5173 inside that container. Getting traffic there from the public internet is not obvious.

[4] And persistence. Files, installed packages, working directory — still there when the agent picks up the next day. Five layers. Each one is a decision.`;

export default LayerDiagramSlide;
