const colors = require("tailwindcss/colors");

module.exports = {
    important: true,
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
                "th-subtext": "var(--subtext)",
                "th-background": "var(--background)",
                "th-theme-accent": "var(--theme-accent)",
                "th-theme-accent-dark": "var(--theme-accent-dark)",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "var(--text)",
                        '[class~="lead"]': {
                            color: "var(--primary)",
                        },
                        a: {
                            color: "var(--primary)",
                        },
                        strong: {
                            color: "var(--text)",
                        },
                        "ol > li::before": {
                            color: "var(--text)",
                        },
                        "ul > li::before": {
                            backgroundColor: "var(--text)",
                        },
                        blockquote: {
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
                        "figure figcaption": {
                            color: "var(--text)",
                        },
                        code: {
                            color: "var(--text)",
                        },
                        pre: {
                            color: "var(--text)",
                            marginTop: 0,
                            marginBottom: 0,
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                        },
                        "pre code": {
                            color: "var(--text)",
                        },
                        thead: {
                            color: "var(--text)",
                        },
                        hr: {
                            borderColor: "var(--subtext)",
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
