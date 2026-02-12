interface DotGridProps {
    id: string;
    size?: number;
    radius?: number;
    className?: string;
}

export default function DotGrid({
    id,
    size = 12,
    radius = 0.75,
    className = "",
}: DotGridProps) {
    return (
        <svg
            className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
            aria-hidden="true"
        >
            <pattern
                id={id}
                x="0"
                y="0"
                width={size}
                height={size}
                patternUnits="userSpaceOnUse"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="var(--slide-border)"
                />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
}
