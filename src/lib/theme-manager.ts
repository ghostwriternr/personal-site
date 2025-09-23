/**
 * Theme Manager - Handles theme switching logic for the application
 */

type ThemeMode = "auto" | "light" | "dark";

const STORAGE_KEY = "theme-mode";
const MODES: ThemeMode[] = ["auto", "light", "dark"];

class ThemeManager {
    private mediaQuery: MediaQueryList;
    private elements: {
        sun: HTMLElement | null;
        moon: HTMLElement | null;
        auto: HTMLElement | null;
        button: HTMLElement | null;
    } = {
        sun: null,
        moon: null,
        auto: null,
        button: null,
    };

    constructor() {
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    }

    /**
     * Initialize the theme manager
     */
    init(): void {
        this.findElements();
        this.setupEventListeners();
        this.applyCurrentMode();
    }

    /**
     * Find and cache DOM elements
     */
    private findElements(): void {
        this.elements.sun = document.getElementById("sun-icon");
        this.elements.moon = document.getElementById("moon-icon");
        this.elements.auto = document.getElementById("auto-icon");
        this.elements.button = document.getElementById("theme-toggle");
    }

    /**
     * Setup all event listeners
     */
    private setupEventListeners(): void {
        // Theme toggle button click
        if (this.elements.button) {
            this.elements.button.addEventListener("click", () => this.toggle());
        }

        // System preference changes (only affects auto mode)
        this.mediaQuery.addEventListener("change", () => {
            if (this.getCurrentMode() === "auto") {
                this.applyCurrentMode();
            }
        });

        // Astro navigation events
        document.addEventListener("astro:before-swap", (event) => {
            const mode = this.getCurrentMode();
            const effective = this.getEffectiveMode(mode);
            if (event.newDocument) {
                event.newDocument.documentElement.setAttribute(
                    "data-theme",
                    effective
                );
            }
        });

        document.addEventListener("astro:after-swap", () => {
            this.findElements(); // Re-find elements after navigation
            this.applyCurrentMode();
        });

        document.addEventListener("astro:page-load", () => {
            this.applyCurrentMode();
        });
    }

    /**
     * Get the current theme mode from storage
     */
    getCurrentMode(): ThemeMode {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return (stored as ThemeMode) || "auto";
        } catch {
            return "auto";
        }
    }

    /**
     * Get the effective theme (resolves auto to light/dark)
     */
    private getEffectiveMode(mode: ThemeMode): "light" | "dark" {
        return mode === "auto"
            ? this.mediaQuery.matches
                ? "dark"
                : "light"
            : mode;
    }

    /**
     * Set the theme mode
     */
    setMode(mode: ThemeMode): void {
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // Ignore localStorage errors
        }
        this.applyMode(mode);
    }

    /**
     * Toggle to the next theme mode in the cycle
     */
    toggle(): void {
        const current = this.getCurrentMode();
        const currentIndex = MODES.indexOf(current);
        const nextIndex = (currentIndex + 1) % MODES.length;
        const nextMode = MODES[nextIndex];
        this.setMode(nextMode);
    }

    /**
     * Apply a theme mode (update DOM and UI)
     */
    private applyMode(mode: ThemeMode): void {
        const effective = this.getEffectiveMode(mode);
        document.documentElement.setAttribute("data-theme", effective);
        this.updateIcons(mode);
    }

    /**
     * Apply the current mode from storage
     */
    private applyCurrentMode(): void {
        const mode = this.getCurrentMode();
        this.applyMode(mode);
    }

    /**
     * Update the icon visibility and button styling
     */
    private updateIcons(mode: ThemeMode): void {
        const { sun, moon, auto, button } = this.elements;

        if (!sun || !moon || !auto || !button) {
            return; // Elements not ready yet
        }

        // Hide all icons
        sun.classList.add("hidden");
        moon.classList.add("hidden");
        auto.classList.add("hidden");

        // Remove background styling
        button.classList.remove("theme-toggle-active");

        // Show appropriate icon and styling
        if (mode === "light") {
            sun.classList.remove("hidden");
            button.classList.add("theme-toggle-active");
        } else if (mode === "dark") {
            moon.classList.remove("hidden");
            button.classList.add("theme-toggle-active");
        } else {
            // auto
            auto.classList.remove("hidden");
        }
    }
}

// Export a singleton instance
export const themeManager = new ThemeManager();

// Export types and utilities for external use
export type { ThemeMode };
export { MODES };
