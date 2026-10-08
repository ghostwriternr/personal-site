import { validateSprite } from "../render";
import type { Sprite } from "../types";
import { chandu, tiny, yoda } from "./cats";
import {
    chennaiCentral,
    gopuram,
    gopuramLight,
    lighthouse,
    lighthouseBeam,
    lighthouseBeamBlocked,
    marina,
} from "./chennai";
import {
    bigBen,
    londonEye,
    londonEyeWheel,
    shard,
    towerBridge,
} from "./london";
import { crane, craneFlight } from "./crane";
import { monstera } from "./monstera";
import { paperBall } from "./props";
import {
    cloud,
    cloudSmall,
    star,
    starBright,
    starFaint,
    starSmall,
} from "./sky";
import { auto, bus } from "./vehicles";

/** Every sprite, in the order the pixel lab shows them. */
export const sprites: Sprite[] = [
    tiny,
    paperBall,
    yoda,
    chandu,
    marina,
    lighthouse,
    lighthouseBeam,
    lighthouseBeamBlocked,
    gopuram,
    gopuramLight,
    chennaiCentral,
    bigBen,
    londonEye,
    londonEyeWheel,
    towerBridge,
    shard,
    auto,
    bus,
    crane,
    craneFlight,
    monstera,
    starFaint,
    star,
    starSmall,
    starBright,
    cloud,
    cloudSmall,
];

sprites.forEach(validateSprite);
