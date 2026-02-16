import Slide from "../../../components/slides/Slide";

const strategies = [
    {
        label: "Ephemeral",
        detail: "Clean slate every time",
    },
    {
        label: "Sync to storage",
        detail: "You choose what survives",
    },
    {
        label: "Snapshots",
        detail: "Freeze & resume instantly",
    },
    {
        label: "Durable machines",
        detail: "Always on, always stateful",
    },
];

export default function PersistenceSpectrumSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg)">
                    Persistence
                </p>

                <div className="flex items-start">
                    {strategies.map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-1 flex-col items-center gap-2"
                        >
                            <span className="font-lufga text-lg text-(--slide-accent-light)">
                                {s.label}
                            </span>
                            <span className="text-center text-xs text-(--slide-fg-muted)">
                                {s.detail}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="shrink-0 text-xs text-(--slide-fg-muted)">
                        Nothing persists
                    </span>
                    <div className="h-px flex-1 bg-(--slide-border)" />
                    <div className="h-2 w-2 rotate-45 border-t border-r border-(--slide-fg-muted)" />
                    <span className="shrink-0 text-xs text-(--slide-fg-muted)">
                        Everything persists
                    </span>
                </div>
            </div>
        </Slide>
    );
}
