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
ColdStartMathSlide.notes = `Same workload, same sandbox. The numbers are illustrative — it's the order-of-magnitude jumps that matter. From scratch, 32 seconds. The VM booted in 125ms. The rest was npm install, git clone, server start.

[1] Pre-built image cuts it to 2 seconds. You skipped the install step entirely — it was baked into the image at build time. That one change is a 16x improvement.

[2] Snapshot restore: 200ms. You're not booting at all — you're restoring frozen disk and memory state. The server is already running when the sandbox wakes up.

[3] Warm pool: effectively zero. The sandbox was created before anyone asked for it. The request just claims one from the pool.

Look at the bars. The infrastructure boot — the VM, the kernel — is a sliver in every case. The application readiness gap is the entire problem, and it's the part you have control over.`;

export default ColdStartMathSlide;
