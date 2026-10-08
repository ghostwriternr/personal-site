/**
 * The sprite palette: every colour a sprite may use.
 *
 * Sprites own their colours (a ginger cat is ginger in both themes). Theme
 * slots are the exception: CSS variables from `src/styles/pixel.css` that
 * change with light and dark mode, for colours that would otherwise vanish
 * into the page. Add a colour here only when a sprite needs it; keep the
 * palette small so every sprite looks like part of one world.
 */
export const palette = {
    // Theme slots
    ink: "var(--px-ink)",

    // Cats
    ginger: "#e8661c",
    gingerDark: "#b5420f",
    cream: "#ffe9c7",
    pink: "#f48aa0",
    eyeOlive: "#9a9a2c",

    // Props
    paper: "#fbf7ef",
    paperShade: "#c9bfae",
} as const;

export type PaletteColor = keyof typeof palette;

export const themeSlots = Object.keys(palette).filter((name) =>
    palette[name as PaletteColor].startsWith("var(")
) as PaletteColor[];
