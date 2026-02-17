import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Camera, HardDrive, Package, Stack } from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";
import { DashedBorder } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

const techniques: { icon: PhosphorIcon; title: string; desc: string }[] = [
    {
        icon: Package,
        title: "Pre-built images",
        desc: "Bake dependencies into the image at build time. npm install happens once, not per sandbox.",
    },
    {
        icon: HardDrive,
        title: "Volumes",
        desc: "Mount persistent storage into ephemeral containers. Workspace, node_modules, and cloned repos survive restarts.",
    },
    {
        icon: Camera,
        title: "Snapshots",
        desc: "Freeze disk and memory after the app is ready. Next start restores from the snapshot instead of booting fresh.",
    },
    {
        icon: Stack,
        title: "Warm pools",
        desc: "Pre-create sandboxes before they're needed. When an agent asks for one, it's already running.",
    },
];

function TechniquesSlide() {
    const step = useStep();

    return (
        <Slide hideGoose>
            <DashedBorder
                className="w-full max-w-4xl p-1"
                borderRadius={12}
                dashLength={6}
                gapLength={6}
                borderColor="var(--slide-fg-muted)"
            >
                <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-(--slide-border)">
                    {techniques.map((t, i) => {
                        const Icon = t.icon;
                        const isRight = i % 2 === 1;
                        const isBottom = i >= 2;
                        return (
                            <div
                                key={t.title}
                                className="flex flex-col gap-1 p-8 transition-opacity duration-500"
                                style={{
                                    borderLeft: isRight
                                        ? "1px solid var(--slide-border)"
                                        : undefined,
                                    borderTop: isBottom
                                        ? "1px solid var(--slide-border)"
                                        : undefined,
                                    opacity: i <= step ? 1 : 0,
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon size={20} weight="regular" />
                                    <h3 className="font-lufga text-lg font-medium">
                                        {t.title}
                                    </h3>
                                </div>
                                <p className="mt-2 leading-relaxed text-(--slide-fg-muted)">
                                    {t.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </DashedBorder>
        </Slide>
    );
}

TechniquesSlide.steps = 4;
TechniquesSlide.notes = `First: pre-built images. Bake dependencies into the image at build time. npm install happens once, not per sandbox.

[1] Volumes — mount persistent storage into ephemeral containers. Workspace, cloned repos, and dependency directories survive restarts.

[2] Snapshots — freeze disk and memory after the app is ready. Next start restores from the snapshot instead of booting fresh.

[3] Warm pools — pre-create sandboxes before they're needed. When an agent asks for one, it's already running. Production systems combine all four.`;

export default TechniquesSlide;
