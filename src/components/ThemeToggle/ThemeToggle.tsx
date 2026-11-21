import { Moon, Sun } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import { useLang } from '../../context/LanguageContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLang();
    const label = theme === 'light' ? t('common.toDark') : t('common.toLight');

    return (
        <button className="theme-toggle-icon-only" onClick={toggleTheme} aria-label={label} title={label}>
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </button>
    );
}
