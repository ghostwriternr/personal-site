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

// Yoda and Chandu share Tiny's front-view sitting pose, recoloured, so the
// three read as one family on the page; their side poses are their own.

// ---------------------------------------------------------------- Yoda

const yodaKey = {
    k: "ink",
    w: "calicoWhite",
    e: "calicoWhiteShade",
    o: "calicoOrange",
    b: "calicoBlack",
    p: "pink",
    y: "eyeOliveYellow",
    h: "sisal",
    H: "sisalShade",
    s: "carpet",
} as const;

/** Front view, sitting. Calico: white chest, legs and belly, and a white blaze between her eyes; black round one eye and orange round the other; black and orange down her sides; a black tail with an orange band and a white tip. */
const yodaSit: Frame = [
    "..k...k.........",
    ".bpb.opo........",
    ".kbkkkok........",
    ".kbbwook........",
    ".kbywyok........",
    ".kwwpwwk.....kk.",
    "..kwwwwkk...kowk",
    "...kwwbbbb..kok.",
    "...kwwbbbbb.kbk.",
    "...kwwbbbbbbkbk.",
    "...kwkboooookbk.",
    "...kwkboooookbk.",
    "...kwkooobbokbk.",
    "...kwkoobooobbk.",
    "...kwkwwoooobkk.",
    "...kwwkwwwwwbk..",
    "....kkkkkkkkk...",
];

const yodaBlink: Frame = [
    "..k...k.........",
    ".bpb.opo........",
    ".kbkkkok........",
    ".kbbwook........",
    ".kbkwkok........",
    ".kwwpwwk.....kk.",
    "..kwwwwkk...kowk",
    "...kwwbbbb..kok.",
    "...kwwbbbbb.kbk.",
    "...kwwbbbbbbkbk.",
    "...kwkboooookbk.",
    "...kwkboooookbk.",
    "...kwkooobbokbk.",
    "...kwkoobooobbk.",
    "...kwkwwoooobkk.",
    "...kwwkwwwwwbk..",
    "....kkkkkkkkk...",
];

const yodaEars: Frame = [
    "......k.........",
    ".b...opo........",
    "kpbkkkok........",
    ".kbbwook........",
    ".kbywyok........",
    ".kwwpwwk.....kk.",
    "..kwwwwkk...kowk",
    "...kwwbbbb..kok.",
    "...kwwbbbbb.kbk.",
    "...kwwbbbbbbkbk.",
    "...kwkboooookbk.",
    "...kwkboooookbk.",
    "...kwkooobbokbk.",
    "...kwkoobooobbk.",
    "...kwkwwoooobkk.",
    "...kwwkwwwwwbk..",
    "....kkkkkkkkk...",
];

const yodaFlick: Frame = [
    "..k...k.........",
    ".bpb.opo........",
    ".kbkkkok........",
    ".kbbwook........",
    ".kbywyok........",
    ".kwwpwwk...kk...",
    "..kwwwwkk.kwk...",
    "...kwwbbbb..kok.",
    "...kwwbbbbb.kok.",
    "...kwwbbbbbbkbk.",
    "...kwkboooookbk.",
    "...kwkboooookbk.",
    "...kwkooobbokbk.",
    "...kwkoobooobbk.",
    "...kwkwwoooobkk.",
    "...kwwkwwwwwbk..",
    "....kkkkkkkkk...",
];

/** Side view, facing right: standing, looking at her scratch post. */
const yodaStand: Frame = [
    "...............k..k...",
    "....k.........kokkbk..",
    "...kwk........kowkpbk.",
    "..kok.........kooowwk.",
    ".kok.........kwwooywk.",
    ".kbk.........kwwwwwpk.",
    ".kbk.kkkkkkkkkkwwwwk..",
    "..kbooooobbbbbbbbwk...",
    "...koooobobbbbbbwwk...",
    "...koooooobboobbwwk...",
    "...kwwwwwwwwwwwwwk....",
    "....kwwekkkkkkewwk....",
    "....kwwek....kewwk....",
    "....kwwek....kewwk....",
    "....kwwek....kewwk....",
    "....kwwek....kewwk....",
    ".....kkk......kkk.....",
];

