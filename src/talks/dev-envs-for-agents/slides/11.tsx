import Slide from "../../../components/slides/Slide";

export default function NoLocalhostSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg)">
                    Networking
                </p>

                <div className="flex items-center gap-6 px-8">
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) px-8 py-6">
                        <span className="font-lufga text-lg text-(--slide-fg)">
                            Agent
                        </span>
                        <span className="font-mono text-xs text-(--slide-fg-muted)">
                            npm start
                        </span>
                    </div>

                    <div className="relative flex-1">
                        <div className="h-px w-full bg-(--slide-border)" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 font-mono text-3xl font-bold text-red-400">
                            ✕
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) px-8 py-6">
                        <span className="font-lufga text-lg text-(--slide-fg)">
                            Environment
                        </span>
                        <span className="font-mono text-xs text-(--slide-fg-muted)">
                            :5173
                        </span>
                    </div>
                </div>

                <p className="font-lufga text-center text-4xl font-light text-(--slide-accent-light)">
                    There is no localhost.
                </p>
            </div>
        </Slide>
    );
}
