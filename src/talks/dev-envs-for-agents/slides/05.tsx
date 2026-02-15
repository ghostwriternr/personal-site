import {
    Cube,
    Lightning,
    Plugs,
    PlugsConnected,
    Database,
} from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";
import { CornerSquares } from "../../../components/slides/diagrams";

const ICON_SIZE = 64;

const decisions = [
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
        title: "Cold Start",
        render: (
            <div style={{ animation: "icon-zap 2s ease-in-out infinite" }}>
                <Lightning size={ICON_SIZE} weight="thin" />
            </div>
        ),
    },
    {
        title: "Networking",
        render: (
            <div className="relative flex items-center justify-center" style={{ width: ICON_SIZE, height: ICON_SIZE }}>
                <div className="absolute" style={{ animation: "icon-disconnect 4s ease-in-out 1s infinite" }}>
                    <Plugs size={ICON_SIZE} weight="thin" />
                </div>
                <div className="absolute" style={{ animation: "icon-connect 4s ease-in-out 1s infinite" }}>
                    <PlugsConnected size={ICON_SIZE} weight="thin" />
                </div>
            </div>
        ),
    },
    {
        title: "Persistence",
        render: (
            <div className="relative" style={{ width: ICON_SIZE, height: ICON_SIZE }}>
                <div style={{ opacity: 0.25 }}>
                    <Database size={ICON_SIZE} weight="thin" />
                </div>
                <div
                    className="absolute inset-0"
                    style={{ animation: "icon-persist 4s ease-in-out infinite" }}
                >
                    <Database size={ICON_SIZE} weight="thin" />
                </div>
            </div>
        ),
    },
];

export default function FourDecisionsSlide() {
    return (
        <Slide hideGoose edgeToEdge>
            <div className="relative h-full w-full" style={{ border: "1px solid var(--slide-border)" }}>
                <CornerSquares size="md" />
                <div className="grid h-full w-full grid-cols-2 grid-rows-2">
                    {decisions.map((item, i) => (
                        <div
                            key={item.title}
                            className="flex flex-col"
                            style={{
                                borderRight: i % 2 === 0 ? "1px solid var(--slide-border)" : undefined,
                                borderBottom: i < 2 ? "1px solid var(--slide-border)" : undefined,
                            }}
                        >
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
                                <span
                                    className="font-lufga text-xl font-medium"
                                    style={{ color: "var(--slide-fg)" }}
                                >
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Slide>
    );
}

FourDecisionsSlide.edgeToEdge = true;
