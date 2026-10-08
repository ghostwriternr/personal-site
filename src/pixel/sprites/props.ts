import type { Frame, Sprite } from "../types";

export const propKey = {
    k: "ink",
    w: "paper",
    s: "paperShade",
} as const;

/** A crumpled paper ball. Two frames alternate to make it roll. */
export const paperBallFrames = {
    roll1: [".kkkk.", "kwwswk", "kswwsk", "kwwwsk", "kswwwk", ".kkkk."],
    roll2: [".kkkk.", "kswwwk", "kwswwk", "kwwswk", "kwswwk", ".kkkk."],
} satisfies Record<string, Frame>;

/** A puff of dust kicked up by scrabbling paws, then breaking up. */
export const dustFrames = {
    puff: ["..ww..", ".wwsw.", "wwswws"],
    puffFading: [".w..s.", "w.s..w", ".s.w.s"],
} satisfies Record<string, Frame>;

export const paperBall: Sprite = {
    id: "paper-ball",
    name: "Paper ball",
    tier: "character",
    scale: 3,
    key: propKey,
    frames: paperBallFrames,
    animations: {
        idle: [
            ["roll1", 1600],
            ["roll2", 120],
            ["roll1", 120],
            ["roll2", 120],
        ],
    },
};
