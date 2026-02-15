import { DashedBorder } from "./DashedBorder";

interface StepCircleProps {
    active?: boolean;
    accentColor?: string;
}

export function StepCircle({
    active = false,
    accentColor = "var(--slide-accent)",
}: StepCircleProps) {
    const borderColor = active ? accentColor : "var(--slide-border)";

    return (
        <DashedBorder
            borderRadius={9999}
            borderColor={borderColor}
            animated={active}
            dashLength={4}
            gapLength={4}
            className="flex shrink-0 items-center justify-center overflow-hidden transition-transform duration-300"
            style={{
                width: 40,
                height: 40,
                transform: active ? "scale(1.1)" : "scale(1)",
            }}
        >
            <div
                className="h-2 w-2 rounded-full transition-all duration-300"
                style={{
                    backgroundColor: borderColor,
                    transform: active ? "scale(0.75)" : "scale(1)",
                }}
            />
        </DashedBorder>
    );
}
