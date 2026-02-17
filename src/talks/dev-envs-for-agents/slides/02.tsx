import { useMemo } from "react";
import {
    Terminal,
    FolderOpen,
    Cpu,
    HardDrive,
    Globe,
} from "@phosphor-icons/react";
import type { Node, Edge } from "@xyflow/react";
import Slide from "../../../components/slides/Slide";
import {
    StaticDiagram,
    AnchorNode,
    IconGroupNode,
    EDGE_STYLE,
} from "../../../components/slides/diagrams";
import type { IconGroupNodeData } from "../../../components/slides/diagrams";

const ACCENT = "#0A95FF";
const ICON_SIZE = 26;

const nodeTypes = {
    iconGroup: IconGroupNode,
    anchor: AnchorNode,
};

const icons = [
    { key: "terminal", element: <Terminal size={ICON_SIZE} weight="thin" /> },
    { key: "folder", element: <FolderOpen size={ICON_SIZE} weight="thin" /> },
    { key: "cpu", element: <Cpu size={ICON_SIZE} weight="thin" /> },
    { key: "hdd", element: <HardDrive size={ICON_SIZE} weight="thin" /> },
    { key: "globe", element: <Globe size={ICON_SIZE} weight="thin" /> },
];

function buildNodes(): Node[] {
    const groupX = 200;
    const groupMidY = 50;

    const group: Node<IconGroupNodeData> = {
        id: "group",
        type: "iconGroup",
        position: { x: groupX, y: groupMidY },
        data: {
            icons,
            color: ACCENT,
            label: "https://5173-lg6przaj-lg6przaj.goose-pond-editor.ghostwriternr.me",
        },
        draggable: false,
    };

    const anchorIn: Node = {
        id: "in",
        type: "anchor",
        position: { x: 0, y: groupMidY - 20 },
        data: {},
        draggable: false,
    };

    const anchorOut: Node = {
        id: "out",
        type: "anchor",
        position: { x: groupX + 540, y: groupMidY - 20 },
        data: {},
        draggable: false,
    };

    return [group, anchorIn, anchorOut];
}

const edgeStyle = EDGE_STYLE;

function buildEdges(): Edge[] {
    return [
        {
            id: "e-in",
            source: "in",
            target: "group",
            animated: true,
            style: edgeStyle,
        },
        {
            id: "e-out",
            source: "group",
            target: "out",
            animated: true,
            style: edgeStyle,
        },
    ];
}

function PreviewIsComputerSlide() {
    const nodes = useMemo(() => buildNodes(), []);
    const edges = useMemo(() => buildEdges(), []);

    return (
        <Slide>
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-[220px] w-[800px]">
                    <StaticDiagram
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{
                            style: EDGE_STYLE,
                            animated: true,
                        }}
                        fitViewOptions={{ padding: 0.05 }}
                    />
                </div>
                <p className="font-lufga text-center text-5xl leading-tight font-light text-(--slide-fg)">
                    That preview URL is a computer.
                </p>
            </div>
        </Slide>
    );
}

PreviewIsComputerSlide.notes = `Let's break down what had to happen to make that link work.

A shell. A filesystem. A network stack. Running processes. The URL is just the address.`;

export default PreviewIsComputerSlide;
