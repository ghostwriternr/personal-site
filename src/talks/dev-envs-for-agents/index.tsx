import type { TalkMeta, SlideComponent } from "../../components/slides/types";
import { cloudflareDark } from "../../components/slides/themes";
import DemoSlide from "./slides/DemoSlide";
import FreezeFrameSlide from "./slides/FreezeFrameSlide";

export const meta: TalkMeta = {
    title: "Designing Sandboxed Dev Environments for Coding Agents",
    date: "2026-02-26",
    event: "AI Coding Summit 2026",
    description:
        "Every agent needs a computer. And designing that computer is a design problem.",
};

export const slides: SlideComponent[] = [DemoSlide, FreezeFrameSlide];

export const theme = cloudflareDark;
