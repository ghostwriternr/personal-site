interface CornerSquaresProps {
    size?: "sm" | "md";
    color?: string;
}

export function CornerSquares({
    size = "md",
    color = "#f0e3de20",
}: CornerSquaresProps) {
    const cornerSize = size === "sm" ? 8 : 14;
    const borderRadius = size === "sm" ? "1.5px" : "3px";
    const offset = -cornerSize / 2;

    const corners = [
        { key: "top-left", top: offset, left: offset },
        { key: "top-right", top: offset, right: offset },
        { key: "bottom-left", bottom: offset, left: offset },
        { key: "bottom-right", bottom: offset, right: offset },
    ] as const;

    return (
        <div
            className="pointer-events-none absolute inset-0 z-10 select-none"
            aria-hidden="true"
        >
            {corners.map((position) => (
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
