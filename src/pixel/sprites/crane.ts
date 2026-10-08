import type { Frame, Sprite } from "../types";

const craneKey = {
    k: "ink",
    p: "paper",
    q: "paperShade",
} as const;

/** A square of white origami paper. */
const square: Frame = [
    ".kkkkkkkkkkkkkk.",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    "kppppppppppppppk",
    ".kkkkkkkkkkkkkk.",
];

/** Folded corner to corner and opened: one diagonal crease. */
const crease: Frame = [
    ".kkkkkkkkkkkkkk.",
    "kqpppppppppppppk",
    "kpqppppppppppppk",
    "kppqpppppppppppk",
    "kpppqppppppppppk",
    "kppppqpppppppppk",
    "kpppppqppppppppk",
    "kppppppqpppppppk",
    "kpppppppqppppppk",
    "kppppppppqpppppk",
    "kpppppppppqppppk",
    "kppppppppppqpppk",
    "kpppppppppppqppk",
    "kppppppppppppqpk",
    "kpppppppppppppqk",
    ".kkkkkkkkkkkkkk.",
];

/** Both diagonals creased. */
const creases: Frame = [
    ".kkkkkkkkkkkkkk.",
    "kqppppppppppppqk",
    "kpqppppppppppqpk",
    "kppqppppppppqppk",
    "kpppqppppppqpppk",
    "kppppqppppqppppk",
    "kpppppqppqpppppk",
    "kppppppqqppppppk",
    "kppppppqqppppppk",
    "kpppppqppqpppppk",
    "kppppqppppqppppk",
    "kpppqppppppqpppk",
    "kppqppppppppqppk",
    "kpqppppppppppqpk",
    "kqppppppppppppqk",
    ".kkkkkkkkkkkkkk.",
];

/** Folded in half corner to corner: a triangle, resting on its fold. */
const triangle: Frame = [
    ".......................",
    "..........kk...........",
    ".........kppk..........",
    "........kppppk.........",
    ".......kppppppk........",
    "......kppppppppk.......",
    ".....kppppppppppk......",
    "....kppppppppppppk.....",
    "...kppppppppppppppk....",
    "..kppppppppppppppppk...",
    ".kppppppppppppppppppk..",
    "kppppppppppppppppppppk.",
    ".kkkkkkkkkkkkkkkkkkkk..",
];

/** The square base: a diamond, its open end down. */
const squareBase: Frame = [
    ".......kk........",
    "......kpqk.......",
    ".....kppqpk......",
    "....kpppqppk.....",
    "...kppppqpppk....",
    "..kpppppqppppk...",
    ".kppppppqpppppk..",
    "kpppppppqppppppk.",
    "ppppppppqpppppppk",
    "kpppppppqppppppk.",
    ".kppppppqpppppk..",
    "..kpppppqppppk...",
    "...kppppqpppk....",
    "....kpppqppk.....",
    ".....kppqpk......",
    "......kpqk.......",
    ".......kk........",
];

/** The kite: the lower edges folded in to the centre line. */
const kite: Frame = [
    "......kk.......",
    ".....kpqk......",
    "....kppqpk.....",
    "...kpppqppk....",
    "..kppppqpppk...",
    ".kpppppqppppk..",
    "kpqqqqqqqqqqqk.",
    ".kpppppqpppppk.",
    "..kppppqppppk..",
    "..kppppqppppk..",
    "...kpppqpppk...",
    "...kpppqpppk...",
    "....kppqppk....",
    "....kppqppk....",
    ".....kpqpk.....",
    ".....kpqpk.....",
    "......kqk......",
    ".......k.......",
];

/** The bird base: long and thin, split into two legs. */
const birdBase: Frame = [
    ".....k.....",
    "....kpk....",
    "...kppk....",
    "...kpppk...",
    "..kppppk...",
    "..kpppppk..",
    ".kppppppk..",
    ".kpppppppk.",
    "kppppppppk.",
    ".kpppkpppk.",
    ".kpppkpppk.",
    "..kppkppk..",
    "..kppkppk..",
    "..kppkppk..",
    "...kpkpk...",
    "...kpkpk...",
    "...kpkpk...",
    "....kkk....",
    ".....k.....",
    "...........",
];

/** Neck and tail folded up either side of the wings. */
const neckAndTail: Frame = [
    "..............k.............",
    ".............kpk............",
    "...kk........kpk.........kk.",
    "..kppk......kppk........kppk",
    "..kppk......kpppk......kppk.",
    "...kppk....kppppk......kppk.",
    "...kppk....kppppk.....kppk..",
    "....kppk..kppppppk....kppk..",
    "....kppk..kppppppk...kppk...",
    ".....kppkkkppppppkkkkkppk...",
    "....kpppppppppppppppppppk...",
    ".....kpppppppppppppppppk....",
    "......kpppppppqpppppppk.....",
    ".......kkpppppqpppppkk......",
    ".........kppppqppppk........",
    "..........kkppqppkk.........",
    "............kpqpk...........",
    ".............kkk............",
];

