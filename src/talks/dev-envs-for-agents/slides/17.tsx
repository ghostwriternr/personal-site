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
                            <span className="font-lufga text-lg font-medium">{a.label}</span>
                            <span className="font-mono text-(--slide-fg-muted)">{a.time}</span>
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

export default ColdStartMathSlide;
