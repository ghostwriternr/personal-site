import type { ComponentType } from "react";

export type SlideComponent = ComponentType;

export interface TalkMeta {
    title: string;
    date: string;
    event?: string;
    description: string;
}

export interface TalkModule {
    meta: TalkMeta;
    slides: SlideComponent[];
}