/** The finished crane: head folded down, the near wing over the darker far wing. */
const craneFolded: Frame = [
    "...........k......k.........",
    "..........kpk....kqk........",
    "..kkk.....kppk...kqk.....kk.",
    ".kpppk...kpppk..kqqk....kppk",
    "kppppk...kppppk.kqqqk..kppk.",
    ".kkkppk.kpppppkkqqqqk..kppk.",
    "...kppk.kppppppkqqqqk.kppk..",
    "....kppkpppppppqqqqqqkkppk..",
    "....kppkppppppppqqqqqkppk...",
    ".....kppppppppppqqqqqkppk...",
    "....kpppppppppppppppppppk...",
    ".....kpqqqqqqqqqqqqqqqqk....",
    "......kpppppppqpppppppk.....",
    ".......kkpppppqpppppkk......",
    ".........kppppqppppk........",
    "..........kkppqppkk.........",
    "............kpqpk...........",
    ".............kkk............",
];

/** In flight, facing left: wings up. */
const wingsUp: Frame = [
    "...........k.......k.........",
    "..........kpk.....kqk........",
    "..........kppk...kqqk........",
    ".........kpppk...kqqk........",
    ".........kppppk.kqqqk........",
    ".kkk....kpppppk.kqqqqk.......",
    "kpppk...kppppppkqqqqqk....kk.",
    "ppkppk.kpppppppkqqqqqk...kppk",
    "kk.kppkkppppppppqqqqqk.kkppk.",
    "...kppkkppppppppqqqqqqkpppk..",
    "....kpppppppppppppppppppkk...",
    ".....kpqqqqqqqqqqqqqqqqk.....",
    "......kpppppppqpppppppk......",
    ".......kkpppppqpppppkk.......",
    ".........kppppqppppk.........",
    "..........kkppqppkk..........",
    "............kpqpk............",
    ".............kkk.............",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
];

/** Wings level, on the way down or up. */
const wingsLevel: Frame = [
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".kkk.k.......................",
    "kpppkpkkk...............k.kk.",
    "ppkppkpppkk..........kkkqkppk",
    "kk.kpppppppkk.....kkkqqqkppk.",
    "...kpppppppppkkkkkqqqqqpppk..",
    "....kpppppppppppppppppppkk...",
    ".....kpqqqqqqqqqqqqqqqqk.....",
    "......kpppppppqpppppppk......",
    ".......kkpppppqpppppkk.......",
    ".........kppppqppppk.........",
    "..........kkppqppkk..........",
    "............kpqpk............",
    ".............kkk.............",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
];

/** Wings down, below her body. */
const wingsDown: Frame = [
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".............................",
    ".kkk.........................",
    "kpppk.....................kk.",
    "ppkppk...................kppk",
    "kk.kppk................kkppk.",
    "...kppkkkkkkkkkkkkkkkkkpppk..",
    "....kpppppppppppppppppppkk...",
    ".....kpppppppppppqqqqqqk.....",
    "......kppppppppkqqqqqqk......",
    ".......kpppppppkqqqqqk.......",
    ".......kppppppkpqqqqqk.......",
    ".......kppppppkpqqqqqk.......",
    "........kppppkqpkqqqqk.......",
    "........kpppppkkkqqqqk.......",
    "........kppppk...kqqk........",
    "........kppppk...kqqk........",
    ".........kppk.....kqk........",
    ".........kppk.....kqk........",
    ".........kpk.......k.........",
    "..........k..................",
    ".............................",
];

/**
 * The reading progress crane on blog posts: a square of paper folded one
 * step further as you read, until it's a crane at the end. Facing left, so
 * she flies off up and to the left, into the margin and away from the
 * window's edge.
 */
export const crane: Sprite = {
    id: "crane",
    name: "Paper crane",
    tier: "character",
    scale: 2,
    key: craneKey,
    frames: {
        square,
        crease,
        creases,
        triangle,
        squareBase,
        kite,
        birdBase,
        neckAndTail,
        crane: craneFolded,
    },
};

/** Her flight when you click the finished crane: a steady wingbeat. */
export const craneFlight: Sprite = {
    id: "crane-flight",
    name: "Paper crane, flying",
    tier: "character",
    scale: 2,
    key: craneKey,
    frames: { wingsUp, wingsLevel, wingsDown },
    animations: {
        idle: [
            ["wingsUp", 110],
            ["wingsLevel", 70],
            ["wingsDown", 110],
            ["wingsLevel", 70],
        ],
    },
};
