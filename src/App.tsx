import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LangToggle from './components/LangToggle/LangToggle';
import Sidebar from './components/Sidebar/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomeTab from './components/Tabs/HomeTab';
import ProjectsTab from './components/Tabs/ProjectsTab';
import EditingTab from './components/Tabs/EditingTab';
import SkillsTab from './components/Tabs/SkillsTab';
import useTabs from './hooks/useTabs';
import './components/Tabs/Tabs.scss';
import './App.scss';

export default function App() {
    const { activeTab, switchTab } = useTabs('home');

    return (
        <div className="app-shell">
            <div className="top-actions">
                <LangToggle />
                <ThemeToggle />
            </div>
            <Sidebar />
            <main>
                <Navigation activeTab={activeTab} onTabChange={switchTab} />
                <div className="tab-content">
                    {activeTab === 'home' && <HomeTab />}
                    {activeTab === 'projects' && <ProjectsTab />}
                    {activeTab === 'editing' && <EditingTab />}
                    {activeTab === 'skills' && <SkillsTab />}
                </div>
                <Footer />
            </main>
        </div>
    );
}
