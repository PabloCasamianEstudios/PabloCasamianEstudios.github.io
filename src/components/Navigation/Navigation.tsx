import './Navigation.scss';
import { useLang } from '../../context/LanguageContext';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    const { t } = useLang();

    const tabs: { key: string; label: string }[] = [
        { key: 'home',     label: t('nav.home') },
        { key: 'projects', label: t('nav.projects') },
        { key: 'skills',   label: t('nav.skills') },
    ];

    return (
        <nav className="nav-wrapper">
            {tabs.map(tab => (
                <button 
                    key={tab.key}
                    className={`nav-btn ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
