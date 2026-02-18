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
                        How you think about persistence affects cold starts.
                    </p>
                </div>

                <div
                    className="relative border border-l-0 border-(--slide-border) p-8 transition-opacity duration-500"
                    style={{ opacity: step >= 1 ? 1 : 0 }}
                >
                    <CornerSquares
                        corners={{ topLeft: false, bottomLeft: false }}
                    />
                    <h3 className="font-lufga text-xl font-medium">
                        What survives
                    </h3>
                    <p className="mt-3 leading-relaxed text-(--slide-fg-muted)">
                        When the sandbox stops, what's still there? The OS
                        image, installed dependencies, cloned repos, runtime
                        state — each layer is a choice.
                    </p>
                </div>

                <div
                    className="relative border border-t-0 border-l-0 border-(--slide-border) p-8 transition-opacity duration-500"
                    style={{ opacity: step >= 2 ? 1 : 0 }}
                >
                    <CornerSquares corners={{ topRight: false }} />
                    <h3 className="font-lufga text-xl font-medium">
                        How fast it resumes
                    </h3>
                    <p className="mt-3 leading-relaxed text-(--slide-fg-muted)">
                        Cold start time is a direct consequence. The more you
                        persist, the less you rebuild. The less you rebuild, the
                        faster you resume.
                    </p>
                </div>
            </div>
        </Slide>
    );
}

ColdStartReframeSlide.steps = 3;
ColdStartReframeSlide.notes = `Persistence and cold start aren't separate problems. They're two sides of the same coin.

[1] Cold start has two parts: infrastructure boot and application readiness. Infra boot — how long until the VM exists and has a kernel — is largely solved. MicroVMs boot in ~125ms. Namespaces even faster. That's not where the time goes.

[2] Application readiness is where 125ms becomes 30 seconds. After the kernel boots, you still need the right image pulled, dependencies installed, repos cloned, env vars configured, maybe a dev server started. That gap is what the developer actually feels — and what you persist determines how much of it you skip.`;

export default ColdStartReframeSlide;
