import { Cube, Database, Plugs, PlugsConnected } from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";
import { CardGrid } from "../../../components/slides/diagrams";

const ICON_SIZE = 64;

const decisions = [
    {
        title: "Runtime",
        render: (
            <div
                className="flex items-end gap-1.5"
                style={{ fontSize: 36, fontWeight: 300, lineHeight: 1 }}
            >
                <span style={{ opacity: 0.5 }}>&gt;</span>
                <div
                    style={{
                        width: 14,
                        height: 30,
                        backgroundColor: "currentColor",
                        borderRadius: 2,
                        animation: "icon-blink 2.5s ease-in-out infinite",
                    }}
                />
            </div>
        ),
    },
    {
        title: "Isolation",
        render: (() => {
            const ringSize = ICON_SIZE + 36;
            const r = ringSize / 2 - 1;
            return (
                <div className="relative flex items-center justify-center">
                    <svg
                        className="absolute"
                        width={ringSize}
                        height={ringSize}
                        viewBox={`0 0 ${ringSize} ${ringSize}`}
                        fill="none"
                        aria-hidden="true"
                        style={{
                            opacity: 0.5,
                            animation: "icon-spin 14s linear infinite",
                        }}
                    >
                        <circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={r}
                            stroke="var(--slide-accent)"
                            strokeWidth={1}
                            strokeDasharray="16 12"
                            strokeLinecap="round"
                        />
                    </svg>
                    <Cube size={ICON_SIZE} weight="thin" />
                </div>
            );
        })(),
    },
    {
        title: "Networking",
        render: (
            <div
                className="relative flex items-center justify-center"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
                <div
                    className="absolute"
                    style={{
                        animation: "icon-disconnect 4s ease-in-out 1s infinite",
                    }}
                >
                    <Plugs size={ICON_SIZE} weight="thin" />
                </div>
                <div
                    className="absolute"
                    style={{
                        animation: "icon-connect 4s ease-in-out 1s infinite",
                    }}
                >
                    <PlugsConnected size={ICON_SIZE} weight="thin" />
                </div>
            </div>
        ),
    },
    {
        title: "Persistence",
        render: (
            <div
                className="relative"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
            >
                <div style={{ opacity: 0.25 }}>
                    <Database size={ICON_SIZE} weight="thin" />
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        animation: "icon-persist 4s ease-in-out infinite",
                    }}
                >
                    <Database size={ICON_SIZE} weight="thin" />
                </div>
            </div>
        ),
    },
];

export { decisions };

function FourDecisionsSlide() {
    return (
        <Slide hideGoose edgeToEdge>
            <CardGrid
                columns={2}
                rows={2}
                activeCount={1}
                className="h-full w-full"
            >
                {decisions.map((item) => (
                    <div key={item.title} className="flex h-full flex-col">
                        <div
                            className="flex flex-1 items-center justify-center"
                            style={{
                                backgroundColor: "var(--slide-bg-surface)",
                                borderBottom: "1px solid var(--slide-border)",
                                color: "var(--slide-accent)",
                            }}
                        >
                            {item.render}
                        </div>
                        <div className="flex items-center justify-center p-5">
                            <span className="font-lufga text-xl font-medium">
                                {item.title}
                            </span>
                        </div>
                    </div>
                ))}
            </CardGrid>
        </Slide>
    );
}

FourDecisionsSlide.edgeToEdge = true;
FourDecisionsSlide.notes = `Four decisions. I'll reveal them as we go. First: runtime — what does the agent actually get to work with?`;

export default FourDecisionsSlide;
