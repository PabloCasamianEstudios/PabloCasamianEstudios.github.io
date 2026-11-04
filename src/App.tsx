import type { ComponentType } from 'react';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LangToggle from './components/LangToggle/LangToggle';
import Sidebar from './components/Sidebar/Sidebar';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomeTab from './components/Tabs/HomeTab';
import ProjectsTab from './components/Tabs/ProjectsTab';
import SkillsTab from './components/Tabs/SkillsTab';
import DrawingsPage from './components/DrawingsPage/DrawingsPage';
import EditingPage from './components/EditingPage/EditingPage';
import useTabs from './hooks/useTabs';
import useRoute from './hooks/useRoute';
import './components/Tabs/Tabs.scss';
import './App.scss';

const PAGES: Record<string, ComponentType> = {
    '#/edicion': EditingPage,
    '#/draws': DrawingsPage,
};

export default function App() {
    const { activeTab, switchTab } = useTabs('home');
    const route = useRoute();
    const Page = PAGES[route];

    return (
        <div className={`app-shell ${Page ? 'app-shell--page' : ''}`}>
            <div className="top-actions">
                <LangToggle />
                <ThemeToggle />
            </div>
            {Page ? (
                <main>
                    <Page />
                    <Footer />
                </main>
            ) : (
                <>
                    <header className="site-header">
                        <h1>pablo <span>casamián</span></h1>
                    </header>
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
                </>
            )}
        </div>
    );
}
