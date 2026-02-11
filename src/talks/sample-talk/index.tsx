import type { TalkMeta, SlideComponent } from "../../components/slides/types";
import TitleSlide from "./slides/TitleSlide";
import ContentSlide from "./slides/ContentSlide";

export const meta: TalkMeta = {
    title: "Sample Talk",
    date: "2026-02-10",
    description: "A sample talk to test the slide engine.",
};

export const slides: SlideComponent[] = [TitleSlide, ContentSlide];
