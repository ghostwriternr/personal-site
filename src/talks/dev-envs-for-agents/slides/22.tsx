import Slide from "../../../components/slides/Slide";

export default function OtherApproachesSlide() {
    return (
        <Slide>
            <div className="flex max-w-3xl flex-col items-center gap-8">
                <p className="font-lufga text-center text-3xl leading-tight font-light text-(--slide-fg)">
                    This is one set of tradeoffs.
                </p>
                <p className="font-lufga text-center text-lg leading-relaxed font-light text-(--slide-fg-muted)">
                    Snapshots for faster cold starts. gVisor instead of
                    microVMs. Durable machines instead of ephemeral ones.
                    <br />
                    Different tradeoffs, same goal:
                    <br />
                    <span className="text-(--slide-accent-light)">
                        give agents real computers
                    </span>
                    .
                </p>
            </div>
        </Slide>
    );
}
