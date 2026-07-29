import { Moon, Sun } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import './ThemeToggle.scss';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle-icon-only"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            title={theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro'}
        >
            {theme === 'light' ? (
                <Moon size={48} fill="currentColor" />
            ) : (
                <Sun size={48} fill="currentColor" />
            )}


        </button>
    );
}



