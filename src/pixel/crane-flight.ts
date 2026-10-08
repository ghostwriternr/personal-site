/**
 * The paper crane's flight: up and a little left, then away out of sight
 * past the top of the window. `flight` holds her flapping sprite and is
 * shown for the flight; it's hidden again when she's gone.
 */
export function flyAway(flight: HTMLElement): Animation {
    // Unhiding starts her wingbeat from the first frame.
    flight.hidden = false;
    const { top } = flight.getBoundingClientRect();
    const flying = flight.animate(
        [
            { transform: "translate(0, 0)" },
            { transform: "translate(-18px, -40px)", offset: 0.2 },
            { transform: `translate(-72px, -${top + flight.offsetHeight}px)` },
        ],
        { duration: 2400, easing: "ease-in", fill: "forwards" }
    );
    flying.onfinish = () => (flight.hidden = true);
    return flying;
}

/** Undo a flight, so she's ready to fly again. */
export function land(flight: HTMLElement, flying?: Animation): void {
    flying?.cancel();
    flight.hidden = true;
}
