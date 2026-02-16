import type { ReactNode } from "react";
import { CornerSquares, getItemCornerSquares } from "./CornerSquares";

interface CardGridProps {
    columns: number;
    rows?: number;
    activeCount?: number;
    className?: string;
    children: ReactNode[];
}

export function CardGrid({ columns, rows, activeCount, className, children }: CardGridProps) {
    const gridRows = rows ?? Math.ceil(children.length / columns);

    return (
        <div
            className={`relative ${className ?? ""}`}
            style={{ border: "1px solid var(--slide-border)" }}
        >
            <div
                className="grid h-full"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: rows
                        ? `repeat(${gridRows}, 1fr)`
                        : undefined,
                }}
            >
                {children.map((child, i) => {
                    const col = i % columns;
                    const row = Math.floor(i / columns);
                    const isRightEdge = col === columns - 1;
                    const isBottomEdge = row === gridRows - 1;
                    const active = activeCount === undefined || i < activeCount;

                    return (
                        <div
                            key={`cell-${col}-${row}`}
                            className="relative transition-opacity duration-500"
                            style={{
                                borderRight: !isRightEdge
                                    ? "1px solid var(--slide-border)"
                                    : undefined,
                                borderBottom: !isBottomEdge
                                    ? "1px solid var(--slide-border)"
                                    : undefined,
                                opacity: active ? 1 : 0,
                            }}
                        >
                            <CornerSquares corners={getItemCornerSquares(i, columns)} />
                            {child}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