/** Mid-stride, facing right: on her way to the post. */
const yodaWalk: Frame = [
    "...............k..k...",
    "....k.........kokkbk..",
    "...kwk........kowkbbk.",
    "..kok.........kooowwk.",
    ".kok.........kweooywk.",
    ".kbk.........kwwwwwpk.",
    ".kbk.kkkkkkkkkkwwwwk..",
    "..kbkoooobbbbbbbbwk...",
    "...koooobobbbbbbwwk...",
    "...koooooobboobbwwk...",
    "...kwwwwwkkwwwwwwk....",
    "....kwwek..kkkewwk....",
    "...kwwkek....kekwwk...",
    "...kwwkek...kekkwwk...",
    "..kwwk.kek..kek.kwwk..",
    "..kwwk.kek.kek..kwwk..",
    "...kk...k...k....kk...",
];

/**
 * Stretched up her post on her hind legs, near paw high and far paw low, claws
 * in. The post is part of these frames, 21 cells in.
 */
const yodaScratch: Frame = [
    "......................kkkkkk.",
    ".....................kssssssk",
    "......................kkkkkk.",
    "......................khHhHk.",
    "....................kkkHhHhk.",
    "...................kwwkkHhHk.",
    "...................kwwkHhHhk.",
    "..................kwwwkkHhHk.",
    "..................kwwkkHhHhk.",
    ".................kwwk.khHhHk.",
    ".........k..k....kwwk.kHhHhk.",
    "........kokkbk..kwwkkkkhHhHk.",
    "........kowkpbk.kwwkeekkhHhk.",
    "........kwoowwkkwwkkeekhHhHk.",
    ".......kwwwoywkkwwkeeekkhHhk.",
    ".......kwwwwwpkwwkeeekkhHhHk.",
    "........kwwwwwkwwkekk.kHhHhk.",
    ".......kbbbbbwwwkkk...khHhHk.",
    ".......kbbbbbwkkk.....kHhHhk.",
    "......kbbbbbbwk.......khHhHk.",
    "......kbbbbbwk........kHhHhk.",
    ".....kbbbbbbk.........khHhHk.",
    ".....kbbbbbbk.........kHhHhk.",
    "....koooobok..........khHhHk.",
    "....kooooook..........kHhHhk.",
    "...kooboook...........khHhHk.",
    "..koooooook...........kHhHhk.",
    "k.koobooook..........kkkkkkkk",
    "wkkoooooook..........kssssssk",
    "oobkkkwwwwk..........kkkkkkkk",
];

/** Near paw dragging down the sisal, claws trailing; far paw sliding lower. */
const yodaScratchDrag: Frame = [
    "......................kkkkkk.",
    ".....................kssssssk",
    "......................kkkkkk.",
    "......................khHhHk.",
    "......................kHhHhk.",
    "......................khkhHk.",
    "......................kkhHhk.",
    "....................kkkhHhHk.",
    "...................kwwkkhHhk.",
    "...................kwwkhHhHk.",
    ".........k..k.....kwwwkkhHhk.",
    "........kokkbk...kwwkkkhHhHk.",
    "........kowkpbk..kwwkkkHhHhk.",
    "........kwoowwk.kwwkeekkHhHk.",
    ".......kwwwoywkkwwkkeekHhHhk.",
    ".......kwwwwwpkkwwkeeekkHhHk.",
    "........kwwwwwkwwkeekkkHhHhk.",
    ".......kbbbbbwwwkekk..khHhHk.",
    ".......kbbbbbwkkkk....kHhHhk.",
    "......kbbbbbbwkk......khHhHk.",
    "......kbbbbbwk........kHhHhk.",
    ".....kbbbbbbk.........khHhHk.",
    ".....kbbbbbbk.........kHhHhk.",
    "....koooobok..........khHhHk.",
    "....kooooook..........kHhHhk.",
    "...kooboook...........khHhHk.",
    "..koooooook...........kHhHhk.",
    "k.koobooook..........kkkkkkkk",
    "wkkoooooook..........kssssssk",
    "oobkkkwwwwk..........kkkkkkkk",
];

