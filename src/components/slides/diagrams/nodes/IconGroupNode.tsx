import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { CornerSquares } from "../CornerSquares";
import { DashedBorder } from "../DashedBorder";
import { HANDLE_STYLE } from "../constants";

export interface IconGroupNodeData extends Record<string, unknown> {
    icons: Array<{ key: string; element: React.ReactNode }>;
    color: string;
    label?: string;
}

export function IconGroupNode({
    data,
}: NodeProps<Node<IconGroupNodeData>>) {
    return (
        <>
            <div
                className="relative flex gap-3 rounded-[2px] p-3"
                style={{
                    backgroundColor: `${data.color}08`,
                    border: `1px solid ${data.color}`,
                }}
            >
                <CornerSquares size="sm" color={data.color} />
                {data.label && (
                    <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-base font-medium"
                        style={{ color: data.color }}
                    >
                        {data.label}
                    </div>
                )}
                {data.icons.map(({ key, element }) => (
                    <DashedBorder
                        key={key}
                        borderColor={data.color}
                        borderRadius={8}
                        strokeWidth={1}
                        className="flex items-center justify-center"
                        style={{
                            width: 52,
                            height: 52,
                            backgroundColor: `${data.color}0D`,
                        }}
                    >
                        <div
                            className="flex items-center justify-center"
                            style={{ color: data.color }}
                        >
                            {element}
                        </div>
                    </DashedBorder>
                ))}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    ...HANDLE_STYLE,
                    border: `1px solid ${data.color}`,
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    ...HANDLE_STYLE,
                    border: `1px solid ${data.color}`,
                }}
            />
        </>
    );
}
