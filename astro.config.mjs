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
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport",
    },
    integrations: [
        expressiveCode({
            themes: ['rose-pine-dawn', 'dracula-soft'],
            defaultProps: {
                // Enable word wrap for better readability
                wrap: true,
            },
            styleOverrides: {
                // Increase code font size for better readability
                codeFontSize: '0.95rem',
            },
        }),
        mdx(),
        sitemap()
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
});