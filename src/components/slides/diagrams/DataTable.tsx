import type { ReactNode } from "react";

function DottedCircle() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 21 20"
            fill="none"
            aria-hidden="true"
        >
            <rect
                width={15}
                height={15}
                x={3}
                y={2.5}
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeOpacity={0.7}
                strokeWidth={1.5}
                rx={7.5}
            />
        </svg>
    );
}

interface DataTableProps {
    columns: number;
    children: ReactNode;
}

function DataTable({ columns, children }: DataTableProps) {
    return (
        <div
            className="grid w-full items-center gap-x-6"
            style={{
                gridTemplateColumns: `auto repeat(${columns}, 1fr)`,
            }}
        >
            {children}
        </div>
    );
}

function Header({ children }: { children: ReactNode }) {
    return (
        <div className="col-span-full mb-4 grid grid-cols-subgrid text-(--slide-fg-muted)">
            <div />
            {children}
        </div>
    );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div
            className="col-span-full grid grid-cols-subgrid items-center py-4"
            style={{ borderTop: "1px solid var(--slide-border)" }}
        >
            <div className="flex items-center gap-3 pr-8 text-(--slide-fg-muted)">
                <DottedCircle />
                <span>{label}</span>
            </div>
            {children}
        </div>
    );
}

DataTable.Header = Header;
DataTable.Row = Row;

export { DataTable };
