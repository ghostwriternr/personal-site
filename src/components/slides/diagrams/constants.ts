export const EDGE_STYLE = {
    stroke: "#f0e3de",
    strokeWidth: 1.5,
    opacity: 0.4,
} as const;

export const HANDLE_STYLE = {
    width: 8,
    height: 8,
    background: "#121212",
    borderRadius: 0,
} as const;

export const STATIC_FLOW_PROPS = {
    zoomOnScroll: false,
    panOnScroll: false,
    panOnDrag: false,
    zoomOnPinch: false,
    zoomOnDoubleClick: false,
    preventScrolling: false,
    nodesDraggable: false,
    nodesConnectable: false,
    elementsSelectable: false,
    proOptions: { hideAttribution: true },
} as const;
