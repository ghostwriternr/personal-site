import { IconSun, IconMoonStars } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return theme === "light" ? (
        <IconMoonStars size={30} onClick={toggleTheme} className="cursor-pointer" />
    ) : (
        <IconSun size={30} onClick={toggleTheme} className="cursor-pointer" />
    );
}
