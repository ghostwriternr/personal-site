import type { AnimationStep, Frame } from "./types";

const TRANSPARENT = ".";

/** Mirror a frame left to right, so a pose faces the other way. */
export function flip(frame: Frame): Frame {
    return frame.map((row) => [...row].reverse().join(""));
}

/** A frame placed on a stage: `x` cells from the left, `lift` cells off the ground. */
export interface Placement {
    frame: Frame;
    x: number;
    lift?: number;
}

/**
 * Stack placements into one frame, bottom aligned to the ground. Later
 * placements draw over earlier ones. Returns the frame and the stage x of
 * its left edge.
 */
export function stack(placements: readonly Placement[]): {
    frame: Frame;
    left: number;
} {
    const left = Math.min(...placements.map((p) => p.x));
    const right = Math.max(...placements.map((p) => p.x + p.frame[0].length));
    const height = Math.max(
        ...placements.map((p) => p.frame.length + (p.lift ?? 0))
    );
    const rows = Array.from({ length: height }, () =>
        Array<string>(right - left).fill(TRANSPARENT)
    );
    for (const { frame, x, lift = 0 } of placements) {
        const top = height - lift - frame.length;
        frame.forEach((row, y) => {
            [...row].forEach((cell, i) => {
                if (cell !== TRANSPARENT) rows[top + y][x - left + i] = cell;
            });
        });
    }
    return { frame: rows.map((row) => row.join("")), left };
}

/** One beat of a scene: an actor's pose and position, plus props on the stage. */
export interface Beat {
    ms: number;
    pose: Frame;
    /** Actor's stage x in cells; 0 is the sprite's resting position. */
    x?: number;
    /** Actor's height off the ground in cells. Props stay where they are. */
    lift?: number;
    props?: readonly Placement[];
}

/**
 * Turn a scene's beats into frames and animation steps. Each beat becomes a
 * frame (identical beats share one) named `${name}__${n}`; the pixel lab
 * hides these generated frames from its frame list.
 *
 * Every frame shares the scene's stage origin, so each step has the same
 * offset and positions live in the frames themselves. A per-step offset
 * would be a transform animation, which the browser can run out of step
 * with the frame swaps, making props jitter as the actor moves.
 */
export function choreograph(
    name: string,
    beats: readonly Beat[]
): { frames: Record<string, Frame>; steps: AnimationStep[] } {
    const staged = beats.map(({ pose, x = 0, lift = 0, props = [] }) =>
        stack([{ frame: pose, x, lift }, ...props])
    );
    const origin = Math.min(...staged.map(({ left }) => left));
    const frames: Record<string, Frame> = {};
    const names = new Map<string, string>();
    const steps = staged.map(({ frame: stagedFrame, left }, i) => {
        const pad = TRANSPARENT.repeat(left - origin);
        const frame = stagedFrame.map((row) => pad + row);
        const id = frame.join("\n");
        let frameName = names.get(id);
        if (!frameName) {
            frameName = `${name}__${names.size}`;
            names.set(id, frameName);
            frames[frameName] = frame;
        }
        return [frameName, beats[i].ms, [origin, 0]] as const;
    });
    return { frames, steps };
}
