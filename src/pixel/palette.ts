/**
 * The sprite palette: every colour a sprite may use.
 *
 * Sprites own their colours (a ginger cat is ginger in both themes). Theme
 * slots are the exception: CSS variables from `src/styles/pixel.css` that
 * change with light and dark mode, for colours that would otherwise vanish
 * into the page. Scene colours dim toward the night sky in dark mode, while
 * lamps and clock faces light up. Add a colour here only when a sprite needs
 * it; keep the palette small so every sprite looks like part of one world.
 */

/** A scene colour: as given by day, mixed toward the night sky in dark mode. */
const scene = (hex: string) =>
    `color-mix(in oklab, ${hex}, var(--px-night) var(--px-night-amount))`;

export const palette = {
    // Theme slots
    ink: "var(--px-ink)",
    /** Windows and doorways: dark glass by day, lit at night. */
    lamp: "var(--px-lamp)",
    /** Clock faces, lanterns and the Eye's capsules: white by day, glowing at night. */
    glow: "var(--px-glow)",
    /** The lighthouse beam: only visible at night. */
    beam: "var(--px-beam)",
    beamFaint: "var(--px-beam-faint)",
    /** Where the lighthouse beam lands on the gopuram: nothing by day. */
    ochreLit: "var(--px-ochre-lit)",
    /**
     * The Shard's lights: its glass by day; at night a white-blue tip, a
     * cyan and violet crown, and warm office windows.
     */
    shardTip: "var(--px-shard-tip)",
    shardTipShade: "var(--px-shard-tip-shade)",
    shardCrown: "var(--px-shard-crown)",
    shardCrownShade: "var(--px-shard-crown-shade)",
    shardWindow: "var(--px-shard-window)",
    shardWindowShade: "var(--px-shard-window-shade)",

    // Cats
    ginger: "#e8661c",
    gingerDark: "#b5420f",
    cream: "#ffe9c7",
    pink: "#f48aa0",
    eyeOlive: "#9a9a2c",
    calicoWhite: "#f7f1e6",
    calicoWhiteShade: "#d3c9b8",
    calicoOrange: "#e88a2e",
    calicoBlack: "#3b3240",
    eyeOliveYellow: "#c4b434",
    tabby: "#8f7d68",
    tabbyStripe: "#53463a",
    tabbyLight: "#d2c4ab",
    eyeGreenGold: "#9fb03a",
    noseBrown: "#7a4a3a",
    sisal: "#d9b98a",
    sisalShade: "#b8935f",
    carpet: "#8a6a8f",

    // Naresh's monstera
    terracotta: "#c8663e",
    terracottaShade: "#9a4a2a",
    terracottaRim: "#de8a5e",
    soil: "#4a3428",
    moss: "#7a6a45",
    mossShade: "#5a4d30",
    mossGreen: "#4f7a3a",
    leaf: "#3f8f4a",
    leafVein: "#2c6a37",
    leafLight: "#6fb36a",
    leafDark: "#2f7a3f",
    leafDarkVein: "#1f5a2c",
    leafDarkLight: "#4f9a55",
    leafFresh: "#55a852",
    leafFreshVein: "#3a8040",
    leafFreshLight: "#8cc873",
    /** A new leaf, just unfurled, before it darkens. */
    leafNew: "#a9d46a",
    leafNewVein: "#7fae4a",
    leafNewLight: "#c8e68a",

    // The sky in the page margins
    starlight: "#efe2c4",
    starDim: "#5a4a7e",
    cloud: "#ffe3b0",
    cloudShade: "#ffd690",

    // Props
    paper: "#fbf7ef",
    paperShade: "#c9bfae",

    // Scenes: the Chennai → London strip
    asphalt: scene("#4b4256"),
    kerb: scene("#7a6f86"),
    sea: scene("#2e7bb0"),
    seaDeep: scene("#1f5c8c"),
    sandstone: scene("#c99050"),
    sandstoneShade: scene("#6f6656"),
    whitewash: scene("#fbf7ef"),
    mist: scene("#c4bba9"),
    stucco: scene("#f3dfbf"),
    slate: scene("#3d4258"),
    signalRed: scene("#c4362c"),
    signalRedShade: scene("#8e2620"),
    brick: scene("#b23a2a"),
    brickDark: scene("#7a2216"),
    ochre: scene("#c7762e"),
    ochreDark: scene("#8f4a1c"),
    templeTeal: scene("#2a9d8f"),
    templePink: scene("#e86a92"),
    gold: scene("#e8b030"),
    limestone: scene("#a67c43"),
    limestoneDark: scene("#6f4f27"),
    bridgeBlue: scene("#3a78ad"),
    glass: scene("#9cc1d6"),
    glassDark: scene("#5e88a5"),
    autoYellow: scene("#f5c518"),
    autoYellowShade: scene("#c99a0c"),
    canopy: scene("#2b2833"),
    busRed: scene("#d42a1f"),
    busRedShade: scene("#9c1d15"),
    tyre: scene("#2a2632"),
} as const;

export type PaletteColor = keyof typeof palette;

export const themeSlots = Object.keys(palette).filter((name) =>
    palette[name as PaletteColor].startsWith("var(")
) as PaletteColor[];
