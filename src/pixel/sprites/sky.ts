import type { Sprite, Frame } from "../types";

const skyKey = {
    s: "starlight",
    f: "starDim",
    w: "cloud",
    d: "cloudShade",
} as const;

/** The sky never moves: every piece is one still frame. */
const still = (id: string, name: string, frame: Frame): Sprite => ({
    id,
    name,
    tier: "icon",
    scale: 3,
    key: skyKey,
    frames: { still: frame },
});

/** A faint star: one dim cell. */
export const starFaint = still("star-faint", "Faint star", ["f"]);
/** A star: one bright cell. */
export const star = still("star", "Star", ["s"]);
/** A small star: a bright centre with short dim points. */
export const starSmall = still("star-small", "Small star", [
    ".f.",
    "fsf",
    ".f.",
]);
/** The brightest star: longer points. */
export const starBright = still("star-bright", "Bright star", [
    "..f..",
    "..f..",
    "ffsff",
    "..f..",
    "..f..",
]);
/** A cloud, a shade lighter than the day sky, its underside a little darker. */
export const cloud = still("cloud", "Cloud", [
    ".....wwww.......",
    "...wwwwwwww.ww..",
    ".wwwwwwwwwwwwww.",
    "wwwwwwwwwwwwwwww",
    ".dddddddddddddd.",
]);
export const cloudSmall = still("cloud-small", "Small cloud", [
    "...www....",
    ".wwwwwww..",
    "wwwwwwwwww",
    ".dddddddd.",
]);
