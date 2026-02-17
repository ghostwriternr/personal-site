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
ColdStartMathSlide.notes = `Same workload. Four approaches. Treat the numbers as illustrative — the order-of-magnitude differences are the point. From scratch: 32 seconds. Most of that is application readiness — install, build, start. Not infrastructure boot.

[1] Pre-built image: 2 seconds. Dependencies baked in.

[2] Snapshot restore: 200ms. Restore frozen state instead of booting.

[3] Warm pool: effectively zero. Already running before the request arrived.

The infra boot is a sliver. The application readiness gap is the whole story.`;

export default ColdStartMathSlide;
