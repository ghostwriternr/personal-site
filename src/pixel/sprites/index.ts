import { validateSprite } from "../render";
import type { Sprite } from "../types";
import { tiny } from "./cats";
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
import { paperBall } from "./props";
import { auto, bus } from "./vehicles";

/** Every sprite, in the order the pixel lab shows them. */
export const sprites: Sprite[] = [
    tiny,
    paperBall,
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
];

sprites.forEach(validateSprite);
