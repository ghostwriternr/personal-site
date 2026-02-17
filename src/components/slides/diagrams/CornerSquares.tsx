// Determines which corners to show for a grid cell to avoid doubling at shared borders
export function getItemCornerSquares(index: number, columnsPerRow: number) {
    const row = Math.floor(index / columnsPerRow);
    const isFirstRow = row === 0;
    const isFirstColumn = index % columnsPerRow === 0;

    const corners: {
        topLeft?: boolean;
        topRight?: boolean;
        bottomLeft?: boolean;
        bottomRight?: boolean;
    } = {};

    if (isFirstRow && isFirstColumn) {
        // First item: show all corners
    } else if (isFirstRow) {
        corners.topLeft = false;
        corners.bottomLeft = false;
    } else if (isFirstColumn) {
        corners.topLeft = false;
        corners.topRight = false;
    } else {
        corners.topLeft = false;
        corners.topRight = false;
        corners.bottomLeft = false;
    }

    return corners;
}

interface CornerSquaresProps {
    size?: "sm" | "md";
    color?: string;
    corners?: {
        topLeft?: boolean;
        topRight?: boolean;
        bottomLeft?: boolean;
        bottomRight?: boolean;
    };
}

export function CornerSquares({
    size = "md",
    color = "#f0e3de20",
    corners,
}: CornerSquaresProps) {
    const cornerSize = size === "sm" ? 8 : 14;
    const borderRadius = size === "sm" ? "1.5px" : "3px";
    const offset = -cornerSize / 2;

    const allCorners = [
        { key: "top-left", top: offset, left: offset, show: corners?.topLeft !== false },
        { key: "top-right", top: offset, right: offset, show: corners?.topRight !== false },
        { key: "bottom-left", bottom: offset, left: offset, show: corners?.bottomLeft !== false },
        { key: "bottom-right", bottom: offset, right: offset, show: corners?.bottomRight !== false },
    ] as const;

    return (
        <div
            className="pointer-events-none absolute inset-0 z-10 select-none"
            aria-hidden="true"
        >
            {allCorners.filter(c => c.show).map((position) => (
                <div
                    key={position.key}
                    className="absolute"
                    style={{
                        top: "top" in position ? position.top : undefined,
                        left: "left" in position ? position.left : undefined,
                        right: "right" in position ? position.right : undefined,
                        bottom:
                            "bottom" in position ? position.bottom : undefined,
                        width: cornerSize,
                        height: cornerSize,
                        backgroundColor: "#121212",
                        border: `1px solid ${color}`,
                        borderRadius,
                    }}
                />
            ))}
        </div>
    );
}
