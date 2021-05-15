import { IconSun, IconMoonStars } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return theme === "light" ? (
        <IconSun size={30} onClick={toggleTheme} className="cursor-pointer" />
    ) : (
        <IconMoonStars size={30} onClick={toggleTheme} className="cursor-pointer" />
    );
}
