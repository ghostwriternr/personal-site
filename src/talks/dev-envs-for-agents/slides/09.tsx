import Slide from "../../../components/slides/Slide";

export default function ColdStartSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg)">
                    Cold Start
                </p>

                <div className="flex items-end gap-12 px-8">
                    <div className="flex flex-col items-center gap-3">
                        <span className="font-mono text-2xl font-bold text-(--slide-accent-light)">
                            25ms
                        </span>
                        <div
                            className="w-24 rounded-t bg-(--slide-accent-light)"
                            style={{ height: 8 }}
                        />
                        <span className="text-xs text-(--slide-fg-muted)">
                            Snapshot resume
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <span className="font-mono text-2xl font-bold text-(--slide-fg)">
                            3s+
                        </span>
                        <div
                            className="w-24 rounded-t bg-(--slide-fg-muted)"
                            style={{ height: 240 }}
                        />
                        <span className="text-xs text-(--slide-fg-muted)">
                            Traditional boot
                        </span>
                    </div>
                </div>
            </div>
        </Slide>
    );
}
