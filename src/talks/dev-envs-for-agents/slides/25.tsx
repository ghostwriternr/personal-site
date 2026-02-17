import { useMemo } from "react";
import {
    Globe,
    Terminal,
    FolderOpen,
    Robot,
    HardDrive,
    Database,
} from "@phosphor-icons/react";
import type { Edge, Node } from "@xyflow/react";
import Slide from "../../../components/slides/Slide";
import {
    DashedIconNode,
    EDGE_STYLE,
    GroupNode,
    IconGroupNode,
    StaticDiagram,
} from "../../../components/slides/diagrams";
import type {
    DashedIconNodeData,
    GroupNodeData,
    IconGroupNodeData,
} from "../../../components/slides/diagrams";
import {
    DurableObjectIcon,
    WorkerIcon,
} from "../../../components/slides/logos";

const BLUE = "#0A95FF";
const ORANGE = "#f14602";
const WARM = "#f0e3de";
const PINK = "#e574bc";
const ICON_SIZE = 24;
const SMALL_ICON = 20;

const nodeTypes = {
    dashedIcon: DashedIconNode,
    groupNode: GroupNode,
    iconGroup: IconGroupNode,
};

function buildNodes(): Node[] {
    // --- Column 1: Clients (x: 0) ---
    const clients: Node<DashedIconNodeData>[] = [
        { y: 55, icon: <Robot size={ICON_SIZE} weight="thin" />, color: WARM },
        { y: 170, icon: <Robot size={ICON_SIZE} weight="thin" />, color: WARM },
        {
            y: 285,
            icon: <Globe size={ICON_SIZE} weight="thin" />,
            color: BLUE,
        },
    ].map(({ y, icon, color }, i) => ({
        id: `client-${i}`,
        type: "dashedIcon",
        position: { x: 0, y },
        data: {
            icon,
            color,
            sourceEdge: "right" as const,
            targetEdge: "left" as const,
        },
        draggable: false,
    }));

    // --- Column 2: Worker (x: 170) ---
    const worker: Node<DashedIconNodeData> = {
        id: "worker",
        type: "dashedIcon",
        position: { x: 170, y: 155 },
        data: {
            icon: <WorkerIcon width={ICON_SIZE} height={ICON_SIZE} />,
            color: ORANGE,
            label: "Worker",
            sourceEdge: "right" as const,
            targetEdge: "left" as const,
        },
        draggable: false,
    };

    // --- Column 3: Durable Objects (x: 360) ---
    const doPositions = [
        { x: 360, y: 82 },
        { x: 360, y: 267 },
    ];
    const durableObjects: Node<DashedIconNodeData>[] = doPositions.map(
        (pos, i) => ({
            id: `do-${i}`,
            type: "dashedIcon",
            position: pos,
            data: {
                icon: (
                    <DurableObjectIcon width={ICON_SIZE} height={ICON_SIZE} />
                ),
                color: BLUE,
                label: "Durable Object",
                sourceEdge: "right" as const,
                targetEdge: "left" as const,
            },
            draggable: false,
        })
    );

    // --- Column 4: microVM groups + Sandbox icon groups (x: 520) ---
    const vmGroupPositions = [
        { x: 510, y: 15 },
        { x: 510, y: 200 },
    ];
    const microVMs: Node<GroupNodeData>[] = vmGroupPositions.map((pos, i) => ({
        id: `vm-${i}`,
        type: "groupNode",
        position: pos,
        data: {
            label: "microVM",
            borderColor: `${WARM}50`,
            bgColor: `${WARM}06`,
            width: 240,
            height: 140,
        },
        draggable: false,
        zIndex: -1,
    }));

    const sandboxPositions = [
        { x: 530, y: 58 },
        { x: 530, y: 243 },
    ];
    const sandboxes: Node<IconGroupNodeData>[] = sandboxPositions.map(
        (pos, i) => ({
            id: `sandbox-${i}`,
            type: "iconGroup",
            position: pos,
            data: {
                icons: [
                    {
                        key: "terminal",
                        element: <Terminal size={SMALL_ICON} weight="thin" />,
                    },
                    {
                        key: "port",
                        element: <Globe size={SMALL_ICON} weight="thin" />,
                    },
                    {
                        key: "files",
                        element: <FolderOpen size={SMALL_ICON} weight="thin" />,
                    },
                ],
                color: ORANGE,
                label: "Sandbox",
            },
            draggable: false,
        })
    );

    // --- Column 5: Storage (x: 850) ---
    const storage: Node<IconGroupNodeData> = {
        id: "storage",
        type: "iconGroup",
        position: { x: 850, y: 165 },
        data: {
            icons: [
                {
                    key: "kv",
                    element: <Database size={SMALL_ICON} weight="thin" />,
                },
                {
                    key: "do-storage",
                    element: <HardDrive size={SMALL_ICON} weight="thin" />,
                },
            ],
            color: PINK,
            label: "Storage",
        },
        draggable: false,
    };

    return [
        ...clients,
        worker,
        ...durableObjects,
        ...microVMs,
        ...sandboxes,
        storage,
    ];
}

