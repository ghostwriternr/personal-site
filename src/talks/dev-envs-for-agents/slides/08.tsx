import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { FileText, GitBranch, Package, Terminal } from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";

const items: { icon: PhosphorIcon; label: string }[] = [
    { icon: Terminal, label: "Run commands in a shell" },
    { icon: FileText, label: "Read and write files" },
    { icon: GitBranch, label: "Clone git repos" },
    { icon: Package, label: "Install packages" },
];

export default function TableStakesSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-10">
                <p className="font-lufga text-3xl font-light text-(--slide-fg-muted)">
                    The table stakes
                </p>
                <div className="flex flex-col gap-6">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="flex items-center gap-4"
                            >
                                <Icon
                                    size={28}
                                    weight="light"
                                    className="shrink-0 text-(--slide-fg-muted)"
                                />
                                <p className="font-lufga text-2xl font-light">
                                    {item.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Slide>
    );
}
