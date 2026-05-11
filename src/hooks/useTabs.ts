import { useState } from 'react';

export default function useTabs(initialTab: string) {
    const [activeTab, setActiveTab] = useState(initialTab);

    const switchTab = (tab: string) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { activeTab, switchTab };
}
