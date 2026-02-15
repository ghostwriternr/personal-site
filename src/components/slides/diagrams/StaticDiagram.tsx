"use client";

import { useCallback } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    type ReactFlowProps,
    type FitViewOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { STATIC_FLOW_PROPS } from "./constants";

type StaticDiagramProps = Omit<ReactFlowProps, "fitView" | "onInit"> & {
    fitViewOptions?: FitViewOptions;
};

function StaticDiagramInner({
    fitViewOptions = { padding: 0.2 },
    children,
    ...props
}: StaticDiagramProps) {
    const { fitView } = useReactFlow();

    const onInit = useCallback(() => {
        requestAnimationFrame(() => {
            fitView(fitViewOptions);
        });
    }, [fitView, fitViewOptions]);

    return (
        <ReactFlow onInit={onInit} {...STATIC_FLOW_PROPS} {...props}>
            {children}
        </ReactFlow>
    );
}

export function StaticDiagram(props: StaticDiagramProps) {
    return (
        <ReactFlowProvider>
            <StaticDiagramInner {...props} />
        </ReactFlowProvider>
    );
}
