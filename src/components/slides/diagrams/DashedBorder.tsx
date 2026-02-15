import { useLayoutEffect, useRef, useState } from "react";

interface DashedBorderProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    borderColor?: string;
    strokeWidth?: number;
    dashLength?: number;
    gapLength?: number;
    borderRadius?: number;
    animated?: boolean;
}

export function DashedBorder({
    children,
    className,
    style,
    borderColor = "var(--slide-border)",
    strokeWidth = 1,
    dashLength = 8,
    gapLength = 8,
    borderRadius = 8,
    animated = false,
}: DashedBorderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        }
    }, []);

    const totalDashLength = dashLength + gapLength;
    const effectiveSize = isClient ? size : { width: 200, height: 200 };

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ position: "relative", borderRadius, ...style }}
        >
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                width="100%"
                height="100%"
                viewBox={`0 0 ${effectiveSize.width} ${effectiveSize.height}`}
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{ zIndex: 1 }}
            >
                <rect
                    x={strokeWidth / 2}
                    y={strokeWidth / 2}
                    width={effectiveSize.width - strokeWidth}
                    height={effectiveSize.height - strokeWidth}
                    rx={borderRadius}
                    ry={borderRadius}
                    stroke={borderColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${dashLength},${gapLength}`}
                    strokeLinecap="round"
                    fill="none"
                >
                    {animated && (
                        <animate
                            attributeName="stroke-dashoffset"
                            values={`0;-${totalDashLength}`}
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    )}
                </rect>
            </svg>
            <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
        </div>
    );
}
