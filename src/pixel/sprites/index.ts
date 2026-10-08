import { validateSprite } from "../render";
import type { Sprite } from "../types";
import { tiny } from "./cats";
import { paperBall } from "./props";

/** Every sprite, in the order the pixel lab shows them. */
export const sprites: Sprite[] = [tiny, paperBall];

sprites.forEach(validateSprite);

export { paperBall, tiny };