/** Paws swapped: far paw reaches high, near paw low. */
const yodaScratch2: Frame = [
    "......................kkkkkk.",
    ".....................kssssssk",
    "......................kkkkkk.",
    "......................khHhHk.",
    "....................kkkHhHhk.",
    "...................keekkHhHk.",
    "...................keekHhHhk.",
    "..................keeekkHhHk.",
    "..................keekkHhHhk.",
    ".................keek.khHhHk.",
    ".........k..k....keek.kHhHhk.",
    "........kokkbk..keekkkkhHhHk.",
    "........kowkpbk.keekwwkkhHhk.",
    "........kwoowwkkeekkwwkhHhHk.",
    ".......kwwwoywkkekkwwwkkhHhk.",
    ".......kwwwwwpkkkwwwwkkhHhHk.",
    "........kwwwwwkwwwwkk.kHhHhk.",
    ".......kbbbbbwwwwkk...khHhHk.",
    ".......kbbbbbwwkk.....kHhHhk.",
    "......kbbbbbbwk.......khHhHk.",
    "......kbbbbbwk........kHhHhk.",
    ".....kbbbbbbk.........khHhHk.",
    ".....kbbbbbbk.........kHhHhk.",
    "....koooobok..........khHhHk.",
    "....kooooook..........kHhHhk.",
    "...kooboook...........khHhHk.",
    "..koooooook...........kHhHhk.",
    "k.koobooook..........kkkkkkkk",
    "wkkoooooook..........kssssssk",
    "oobkkkwwwwk..........kkkkkkkk",
];

/** Far paw dragging down. */
const yodaScratch2Drag: Frame = [
    "......................kkkkkk.",
    ".....................kssssssk",
    "......................kkkkkk.",
    "......................khHhHk.",
    "......................kHhHhk.",
    "......................khkhHk.",
    "......................kkhHhk.",
    "....................kkkhHhHk.",
    "...................keekkhHhk.",
    "...................keekhHhHk.",
    ".........k..k.....keeekkhHhk.",
    "........kokkbk...keekkkhHhHk.",
    "........kowkpbk..keekkkHhHhk.",
    "........kwoowwk.keekwwkkHhHk.",
    ".......kwwwoywkkeekkwwkHhHhk.",
    ".......kwwwwwpkkkkwwwwkkHhHk.",
    "........kwwwwwkkwwwwkkkHhHhk.",
    ".......kbbbbbwwwwwkk..khHhHk.",
    ".......kbbbbbwwwkk....kHhHhk.",
    "......kbbbbbbwkk......khHhHk.",
    "......kbbbbbwk........kHhHhk.",
    ".....kbbbbbbk.........khHhHk.",
    ".....kbbbbbbk.........kHhHhk.",
    "....koooobok..........khHhHk.",
    "....kooooook..........kHhHhk.",
    "...kooboook...........khHhHk.",
    "..koooooook...........kHhHhk.",
    "k.koobooook..........kkkkkkkk",
    "wkkoooooook..........kssssssk",
    "oobkkkwwwwk..........kkkkkkkk",
];

/** Her scratch post: sisal rope between a carpeted top and base, taller than she is when she stretches up it. */
const scratchPost: Frame = [
    ".kkkkkk.",
    "kssssssk",
    ".kkkkkk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    ".khHhHk.",
    ".kHhHhk.",
    "kkkkkkkk",
    "kssssssk",
    "kkkkkkkk",
];

/** Where the post stands, in cells from where she sits. */
const POST_X = 30;
const withPost = (beat: Omit<Beat, "props">): Beat => ({
    ...beat,
    props: [{ frame: scratchPost, x: POST_X }],
});
/** Side view, lined up with her sitting pose. */
const sideX = -3;
/** Standing, her nose at the post. */
const standX = POST_X - 21;
/** The scratching frames include the post. */
const scratchX = POST_X - 21;

