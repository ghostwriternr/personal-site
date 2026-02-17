import { Handle, Position } from "@xyflow/react";
import BrowserMockup from "../../BrowserMockup";
import { HANDLE_STYLE } from "../constants";

export function BrowserNode() {
    return (
        <>
            <div className="w-[320px]">
                <BrowserMockup url="https://..." tabTitle="Preview">
                    <div className="h-[100px]" />
                </BrowserMockup>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    ...HANDLE_STYLE,
                    border: "1px solid var(--slide-fg-muted)",
                    opacity: 0,
                }}
            />
        </>
    );
}
