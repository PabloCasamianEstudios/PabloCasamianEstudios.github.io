import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LangToggle from './components/LangToggle/LangToggle';
import Sidebar from './components/Sidebar/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomeTab from './components/Tabs/HomeTab';
import ProjectsTab from './components/Tabs/ProjectsTab';
import SkillsTab from './components/Tabs/SkillsTab';
import useTabs from './hooks/useTabs';
import './components/Tabs/Tabs.scss';
import './App.scss';

export default function App() {
    const { activeTab, switchTab } = useTabs('home');

    return (
        <div className="app-shell">
            <ThemeToggle />
            <LangToggle />
            <Sidebar />
            <main>
                <Navigation activeTab={activeTab} onTabChange={switchTab} />
                <div className="tab-content">
                    {activeTab === 'home' && <HomeTab />}
                    {activeTab === 'projects' && <ProjectsTab />}
                    {activeTab === 'skills' && <SkillsTab />}
                </div>
                <Footer />
            </main>
        </div>
    );
}