const idleBeats: Beat[] = (
    [
        [yodaSit, 2400],
        [yodaBlink, 140],
        [yodaSit, 1800],
        [yodaEars, 120],
        [yodaSit, 120],
        [yodaEars, 120],
        [yodaSit, 1600],
        [yodaFlick, 200],
        [yodaSit, 200],
        [yodaFlick, 200],
        [yodaSit, 1400],
    ] as const
).map(([pose, ms]) => withPost({ pose, ms }));
const yodaIdle = choreograph("idle", idleBeats);

/** Walk from `from` to `to` (cells), two cells a step. */
const trot = (from: number, to: number): Beat[] => {
    const dir = Math.sign(to - from);
    const beats: Beat[] = [];
    for (let x = from, i = 0; dir * (to - x) > 0; x += 2 * dir, i++) {
        const pose = i % 2 ? yodaStand : yodaWalk;
        beats.push(withPost({ pose: dir > 0 ? pose : flip(pose), ms: 150, x }));
    }
    return beats;
};

const clawCycle = [
    yodaScratch,
    yodaScratchDrag,
    yodaScratch2,
    yodaScratch2Drag,
];
/** Each paw in turn reaches high and drags down the post, `times` strokes. */
const claws = (times: number, ms: number): Beat[] =>
    Array.from({ length: times * 2 }, (_, i) => ({
        pose: clawCycle[i % 4],
        ms,
        x: scratchX,
    }));

/**
 * Scratch: she glances at her post, walks over, stretches up it on her hind
 * legs with both front paws and claws with them in turn, pauses at full
 * stretch, claws some more, then walks back and sits, satisfied.
 */
const scratchBeats: Beat[] = [
    withPost({ pose: yodaSit, ms: 500 }),
    withPost({ pose: yodaEars, ms: 150 }),
    withPost({ pose: yodaSit, ms: 300 }),
    ...trot(sideX, standX),
    withPost({ pose: yodaStand, ms: 250, x: standX }),
    { pose: yodaScratch, ms: 350, x: scratchX },
    ...claws(5, 120),
    { pose: yodaScratch, ms: 700, x: scratchX },
    ...claws(4, 120),
    { pose: yodaScratch, ms: 300, x: scratchX },
    withPost({ pose: flip(yodaStand), ms: 250, x: standX }),
    ...trot(standX, sideX),
    withPost({ pose: yodaSit, ms: 600 }),
    withPost({ pose: yodaBlink, ms: 160 }),
    withPost({ pose: yodaSit, ms: 800 }),
];
const yodaScratching = choreograph("scratch", scratchBeats);
/** One scene, so idle and scratch share a stage and the post never shifts between them. */
const yodaLife = choreograph("life", [...idleBeats, ...scratchBeats]);

/** Seven years old, calico, playful. Olive-yellow eyes. She loves her scratch post. */
export const yoda: Sprite = {
    id: "yoda",
    name: "Yoda",
    tier: "character",
    scale: 3,
    key: yodaKey,
    frames: {
        sit: yodaSit,
        blink: yodaBlink,
        ears: yodaEars,
        flick: yodaFlick,
        stand: yodaStand,
        walk: yodaWalk,
        scratch: yodaScratch,
        scratchDrag: yodaScratchDrag,
        scratch2: yodaScratch2,
        scratch2Drag: yodaScratch2Drag,
        ...yodaIdle.frames,
        ...yodaScratching.frames,
        ...yodaLife.frames,
    },
    animations: {
        idle: yodaIdle.steps,
        scratch: yodaScratching.steps,
        life: yodaLife.steps,
    },
};

// ---------------------------------------------------------------- Chandu

const chanduKey = {
    k: "ink",
    o: "tabby",
    d: "tabbyStripe",
    c: "tabbyLight",
    g: "eyeGreenGold",
    n: "noseBrown",
} as const;

