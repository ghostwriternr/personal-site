import Slide from "../../../components/slides/Slide";
import { CornerSquares } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

function ColdStartReframeSlide() {
    const step = useStep();

    return (
        <Slide hideGoose>
            <div className="grid w-full max-w-5xl grid-cols-[1fr_1.2fr] gap-0">
                {/* Left column */}
                <div className="relative row-span-2 border border-(--slide-border) p-8">
                    <CornerSquares />
                    <p className="font-lufga text-4xl leading-snug font-light">
                        What we call "cold start" is actually two problems.
                    </p>
                </div>

                <div
                    className="relative border border-(--slide-border) border-l-0 p-8 transition-opacity duration-500"
                    style={{ opacity: step >= 1 ? 1 : 0 }}
                >
                    <CornerSquares corners={{ topLeft: false, bottomLeft: false }} />
                    <h3 className="font-lufga text-xl font-medium">
                        Infrastructure boot
                    </h3>
                    <p className="mt-3 leading-relaxed text-(--slide-fg-muted)">
                        Time until the VM exists and has a kernel. MicroVMs boot in ~125ms. This is the platform's job, and it's largely solved.
                    </p>
                </div>

                <div
                    className="relative border border-(--slide-border) border-l-0 border-t-0 p-8 transition-opacity duration-500"
                    style={{ opacity: step >= 2 ? 1 : 0 }}
                >
                    <CornerSquares corners={{ topRight: false }} />
                    <h3 className="font-lufga text-xl font-medium">
                        Application readiness
                    </h3>
                    <p className="mt-3 leading-relaxed text-(--slide-fg-muted)">
                        Time until the agent can actually work. The right OS image, dependencies installed, repo cloned, env vars configured. This is where 125ms becomes 30 seconds.
                    </p>
                </div>
            </div>
        </Slide>
    );
}

ColdStartReframeSlide.steps = 3;

export default ColdStartReframeSlide;
