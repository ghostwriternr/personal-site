// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
    site: "https://ghostwriternr.me",
    output: "server",
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
    integrations: [
        expressiveCode({
            themes: ["everforest-light", "rose-pine-moon"],
            themeCssSelector: (theme) => {
                // Map theme to light/dark based on theme type
                const isDark = theme.type === "dark";
                return `[data-theme='${isDark ? "dark" : "light"}']`;
            },
            defaultProps: {
                // Enable word wrap for better readability
                wrap: true,
            },
            styleOverrides: {
                // Increase code font size for better readability
                codeFontSize: "0.95rem",
            },
        }),
        mdx(),
        sitemap(),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: cloudflare({
        imageService: "compile",
        platformProxy: {
            enabled: true,
        },
    }),
});
