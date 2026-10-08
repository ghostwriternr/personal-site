/**
 * Hands for the pixel clock faces on Chennai Central and Big Ben. Each dial
 * is 7×7 cells with the centre at (3, 3): a 3-cell minute hand and a 2-cell
 * hour hand, drawn as straight pixel lines.
 */

type Cell = readonly [x: number, y: number];

const CENTRE = 3;

/** The hour and minute right now in `timeZone` (an IANA name). */
export function timeIn(
    timeZone: string,
    date = new Date()
): { hours: number; minutes: number } {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    }).formatToParts(date);
    const part = (type: string) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0);
    return { hours: part("hour"), minutes: part("minute") };
}

/** Cells on a straight line from the centre, `length` cells long, at `degrees` clockwise from 12. */
function hand(degrees: number, length: number): Cell[] {
    const radians = (degrees * Math.PI) / 180;
    const x1 = CENTRE + Math.round(length * Math.sin(radians));
    const y1 = CENTRE - Math.round(length * Math.cos(radians));
    const steps = Math.max(Math.abs(x1 - CENTRE), Math.abs(y1 - CENTRE));
    return Array.from({ length: steps + 1 }, (_, i) => {
        const t = steps === 0 ? 0 : i / steps;
        return [
            Math.round(CENTRE + (x1 - CENTRE) * t),
            Math.round(CENTRE + (y1 - CENTRE) * t),
        ] as const;
    });
}

/** Cells covered by the hands at the given time. */
export function clockHands(hours: number, minutes: number): Cell[] {
    const cells = [
        ...hand((hours % 12) * 30 + minutes / 2, 2),
        ...hand(minutes * 6, 3),
    ];
    const seen = new Set<string>();
    return cells.filter(([x, y]) => {
        const key = `${x},${y}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
