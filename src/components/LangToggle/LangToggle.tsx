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
            <span className={lang === 'es' ? 'active' : ''}>es</span>
            <span className="separator">/</span>
            <span className={lang === 'en' ? 'active' : ''}>en</span>
        </button>
    );
}
