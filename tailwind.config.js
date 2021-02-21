const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./pages/**/*.[jt]s?(x)", "./components/**/*.[jt]s?(x)"],
    darkMode: false,
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                home: "var(--home-bg)",
            }),
            colors: {
                "th-primary": "var(--primary)",
                "th-secondary": "var(--secondary)",
                "th-tertiary": "var(--tertiary)",
                "th-text": "var(--text)",
                "th-background": "var(--background)",
                "th-theme-bg": "var(--theme-bg)",
                "th-theme-accent": "var(--theme-accent)",
                "th-theme-accent-dark": "var(--theme-accent-dark)",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "var(--text)",
                        a: {
                            color: "var(--primary)",
                        },
                        strong: {
                            color: "var(--text)",
                        },
                        h1: {
                            color: "var(--text)",
                        },
                        h2: {
                            color: "var(--text)",
                        },
                        h3: {
                            color: "var(--text)",
                        },
                        h4: {
                            color: "var(--text)",
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