/** Front view, sitting. Mackerel tabby: grey-brown with narrow dark bars down her sides, an M on her forehead, a ringed tail, a brown nose. */
const chanduSit: Frame = [
    "..k...k.........",
    ".kck.kck........",
    ".kokkkok........",
    ".kododok........",
    ".kogogok........",
    ".kocncok.....kk.",
    "..kcccokk...kodk",
    "...kcoodod..kok.",
    "...kcoodood.kdk.",
    "...koooodookkok.",
    "...kokdoododkdk.",
    "...kokodododkok.",
    "...kokodoodokdk.",
    "...kokoodoooook.",
    "...kokooodoookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

const chanduBlink: Frame = [
    "..k...k.........",
    ".kck.kck........",
    ".kokkkok........",
    ".kododok........",
    ".kokokok........",
    ".kocncok.....kk.",
    "..kcccokk...kodk",
    "...kcoodod..kok.",
    "...kcoodood.kdk.",
    "...koooodookkok.",
    "...kokdoododkdk.",
    "...kokodododkok.",
    "...kokodoodokdk.",
    "...kokoodoooook.",
    "...kokooodoookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

const chanduEars: Frame = [
    "......k.........",
    ".k...kck........",
    "kckkkkok........",
    ".kododok........",
    ".kogogok........",
    ".kocncok.....kk.",
    "..kcccokk...kodk",
    "...kcoodod..kok.",
    "...kcoodood.kdk.",
    "...koooodookkok.",
    "...kokdoododkdk.",
    "...kokodododkok.",
    "...kokodoodokdk.",
    "...kokoodoooook.",
    "...kokooodoookk.",
    "...kcckccooook..",
    "....kkkkkkkkk...",
];

/** Side view, facing right: a stroll in four frames. Strides are 0 and 2, passing steps 1 and 3. She's fuller than Tiny, with an older cat's belly pouch. */
const chanduWalk0: Frame = [
    "...............k..k...",
    "..............kokkok..",
    "..............kookcok.",
    "...k..........kodoook.",
    "..kdk........kododgok.",
    ".kdk.........koooocnk.",
    ".kok.kkkkkkkkkkoocck..",
    ".kdkkddddddddddddok...",
    "..kooddodoodododock...",
    "...kodddoodoododock...",
    "...kodddodooooodcck...",
    "....kkdooooooodkkk....",
    "....koodkkkkkkdook....",
    "...kookdk....kdkook...",
    "...kookkdk..kdk.kook..",
    "..kcck.kdk..kdk.kcck..",
    "...kk...k....k...kk...",
];

const chanduWalk1: Frame = [
    "...............k..k...",
    "..............kokkok..",
    "..............kookcok.",
    "...k..........kodoook.",
    "..kdk........kododgok.",
    ".kdk.........koooocnk.",
    ".kok.kkkkkkkkkkoocck..",
    ".kdkkddddddddddddok...",
    "..kooddodoodododock...",
    "...kodddoodoododock...",
    "...kodddodooooodcck...",
    "....kkdooooooodkkk....",
    "....koodkkkkkkdook....",
    "....koodk....kdook....",
    "....koodk....kdook....",
    "....kccdk....kdcck....",
    ".....kkk......kkk.....",
];

const chanduWalk2: Frame = [
    "...............k..k...",
    "..............kokkok..",
    "..............kookcok.",
    "...k..........kodoook.",
    "..kdk........kododgok.",
    ".kdk.........koooocnk.",
    ".kok.kkkkkkkkkkoocck..",
    ".kdkkddddddddddddok...",
    "..kooddodoodododock...",
    "...kodddoodoododock...",
    "...kodddodooooodcck...",
    "....kkdooooooodkkk....",
    "....kdookkkkkkkoodk...",
    "....kdkook....koodk...",
    "...kdk.kook..kookkdk..",
    "...kdk.kcck..kcckkdk..",
    "....k...kk....kk..k...",
];

const chanduWalk3: Frame = [
    "...............k..k...",
    "..............kokkok..",
    "..............kookcok.",
    "...k..........kodoook.",
    "..kdk........kododgok.",
    ".kdk.........koooocnk.",
    ".kok.kkkkkkkkkkoocck..",
    ".kdkkddddddddddddok...",
    "..kooddodoodododock...",
    "...kodddoodoododock...",
    "...kodddodooooodcck...",
    "....kkdooooooodkkk....",
    ".....koodkkkkdook.....",
    ".....koodk..kdook.....",
    ".....koodk..kdook.....",
    ".....kccdk..kdcck.....",
    "......kkk....kkk......",
];

/** The big stretch, part one: rump high on straight hind legs, her back one long arch down to her chest and chin on the floor, front legs flat out ahead, tail up. */
const chanduStretch: Frame = [
    ".kok..........................",
    "kdk.kkk.......................",
    "kokkodok......................",
    ".koddkk.......................",
    "..koodk.......................",
    "..kooodk......................",
    "..koooodk.....................",
    "..kooooddk..........k..k......",
    "...kooododkk.......kokkok.....",
    "...kooodooddk......kookcok....",
    "...koodooododkkk...koooook....",
    "...koodkkododdddkkkoooogok....",
    "...koodk.koodododddddoocck....",
    "...koodk..kkoodoodooooockkkkk.",
    "...koodk....koododoooooooooook",
    "...kccdk.....kkkkkooodoodoocck",
    "....kkk...........kkkkkkkkkkk.",
];

/** Part two: one hind leg stretched out behind her. */
const chanduStretch2: Frame = [
    "..................k..k..",
    ".................kokkok.",
    ".................kookcok",
    "...k.............koooook",
    "..kdk...........koooogok",
    ".kdk............kooooonk",
    ".kok.kkkkkkkkkkkkkooook.",
    ".kdkkddddddddddddokkkk..",
    "..kooddodoodododook.....",
    "...kodddoodoododook.....",
    "...kodddodooooodook.....",
    "...koodooooooodkkk......",
    "kkkoooookkkkkkkoook.....",
    "coookkkook....koodk.....",
    "kkkk...kook...koodk.....",
    ".......kcck...kocck.....",
    "........kk.....kkk......",
];

const chanduIdle: AnimationStep[] = [
    ["sit", 3000],
    ["blink", 500],
    ["sit", 2200],
    ["ears", 120],
    ["sit", 2600],
    ["blink", 600],
    ["sit", 1800],
];

const WALK_X = -3;
/** Walk from `from` to `to` (cells), one cell per frame, at a stroll. */
function walk(from: number, to: number, ms = 200): AnimationStep[] {
    const dir = Math.sign(to - from);
    const frames =
        dir > 0
            ? ["walk0", "walk1", "walk2", "walk3"]
            : ["walkL0", "walkL1", "walkL2", "walkL3"];
    const steps: AnimationStep[] = [];
    for (let x = from, i = 0; x !== to; x += dir, i++) {
        steps.push([frames[i % 4], ms, [x, 0]]);
    }
    return steps;
}

const STRETCH_AT = WALK_X + 20;

/**
 * Stroll: she gets up and strolls across the room, stops for a big stretch,
 * front then back, and strolls back to sit down again.
 */
const stroll: AnimationStep[] = [
    ["sit", 600],
    ...walk(WALK_X, STRETCH_AT),
    ["walk1", 400, [STRETCH_AT, 0]],
    ["stretch", 1800, [STRETCH_AT + 1, 0]],
    ["stretch2", 1400, [STRETCH_AT, 0]],
    ["walk1", 500, [STRETCH_AT, 0]],
    ...walk(STRETCH_AT, WALK_X),
    ["sit", 500],
    ["blink", 500],
    ["sit", 900],
];

/** Ten years old, mackerel tabby, very calm. She strolls round the house and does big stretches. */
export const chandu: Sprite = {
    id: "chandu",
    name: "Chandu",
    tier: "character",
    scale: 3,
    key: chanduKey,
    frames: {
        sit: chanduSit,
        blink: chanduBlink,
        ears: chanduEars,
        walk0: chanduWalk0,
        walk1: chanduWalk1,
        walk2: chanduWalk2,
        walk3: chanduWalk3,
        walkL0: flip(chanduWalk0),
        walkL1: flip(chanduWalk1),
        walkL2: flip(chanduWalk2),
        walkL3: flip(chanduWalk3),
        stretch: chanduStretch,
        stretch2: chanduStretch2,
    },
    animations: {
        idle: chanduIdle,
        stroll,
        life: [...chanduIdle, ...stroll],
    },
};
