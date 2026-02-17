import type { CSSProperties } from "react";

const PALETTE: Record<number, string> = {
    1: "#ebddc0", // cream (body)
    2: "#f0e3de20", // faded cream (eye)
    3: "#edb75d", // gold (beak highlight)
    4: "#db8a1e", // orange (beak, feet)
    5: "#bdb29e", // taupe (shading)
};

type C = 0 | 1 | 2 | 3 | 4 | 5;

const WIDTH = 18;
const HEIGHT = 19;

// prettier-ignore
const GRID: C[][] = [
    [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,1,1,2,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,3,3,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,4,4,4,4,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,5,5,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,5,5,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,5,1,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [5,5,5,5,5,1,1,1,1,1,1,5,5,5,5,5,5,5],
    [5,1,1,1,5,1,1,1,1,1,5,1,1,1,1,1,1,1],
    [5,5,1,1,5,1,1,1,1,1,5,1,1,1,1,1,5,0],
    [0,5,5,5,5,1,1,1,1,1,1,5,1,1,1,5,5,0],
    [0,0,0,0,5,5,1,1,1,1,1,1,5,5,5,5,0,0],
    [0,0,0,0,0,5,5,5,5,1,1,1,1,1,5,0,0,0],
    [0,0,0,0,0,0,0,5,5,5,5,1,1,5,0,0,0,0],
    [0,0,0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,4,4,4,0,4,4,4,0,0,0,0,0],
];

interface PixelGooseProps {
    size?: number;
    direction?: "left" | "right";
    className?: string;
    style?: CSSProperties;
}

export function PixelGoose({
    size = 160,
    direction = "left",
    className = "",
    style,
}: PixelGooseProps) {
    const width = size * (WIDTH / HEIGHT);
    const rects: React.JSX.Element[] = [];

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const colorIdx = GRID[y][x];
            if (colorIdx === 0) continue;
            rects.push(
                <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width={1}
                    height={1}
                    fill={PALETTE[colorIdx]}
                />
            );
        }
    }

    return (
        <svg
            className={className}
            width={width}
            height={size}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
            role="img"
            aria-label="Pixel art goose"
            style={{
                ...style,
                transform: direction === "right" ? "scaleX(-1)" : undefined,
            }}
        >
            {rects}
        </svg>
    );
}
