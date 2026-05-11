import './Navigation.scss';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    const tabs = ['home', 'projects', 'skills'];

    return (
        <nav className="nav-wrapper">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
}
