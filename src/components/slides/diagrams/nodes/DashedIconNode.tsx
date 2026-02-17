import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { HANDLE_STYLE } from "../constants";

export interface DashedIconNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    color: string;
    label?: string;
    sourceEdge?: "top" | "bottom" | "left" | "right";
    targetEdge?: "top" | "bottom" | "left" | "right";
}

const positionMap = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
} as const;

export function DashedIconNode({
    data,
}: NodeProps<Node<DashedIconNodeData>>) {
    const sourcePos = positionMap[data.sourceEdge ?? "bottom"];
    const targetPos = positionMap[data.targetEdge ?? "top"];

    return (
        <>
            {data.label && (
                <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-sm font-medium"
                    style={{ color: data.color }}
                >
                    {data.label}
                </div>
            )}
            <div
                className="flex items-center justify-center rounded-sm p-3"
                style={{
                    backgroundColor: `${data.color}12`,
                    border: `1px dashed ${data.color}`,
                    color: data.color,
                }}
            >
                {data.icon}
            </div>
            <Handle
                type="target"
                position={targetPos}
                style={{
                    ...HANDLE_STYLE,
                    border: `1px solid ${data.color}`,
                    opacity: 0,
                }}
            />
            <Handle
                type="source"
                position={sourcePos}
                style={{
                    ...HANDLE_STYLE,
                    border: `1px solid ${data.color}`,
                    opacity: 0,
                }}
            />
        </>
    );
}
