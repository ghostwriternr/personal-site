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
LayerDiagramSlide.notes = `Every one of those layers is a design decision with real tradeoffs.

[1] A fresh Linux environment — its own VM, own kernel, own network stack.
[2] A container inside it — Ubuntu 22.04, Python 3.11, Node.js 20, Git.
[3] Bash sessions and filesystem — working directory, env vars, installed packages.
[4] Port routing — npm start runs on port 5173 inside the container.
[5] Persistence — files, packages, state — still there tomorrow.`;

export default LayerDiagramSlide;
