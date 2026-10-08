import { palette, type PaletteColor } from "./palette";
import type { AnimationStep, Frame, Sprite } from "./types";

const TRANSPARENT = ".";

export interface Run {
    x: number;
    y: number;
    width: number;
}

/** Horizontal runs of same-coloured cells, grouped by colour. */
export type ColorRuns = { color: string; runs: Run[] }[];

/** The resting frame's size, which is the sprite's layout box. */
export function frameSize(sprite: Sprite): { width: number; height: number } {
    const first = Object.values(sprite.frames)[0];
    return { width: first[0].length, height: first.length };
}

/** Throws a descriptive error if a sprite's frames or animations are malformed. */
export function validateSprite(sprite: Sprite): void {
    for (const [name, frame] of Object.entries(sprite.frames)) {
        const width = frame[0]?.length ?? 0;
        if (width === 0) {
            throw new Error(`Sprite "${sprite.id}" frame "${name}" is empty.`);
        }
        frame.forEach((row, y) => {
            if (row.length !== width) {
                throw new Error(
                    `Sprite "${sprite.id}" frame "${name}" row ${y} is ${row.length} cells wide; expected ${width}: "${row}"`
                );
            }
            for (const cell of row) {
                if (cell !== TRANSPARENT && !(cell in sprite.key)) {
                    throw new Error(
                        `Sprite "${sprite.id}" frame "${name}" row ${y} uses "${cell}", which is not in its key.`
                    );
                }
            }
        });
    }
    for (const [name, steps] of Object.entries(sprite.animations ?? {})) {
        for (const [frame] of steps) {
            if (!(frame in sprite.frames)) {
                throw new Error(
                    `Sprite "${sprite.id}" animation "${name}" uses missing frame "${frame}".`
                );
            }
        }
    }
}

/** How far a frame sits above the resting frame's top, so both share a ground line. */
export function frameTop(sprite: Sprite, frame: Frame): number {
    return frameSize(sprite).height - frame.length;
}

/**
 * How many cells an animation reaches beyond the sprite's layout box on each
 * side. Use it to leave room around a sprite that runs or hops.
 */
export function animationBounds(
    sprite: Sprite,
    steps: readonly AnimationStep[]
): { left: number; right: number; top: number; bottom: number } {
    const rest = frameSize(sprite);
    const bounds = { left: 0, right: 0, top: 0, bottom: 0 };
    for (const [name, , [dx, dy] = [0, 0]] of steps) {
        const frame = sprite.frames[name];
        const top = frameTop(sprite, frame) + dy;
        bounds.left = Math.max(bounds.left, -dx);
        bounds.right = Math.max(
            bounds.right,
            dx + frame[0].length - rest.width
        );
        bounds.top = Math.max(bounds.top, -top);
        bounds.bottom = Math.max(
            bounds.bottom,
            top + frame.length - rest.height
        );
    }
    return bounds;
}

export function colorRuns(sprite: Sprite, frame: Frame): ColorRuns {
    const byColor = new Map<PaletteColor, Run[]>();
    frame.forEach((row, y) => {
        let x = 0;
        while (x < row.length) {
            const cell = row[x];
            let end = x + 1;
            while (end < row.length && row[end] === cell) end++;
            if (cell !== TRANSPARENT) {
                const color = sprite.key[cell];
                const runs = byColor.get(color) ?? [];
                runs.push({ x, y, width: end - x });
                byColor.set(color, runs);
            }
            x = end;
        }
    });
    return [...byColor].map(([name, runs]) => ({ color: palette[name], runs }));
}

/**
 * CSS keyframes that show each frame of an animation only during its steps,
 * plus a keyframe that moves the sprite when any step has an offset.
 */
export function animationCss(
    keyframePrefix: string,
    steps: readonly AnimationStep[]
): {
    css: string;
    total: number;
    keyframes: Map<string, string>;
    moveKeyframe?: string;
} {
    const total = steps.reduce((sum, [, ms]) => sum + ms, 0);
    const pct = (at: number) => `${+((at / total) * 100).toFixed(4)}%`;
    const windows = new Map<string, [number, number][]>();
    const moves: string[] = [];
    let at = 0;
    for (const [frame, ms, [dx, dy] = [0, 0]] of steps) {
        const list = windows.get(frame) ?? [];
        list.push([at, at + ms]);
        windows.set(frame, list);
        moves.push(`${pct(at)}{transform:translate(${dx}px,${dy}px)}`);
        at += ms;
    }
    const keyframes = new Map<string, string>();
    let css = "";
    for (const [frame, spans] of windows) {
        const name = `${keyframePrefix}-${frame}`;
        keyframes.set(frame, name);
        const stops = [`0%{visibility:hidden}`];
        for (const [start, end] of spans) {
            stops.push(`${pct(start)}{visibility:visible}`);
            stops.push(`${pct(end)}{visibility:hidden}`);
        }
        css += `@keyframes ${name}{${stops.join("")}}`;
    }
    const moved = steps.some(
        ([, , offset]) => offset && (offset[0] || offset[1])
    );
    if (!moved) return { css, total, keyframes };
    const moveKeyframe = `${keyframePrefix}-move`;
    css += `@keyframes ${moveKeyframe}{${moves.join("")}}`;
    return { css, total, keyframes, moveKeyframe };
}
