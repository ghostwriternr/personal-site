import { choreograph, flip, type Beat, type Placement } from "../compose";
import type { AnimationStep, Frame, Sprite } from "../types";
import { dustFrames, paperBallFrames, propKey } from "./props";

// Side poses were drawn silhouette first: interior cells painted, the outline
// generated around them, then details (far legs darker, cream paws, eye).

const catKey = {
    ...propKey,
    o: "ginger",
    d: "gingerDark",
    c: "cream",
    p: "pink",
    g: "eyeOlive",
} as const;

/** Front view: sitting, facing you, tail up. Her resting pose. */
const sit: Frame = [
    "..k...k.........",
    ".kpk.kpk........",
    ".kokkkok........",
    ".kododok........",
    ".kogogok........",
    ".kocpcok.....kk.",
    "..kcccokk...kodk",
    "...kcooook..kok.",
    "...kcoooodk.kdk.",
    "...koooooodkkok.",
    "...kokoodookkdk.",
    "...kokooodookok.",
    "...kokoooodokdk.",
    "...kokooooooook.",
    "...kokoooooookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

const blink: Frame = [
    "..k...k.........",
    ".kpk.kpk........",
    ".kokkkok........",
    ".kododok........",
    ".kokokok........",
    ".kocpcok.....kk.",
    "..kcccokk...kodk",
    "...kcooook..kok.",
    "...kcoooodk.kdk.",
    "...koooooodkkok.",
    "...kokoodookkdk.",
    "...kokooodookok.",
    "...kokoooodokdk.",
    "...kokooooooook.",
    "...kokoooooookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

/** One ear flicks back. */
const ears: Frame = [
    "......k.........",
    ".k...kpk........",
    "kpkkkkok........",
    ".kododok........",
    ".kogogok........",
    ".kocpcok.....kk.",
    "..kcccokk...kodk",
    "...kcooook..kok.",
    "...kcoooodk.kdk.",
    "...koooooodkkok.",
    "...kokoodookkdk.",
    "...kokooodookok.",
    "...kokoooodokdk.",
    "...kokooooooook.",
    "...kokoooooookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

/** Tail tip flicks the other way. */
const flick: Frame = [
    "..k...k.........",
    ".kpk.kpk........",
    ".kokkkok........",
    ".kododok........",
    ".kogogok........",
    ".kocpcok...kk...",
    "..kcccokk.kdk...",
    "...kcooook..kok.",
    "...kcoooodk.kdk.",
    "...koooooodkkok.",
    "...kokoodookkdk.",
    "...kokooodookok.",
    "...kokoooodokdk.",
    "...kokooooooook.",
    "...kokoooooookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

/** Side view, facing right (as are all side poses below): standing, tail up. */
const stand: Frame = [
    "...............k..k...",
    "....k.........kokkok..",
    "...kdk........kookpok.",
    "..kok.........kodoook.",
    ".kdk.........kodoogok.",
    ".kok.........koooocpk.",
    ".kdk.kkkkkkkkkkoocck..",
    "..kokoodoodoodooook...",
    "...koooodoodooooock...",
    "...kooooooooooooock...",
    "...koooookkooooock....",
    "....koodk..kkkdook....",
    "....koodk....kdook....",
    "....koodk....kdook....",
    "....koodk....kdook....",
    "....kccdk....kdcck....",
    ".....kkk......kkk.....",
];

/** Mid-stride. Alternates with `stand` for a trot. */
const walkA: Frame = [
    "...............k..k...",
    "....k.........kokkok..",
    "...kdk........kookpok.",
    "..kok.........kodoook.",
    ".kdk.........kodoogok.",
    ".kok.........koooocpk.",
    ".kdk.kkkkkkkkkkoocck..",
    "..kokoodoodoodooook...",
    "...koooodoodooooock...",
    "...kooooooooooooock...",
    "...koooookkooooock....",
    "....koodk..kkkdook....",
    "...kookdk....kdkook...",
    "...kookdk...kdkkook...",
    "..kook.kdk..kdk.kook..",
    "..kcck.kdk.kdk..kcck..",
    "...kk...k...k....kk...",
];

/** Crouched low, bum up, head down, tail low with the tip up. */
const stalk: Frame = [
    ".......................",
    ".......................",
    ".......................",
    ".......................",
    "................k..k...",
    ".....kkkk......kokkok..",
    "....kodookk....kookpok.",
    ".k.koooodookkkkkodoook.",
    "kdkoooooooodoododoogok.",
    "kookooooodooooooooocpk.",
    ".kk.kooooooooooooocck..",
    "....koookkkkdoookkkk...",
    "....koocck..kdocck.....",
    ".....kkkk....kkkk......",
];

/** Tail tip twitches while she stalks. */
const stalkTwitch: Frame = [
    ".......................",
    ".......................",
    ".......................",
    ".......................",
    "................k..k...",
    ".....kkkk......kokkok..",
    ".k..kodookk....kookpok.",
    "kdkkoooodookkkkkodoook.",
    "kokoooooooodoododoogok.",
    "kookooooodooooooooocpk.",
    ".kk.kooooooooooooocck..",
    "....koookkkkdoookkkk...",
    "....koocck..kdocck.....",
    ".....kkkk....kkkk......",
];

/** Front paw shot out low. */
const swat: Frame = [
    ".........................",
    ".........................",
    ".........................",
    ".........................",
    "................k..k.....",
    ".....kkkk......kokkok....",
    "....kodookk....kookpok...",
    ".k.koooodookkkkkodoook...",
    "kdkoooooooodoododoogok...",
    "kookooooodooooooooocpk...",
    ".kk.kooooooooooooocck....",
    "....koookkkkdoookkkkk....",
    "....koocck..kdoccoocck...",
    ".....kkkk....kkkkkkkk....",
];

/** Gallop, stretched out. */
const gallopOut: Frame = [
    "...................k..k..",
    "..................kokkok.",
    "..................kookpok",
    "..................kodoook",
    ".kk..............kodoogok",
    "kodk...kkkkkkkkkkkoooocpk",
    ".kkokkkoodoodoodooooocck.",
    "...koooodoodoodoooocokk..",
    "....kooooooooooooocok....",
    "....koodkkkkkkkkkdook....",
    "...koodk.........kdook...",
    "..koodk...........kdook..",
    ".kccdk.............kdcck.",
    "..kkk...............kkk..",
    ".........................",
];

/** Gallop, gathered up, back arched. */
const gallopIn: Frame = [
    ".......................",
    ".................k..k..",
    "................kokkok.",
    "....k...........kookpok",
    "...kok..kkkkkk..kodoook",
    "..kdk..kodoodokkodoogok",
    "..kok.kodoodoodooooocpk",
    "...kdkooooooooooooocck.",
    "....kooooooooooooockk..",
    ".....kkkooooooooock....",
    ".......kdookkkkkoodk...",
    "........kdook.koodk....",
    ".........kdookoodk.....",
    "..........kdcccdk......",
    "...........kkkkk.......",
];

/** Crouched and bent into a C, head whipped back over her shoulder, tail tip right under her nose. */
const curl: Frame = [
    "..................",
    "........kokkok....",
    ".......kopkook....",
    "...kk..kooodok....",
    "..kodk.kogoodok...",
    ".kdkkokkpcooook...",
    "kok..kkkkccook....",
    "kdkkkooookkkk.....",
    ".koooodoodoodk....",
    "..koooodoodoook...",
    "...koooooooook....",
    "...koodkkkdook....",
    "..kcckdk.kdkcck...",
    "...kk.k...k.kk....",
];

/** Same chase, legs bunched mid-scramble, tail tip whisked out of reach. */
const curl2: Frame = [
    "..................",
    "...k..............",
    "..kok...kokkok....",
    ".kdk...kopkook....",
    "kok....kooodok....",
    "kdk....kogoodok...",
    "kok..kkkpcooook...",
    "kdkkkoookccook....",
    ".koooodookkkkk....",
    "..koooodoodoook...",
    "...koooooooook....",
    "...kdookkoodk.....",
    "..kdkkcckcckdk....",
    "...k..kk.kk.k.....",
];

/** Got it: tail tip clamped in her mouth, eyes squeezed shut. */
const caughtTail: Frame = [
    "..................",
    "........kokkok....",
    ".......kopkook....",
    "...kk..kooodok....",
    "..kodkkkokoodok...",
    ".kdkkododcooook...",
    "kok..kkkkccook....",
    "kdkkkooookkkk.....",
    ".koooodoodoodk....",
    "..koooodoodoook...",
    "...koooooooook....",
    "...koodkkkdook....",
    "..kcckdk.kdkcck...",
    "...kk.k...k.kk....",
];

/** Mid-spin, facing you, crouched, eyes on the tail swinging round. */
const curlFront: Frame = [
    "..k...k.......",
    ".kpk.kpk......",
    ".kokkkok......",
    ".kododok......",
    ".kodogok......",
    ".kocpcok..k...",
    "..kccck..kok..",
    ".kocccok..kdk.",
    "koooooook.kok.",
    "koooooookkdk..",
    "koooooooook...",
    "kookkkookk....",
    "cck...kcck....",
    "kk.....kk.....",
];

/** Mid-spin, facing away, tail flung out to the side. */
const curlBack: Frame = [
    "..k...k.......",
    ".kok.kok......",
    ".kokkkok......",
    ".kododok......",
    ".koooook......",
    ".koooook......",
    "..koook.......",
    ".kododok...kk.",
    "kodododokkkodk",
    "koododoooodkk.",
    "koooooookkk...",
    "kookkkook.....",
    "ook...kook....",
    "kk.....kk.....",
];

const { roll1, roll2 } = paperBallFrames;
const { puff, puffFading } = dustFrames;
const ball = (x: number, frame: Frame = roll1, lift = 0): Placement => ({
    frame,
    x,
    lift,
});
/** The ball held in her mouth while she sits at `x`. */
const ballInMouth = (x: number) => ball(x + 1, roll1, 6);

/** Gallop from `from` to `to` (cells), alternating the two gallop frames. */
function gallop(
    from: number,
    to: number,
    stride = 4,
    ms = 60
): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const dir = Math.sign(to - from);
    const [a, b] =
        dir > 0 ? ["gallopOut", "gallopIn"] : ["gallopOutL", "gallopInL"];
    for (let x = from, i = 0; dir * (to - x) > 0; x += dir * stride, i++) {
        steps.push([i % 2 ? b : a, ms, [x, 0]]);
    }
    return steps;
}

const idle: AnimationStep[] = [
    ["sit", 2600],
    ["blink", 140],
    ["sit", 1800],
    ["ears", 120],
    ["sit", 120],
    ["ears", 120],
    ["sit", 1600],
    ["flick", 200],
    ["sit", 200],
    ["flick", 200],
    ["sit", 1400],
    ["blink", 120],
    ["sit", 150],
    ["blink", 120],
    ["sit", 1500],
];

/** She trots back facing left, the ball in her mouth. */
const carry = (pose: Frame, x: number): Beat => ({
    ms: 110,
    pose: flip(pose),
    x,
    props: [ball(x - 3, roll1, 6)],
});

/**
 * Fetch: she drops her paper ball, it bounces and rolls away, she stalks it,
 * swats it, chases it down, and trots back with it in her mouth.
 */
const fetch = choreograph("fetch", [
    { ms: 800, pose: sit, props: [ballInMouth(0)] },
    { ms: 120, pose: blink, props: [ballInMouth(0)] },
    { ms: 400, pose: sit, props: [ballInMouth(0)] },
    { ms: 60, pose: sit, props: [ball(1, roll1, 3)] },
    { ms: 70, pose: sit, props: [ball(2, roll2)] },
    { ms: 70, pose: sit, props: [ball(4, roll1, 2)] },
    { ms: 70, pose: sit, props: [ball(6, roll2)] },
    { ms: 80, pose: sit, props: [ball(9)] },
    { ms: 90, pose: sit, props: [ball(12, roll2)] },
    { ms: 110, pose: sit, props: [ball(15)] },
    { ms: 140, pose: sit, props: [ball(18, roll2)] },
    { ms: 200, pose: sit, props: [ball(21)] },
    { ms: 160, pose: ears, props: [ball(21)] },
    { ms: 300, pose: sit, props: [ball(21)] },
    { ms: 500, pose: stalk, x: -3, props: [ball(21)] },
    { ms: 140, pose: stalkTwitch, x: -3, props: [ball(21)] },
    { ms: 140, pose: stalk, x: -3, props: [ball(21)] },
    { ms: 140, pose: stalkTwitch, x: -3, props: [ball(21)] },
    { ms: 300, pose: stalk, x: -3, props: [ball(21)] },
    { ms: 110, pose: swat, x: -1, props: [ball(21)] },
    { ms: 70, pose: swat, x: -1, props: [ball(24, roll2)] },
    { ms: 80, pose: stalk, x: -1, props: [ball(28)] },
    { ms: 70, pose: gallopOut, x: 2, props: [ball(31, roll2)] },
    { ms: 70, pose: gallopIn, x: 6, props: [ball(34)] },
    { ms: 70, pose: gallopOut, x: 10, props: [ball(37, roll2)] },
    { ms: 80, pose: gallopIn, x: 14, props: [ball(39)] },
    { ms: 300, pose: stalk, x: 18, props: [ball(40)] },
    { ms: 140, pose: stalkTwitch, x: 18, props: [ball(40)] },
    { ms: 220, pose: swat, x: 19, props: [ball(40)] },
    { ms: 280, pose: sit, x: 38, props: [ballInMouth(38)] },
    ...[36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3, 0].map((x, i) =>
        carry(i % 2 ? stand : walkA, x)
    ),
]);

const dust = (x: number, frame: Frame = puff): Placement => ({ frame, x });

/**
 * One turn of the chase, seen from the side: her side, front, other side,
 * back. She hops on the front and back views and kicks up dust on the sides.
 * Odd turns use `curl2`, so her legs scramble and the tail tip keeps escaping.
 */
const turn = (ms: number, n: number): Beat[] => {
    const side = n % 2 ? curl2 : curl;
    return [
        { ms, pose: side, props: [dust(13), dust(-5, puffFading)] },
        { ms, pose: curlFront, x: 4, lift: 1, props: [dust(13, puffFading)] },
        {
            ms,
            pose: flip(side),
            x: -1,
            props: [dust(-5), dust(13, puffFading)],
        },
        { ms, pose: curlBack, x: 4, lift: 1, props: [dust(-5, puffFading)] },
    ];
};

/**
 * Tail chase: her tail flicks and catches her eye. She whips round to stare
 * at it, lunges, misses, then spins after it, low and scrabbling, until she
 * catches it. She holds it, very pleased, lets go, and sits down dizzy.
 */
const tailChase = choreograph("tailChase", [
    { ms: 600, pose: sit },
    { ms: 160, pose: flick },
    { ms: 160, pose: sit },
    { ms: 160, pose: flick },
    { ms: 220, pose: ears },
    { ms: 700, pose: curl },
    { ms: 110, pose: curl2, x: -1 },
    { ms: 260, pose: curl },
    ...turn(90, 0),
    ...turn(70, 1),
    ...turn(70, 2),
    ...turn(70, 3),
    ...turn(100, 4),
    { ms: 900, pose: caughtTail, props: [dust(13, puffFading)] },
    { ms: 140, pose: curl2 },
    { ms: 140, pose: sit, x: 1 },
    { ms: 140, pose: sit, x: -1 },
    { ms: 140, pose: sit, x: 1 },
    { ms: 200, pose: sit },
    { ms: 120, pose: blink },
    { ms: 160, pose: sit },
    { ms: 120, pose: blink },
    { ms: 900, pose: sit },
]);

/** Zoomies: she bolts right, tears back left past where she started, and skids home. */
const zoomies: AnimationStep[] = [
    ["sit", 700],
    ["ears", 100],
    ["sit", 150],
    ...gallop(0, 44),
    ...gallop(44, -32),
    ...gallop(-32, -4),
    ["stalk", 240, [-4, 0]],
    ["sit", 400],
    ["blink", 120],
    ["sit", 900],
];

/** Very lean, 4 years old, very playful. Olive eyes. */
export const tiny: Sprite = {
    id: "tiny",
    name: "Tiny",
    tier: "character",
    scale: 3,
    key: catKey,
    frames: {
        sit,
        blink,
        ears,
        flick,
        stand,
        walkA,
        stalk,
        stalkTwitch,
        swat,
        gallopOut,
        gallopIn,
        gallopOutL: flip(gallopOut),
        gallopInL: flip(gallopIn),
        curl,
        curl2,
        caughtTail,
        curlFront,
        curlBack,
        ...fetch.frames,
        ...tailChase.frames,
    },
    animations: {
        idle,
        fetch: fetch.steps,
        tailChase: tailChase.steps,
        zoomies,
        /** How she might feel on the site: mostly calm, then sudden play. */
        life: [
            ...idle,
            ...fetch.steps,
            ...idle.slice(0, 6),
            ...tailChase.steps,
            ...idle.slice(0, 4),
            ...zoomies,
        ],
    },
};
