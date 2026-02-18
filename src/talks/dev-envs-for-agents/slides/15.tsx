import { useMemo } from "react";
import type { Edge, Node } from "@xyflow/react";
import Slide from "../../../components/slides/Slide";
import {
    BrowserNode,
    DashedIconNode,
    EDGE_STYLE,
    StaticDiagram,
} from "../../../components/slides/diagrams";
import type { DashedIconNodeData } from "../../../components/slides/diagrams";
import {
    ContainerIcon,
    DurableObjectIcon,
} from "../../../components/slides/logos";

const DO_COLOR = "#0A95FF";
const CONTAINER_COLOR = "#f14602";
const ICON_SIZE = 28;

const nodeTypes = {
    browser: BrowserNode,
    dashedIcon: DashedIconNode,
};

function buildNodes(): Node[] {
    const browserX = 0;
    const browserY = 40;

    const doX = 440;
    const doSpacing = 120;
    const doStartY = 0;

    const containerX = 660;

    const browser: Node = {
        id: "browser",
        type: "browser",
        position: { x: browserX, y: browserY },
        data: {},
        draggable: false,
    };

    const dos: Node<DashedIconNodeData>[] = [0, 1, 2].map((i) => ({
        id: `do-${i}`,
        type: "dashedIcon",
        position: { x: doX, y: doStartY + i * doSpacing },
        data: {
            icon: <DurableObjectIcon width={ICON_SIZE} height={ICON_SIZE} />,
            color: DO_COLOR,
            targetEdge: "left" as const,
            sourceEdge: "right" as const,
        },
        draggable: false,
    }));

    const containers: Node<DashedIconNodeData>[] = [0, 1, 2].map((i) => ({
        id: `container-${i}`,
        type: "dashedIcon",
        position: { x: containerX, y: doStartY + i * doSpacing },
        data: {
            icon: <ContainerIcon width={ICON_SIZE} height={ICON_SIZE} />,
            color: CONTAINER_COLOR,
            targetEdge: "left" as const,
            sourceEdge: "right" as const,
        },
        draggable: false,
    }));

    return [browser, ...dos, ...containers];
}

function buildEdges(): Edge[] {
    const baseStyle = {
        ...EDGE_STYLE,
        strokeWidth: 1.5,
    };

    const browserToDos: Edge[] = [0, 1, 2].map((i) => ({
        id: `browser-do-${i}`,
        source: "browser",
        target: `do-${i}`,
        animated: true,
        style: { ...baseStyle, stroke: DO_COLOR, opacity: 0.5 },
    }));

    const dosToContainers: Edge[] = [0, 1, 2].map((i) => ({
        id: `do-container-${i}`,
        source: `do-${i}`,
        target: `container-${i}`,
        animated: true,
        style: { ...baseStyle, stroke: CONTAINER_COLOR, opacity: 0.5 },
    }));

    return [...browserToDos, ...dosToContainers];
}

function NetworkingExposureSlide() {
    const nodes = useMemo(() => buildNodes(), []);
    const edges = useMemo(() => buildEdges(), []);

    return (
        <Slide>
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-[380px] w-[900px]">
                    <StaticDiagram
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{
                            style: EDGE_STYLE,
                            animated: true,
                        }}
                        fitViewOptions={{ padding: 0.1 }}
                    />
                </div>
                <p className="font-lufga max-w-2xl text-center text-xl font-light text-(--slide-fg-muted)">
                    Every request needs a routing layer to find the right
                    sandbox and the right port inside it.
                </p>
            </div>
        </Slide>
    );
}

NetworkingExposureSlide.notes = `Request arrives at the edge. The routing layer parses the hostname, resolves it to a specific sandbox on a specific machine, and opens a TCP tunnel to the container on the right port. The container is listening on an internal address. It never has a public IP.

The routing layer sits in the middle of every request. That's what enforces that user A's URL only reaches user A's sandbox — it's just a lookup, and the lookup is scoped to the session token in the subdomain.

From the developer's side: you say "expose port 5173", you get a URL back. The whole path above is wired up for you.`;

export default NetworkingExposureSlide;
