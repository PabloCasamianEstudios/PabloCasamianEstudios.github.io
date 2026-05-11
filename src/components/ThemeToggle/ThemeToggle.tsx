import { Moon, Sun } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import './ThemeToggle.scss';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
