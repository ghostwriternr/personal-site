import { Handle, Position } from "@xyflow/react";

export function AnchorNode() {
    return (
        <div style={{ width: 1, height: 1 }}>
            <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
            <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
        </div>
    );
}
