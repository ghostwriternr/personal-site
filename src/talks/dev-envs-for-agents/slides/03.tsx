import {
    HardDrive,
    Cpu,
    ShieldCheck,
    Globe,
    Pause,
} from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";

const icons = [HardDrive, Cpu, ShieldCheck, Globe, Pause];

export default function PreviewIsComputerSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-10">
                <div className="flex items-center gap-8">
                    {icons.map((Icon) => (
                        <Icon
                            key={Icon.displayName}
                            size={32}
                            weight="thin"
                            className="text-(--slide-fg-muted)"
                        />
                    ))}
                </div>
                <p className="font-lufga text-center text-5xl leading-tight font-light text-(--slide-fg)">
                    That preview link is a computer.
                </p>
            </div>
        </Slide>
    );
}
