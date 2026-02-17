import Slide from "../../../components/slides/Slide";
import { useStep } from "../../../components/slides/useStep";

const approaches = [
    { label: "From scratch", time: "~32s", width: "100%" },
    { label: "Pre-built image", time: "~2s", width: "6.25%" },
    { label: "Snapshot restore", time: "~200ms", width: "1.5%" },
    { label: "Warm pool", time: "~0ms", width: "0.5%" },
];

function ColdStartMathSlide() {
    const step = useStep();

    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-8">
                {approaches.map((a, i) => (
                    <div
                        key={a.label}
                        className="flex flex-col gap-2 transition-opacity duration-500"
                        style={{ opacity: i <= step ? 1 : 0 }}
                    >
                        <div className="flex items-baseline justify-between">
                            <span className="font-lufga text-lg font-medium">
                                {a.label}
                            </span>
                            <span className="font-mono text-(--slide-fg-muted)">
                                {a.time}
                            </span>
                        </div>
                        <div
                            className="h-3 rounded-sm bg-(--slide-accent-light)"
                            style={{ width: a.width, minWidth: 4 }}
                        />
                    </div>
                ))}
            </div>
        </Slide>
    );
}

ColdStartMathSlide.steps = 4;
ColdStartMathSlide.notes = `Same workload, four approaches.

[1] From scratch: 32 seconds. 125ms boot, 2s image, 30s npm install.

[2] Pre-built image: 2 seconds. Dependencies baked in.

[3] Snapshot restore: 200ms. Frozen state.

[4] Warm pool: effectively zero. Already running.

The infra boot — that 125ms — is a sliver. The application readiness gap is the whole story.`;

export default ColdStartMathSlide;
