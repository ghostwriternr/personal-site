const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./pages/**/*.[jt]s?(x)", "./components/**/*.[jt]s?(x)"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                fuchisa: colors.fuchisa,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
