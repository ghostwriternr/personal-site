/**
 * Theme Manager - Handles theme switching logic for the application
 */

type ThemeMode = "auto" | "light" | "dark";

const STORAGE_KEY = "theme-mode";
const MODES: ThemeMode[] = ["auto", "light", "dark"];

class ThemeManager {
    private mediaQuery: MediaQueryList;
    private button: HTMLElement | null = null;
    private lastAppliedMode: string | null = null;

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
    private findElements(): boolean {
        const newButton = document.getElementById("theme-toggle");
        const buttonChanged = this.button !== newButton;
        this.button = newButton;
        return buttonChanged;
    }

    /**
     * Setup all event listeners
     */
    private setupEventListeners(): void {
        // Theme toggle button click
        if (this.button) {
            this.button.addEventListener("click", () => this.toggle());
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
                event.newDocument.documentElement.setAttribute(
                    "data-theme-mode",
                    mode
                );
            }
        });

        document.addEventListener("astro:after-swap", () => {
            const elementsChanged = this.findElements();
            if (elementsChanged) {
                this.applyCurrentMode();
            }
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
        document.documentElement.setAttribute("data-theme-mode", mode);
    }

    /**
     * Apply the current mode from storage
     */
    private applyCurrentMode(): void {
        const mode = this.getCurrentMode();
        const effective = this.getEffectiveMode(mode);
        const modeKey = `${mode}-${effective}`;

        // Skip if we're applying the same mode that's already applied
        if (this.lastAppliedMode === modeKey) {
            return;
        }

        this.lastAppliedMode = modeKey;
        this.applyMode(mode);
    }
}

// Export a singleton instance
export const themeManager = new ThemeManager();

// Export types and utilities for external use
export type { ThemeMode };
export { MODES };
