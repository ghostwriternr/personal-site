import type { Node, NodeProps } from "@xyflow/react";
import { CornerSquares } from "../CornerSquares";

export interface GroupNodeData extends Record<string, unknown> {
    label: string;
    borderColor: string;
    bgColor: string;
    width: number;
    height: number;
}

export function GroupNode({ data }: NodeProps<Node<GroupNodeData>>) {
    return (
        <div
            className="relative rounded-[2px]"
            style={{
                width: data.width,
                height: data.height,
                backgroundColor: data.bgColor,
                border: `1px solid ${data.borderColor}`,
            }}
        >
            <CornerSquares size="sm" color={data.borderColor} />
            <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-sm font-medium"
                style={{ color: data.borderColor }}
            >
                {data.label}
            </div>
        </div>
    );
}
