import { useLang } from '../../context/LanguageContext';
import './LangToggle.scss';

export default function LangToggle() {
    const { lang, toggleLang } = useLang();

    return (
        <button
            className="lang-toggle"
            onClick={toggleLang}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
            {lang === 'es' ? 'EN' : 'ES'}
        </button>
    );
}
