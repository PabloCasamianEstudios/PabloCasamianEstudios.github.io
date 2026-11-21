import { useState, useEffect } from 'react';

export default function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        // Mobile browser bar takes the page colour
        const bg = getComputedStyle(root).getPropertyValue('--bg-page').trim();
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);
    const theme = isDark ? 'dark' : 'light';

    return { isDark, theme, toggleTheme };
}
