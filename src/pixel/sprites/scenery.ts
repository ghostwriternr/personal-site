import type { PaletteColor } from "../palette";

/**
 * Key for scene pieces (the Chennai → London strip). Scene pieces have no
 * outline: flat colour, a lit face and a shaded face. `L` (lamp) and `G`
 * (glow) light up at night; `B` and `F` (the beam, then its faint tail) only
 * show at night; `z` is where the beam lands on the gopuram. The Shard's
 * lights (`m`, `v`, `j` on its lit face, capitals on its shaded face) match
 * its glass by day.
 */
export const sceneKey = {
    s: "sea",
    S: "seaDeep",
    n: "sandstone",
    N: "sandstoneShade",
    w: "whitewash",
    W: "mist",
    c: "stucco",
    x: "slate",
    r: "signalRed",
    R: "signalRedShade",
    b: "brick",
    d: "brickDark",
    o: "ochre",
    O: "ochreDark",
    q: "templeTeal",
    p: "templePink",
    y: "gold",
    g: "limestone",
    h: "limestoneDark",
    u: "bridgeBlue",
    i: "glass",
    I: "glassDark",
    L: "lamp",
    G: "glow",
    B: "beam",
    F: "beamFaint",
    z: "ochreLit",
    m: "shardTip",
    M: "shardTipShade",
    v: "shardCrown",
    V: "shardCrownShade",
    j: "shardWindow",
    J: "shardWindowShade",
} as const satisfies Record<string, PaletteColor>;
