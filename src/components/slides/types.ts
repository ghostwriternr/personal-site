import type { ComponentType } from "react";

export type SlideComponent = ComponentType;

export interface TalkMeta {
    title: string;
    date: string;
    event?: string;
    description: string;
}

/**
 * CSS custom properties that define a talk's visual theme.
 * Applied as inline styles on the SlideDeck container,
 * cascading to all child slide components.
 *
 * Slide components reference these via Tailwind's parenthetical syntax:
 *   bg-(--slide-bg)  text-(--slide-fg)  border-(--slide-border)
 */
export interface TalkTheme {
    /** Base slide background */
    "--slide-bg": string;
    /** Elevated surface (cards, code blocks) */
    "--slide-bg-surface": string;
    /** Active/hover state backgrounds */
    "--slide-bg-active": string;
    /** Primary text color */
    "--slide-fg": string;
    /** Muted/secondary text */
    "--slide-fg-muted": string;
    /** Primary accent (highlights, links) */
    "--slide-accent": string;
    /** Lighter accent variant */
    "--slide-accent-light": string;
    /** Border/divider color */
    "--slide-border": string;
}

export interface TalkModule {
    meta: TalkMeta;
    slides: SlideComponent[];
    theme: TalkTheme;
}
