/** Reading counts as done a little before the very end. */
export const READ = 0.98;

/**
 * How far through `article` the reader is: how much of it has come into
 * view, from 0 before its top is on screen to 1 when its end is. A poem that
 * starts halfway down the window has begun as soon as you can see it; one
 * that fits in the window is read as soon as it's open.
 */
export function readingProgress(article: Element): number {
    const { top, height } = article.getBoundingClientRect();
    if (height <= 0) return 1;
    return Math.min(Math.max((innerHeight - top) / height, 0), 1);
}

/** Which of `count` stages to show at progress `p`: the last only once read. */
export function stageAt(p: number, count: number): number {
    return p >= READ ? count - 1 : Math.floor((p / READ) * (count - 1));
}

/** Call `update` at most once a frame while the window scrolls or resizes, and once now. */
export function onScrollFrame(update: () => void): void {
    let queued = false;
    const schedule = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            update();
        });
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    update();
}