function buildEdges(): Edge[] {
    const base = { strokeWidth: 1.5 };

    // Clients → Worker
    const clientToWorker: Edge[] = [0, 1, 2].map((i) => ({
        id: `client-${i}-worker`,
        source: `client-${i}`,
        target: "worker",
        animated: true,
        style: { ...base, stroke: WARM, opacity: 0.25 },
    }));

    // Worker → DOs
    const workerToDo: Edge[] = [0, 1].map((i) => ({
        id: `worker-do-${i}`,
        source: "worker",
        target: `do-${i}`,
        animated: true,
        style: { ...base, stroke: BLUE, opacity: 0.4 },
    }));

    // DOs → Sandboxes
    const doToSandbox: Edge[] = [0, 1].map((i) => ({
        id: `do-${i}-sandbox-${i}`,
        source: `do-${i}`,
        target: `sandbox-${i}`,
        animated: true,
        style: { ...base, stroke: ORANGE, opacity: 0.4 },
    }));

    // Sandboxes → Storage
    const sandboxToStorage: Edge[] = [0, 1].map((i) => ({
        id: `sandbox-${i}-storage`,
        source: `sandbox-${i}`,
        target: "storage",
        animated: true,
        style: { ...base, stroke: PINK, opacity: 0.25 },
    }));

    return [
        ...clientToWorker,
        ...workerToDo,
        ...doToSandbox,
        ...sandboxToStorage,
    ];
}

function ArchitectureSlide() {
    const nodes = useMemo(() => buildNodes(), []);
    const edges = useMemo(() => buildEdges(), []);

    return (
        <Slide>
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-[420px] w-[1050px]">
                    <StaticDiagram
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{
                            style: EDGE_STYLE,
                            animated: true,
                        }}
                        fitViewOptions={{ padding: 0.08 }}
                    />
                </div>
                <p className="font-lufga max-w-2xl text-center text-xl font-light text-(--slide-fg-muted)">
                    Your Worker routes requests to Durable Objects. Each one
                    manages a sandbox in its own microVM.
                </p>
            </div>
        </Slide>
    );
}

ArchitectureSlide.notes = `Agents and browsers hit the edge. A Worker handles your routing logic — auth, session lookup, whatever your application needs.

The Worker routes to Durable Objects. Each DO manages a sandbox's lifecycle — globally addressable, handles sleep and wake, serializes concurrency for one session. That's where we solve the addressing problem.

Each DO manages a sandbox running in a Firecracker microVM. Kernel boundary, own network stack, own filesystem.

Storage is separate — workspace files, diffs, state. The sandbox can be torn down and recreated; the data outlives it.`;

export default ArchitectureSlide;
