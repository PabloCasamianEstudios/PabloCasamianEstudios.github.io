import { Layers, Atom, Code, Box, Database, Coffee, Flag, Languages, Users, Zap, Monitor, Server } from 'lucide-react';
import Folder from '../Folder/Folder';
import { useLang } from '../../context/LanguageContext';

export default function SkillsTab() {
    const { t } = useLang();

    return (
        <div id="skills" className="tab-pane">
            <Folder legend="tech_stack.env">
                <div className="skill-category-divider">{t('skills.editors')}</div>
                <div className="tech-pill"><Monitor size={12} /> VS Code</div>
                <div className="tech-pill"><Code size={12} /> Eclipse</div>

                <div className="skill-category-divider">{t('skills.languages')}</div>
                <div className="tech-pill"><Code size={12} /> TypeScript</div>
                <div className="tech-pill"><Coffee size={12} /> Java</div>

                <div className="skill-category-divider">{t('skills.frameworks')}</div>
                <div className="tech-pill"><Layers size={12} /> Vue.js</div>
                <div className="tech-pill"><Atom size={12} /> React</div>
                <div className="tech-pill"><Box size={12} /> Laravel</div>

                <div className="skill-category-divider">{t('skills.infrastructure')}</div>
                <div className="tech-pill"><Server size={12} /> Docker</div>
                <div className="tech-pill"><Database size={12} /> MySQL</div>
            </Folder>

            <Folder legend="languages.json" style={{ marginTop: '40px' }}>
                <div className="tech-pill"><Flag size={12} /> {t('skills.spanish')}</div>
                <div className="tech-pill"><Languages size={12} /> {t('skills.english')}</div>
            </Folder>

            <Folder legend="soft_skills.log" style={{ marginTop: '40px' }}>
                <div className="tech-pill"><Users size={12} /> {t('skills.teamwork')}</div>
                <div className="tech-pill"><Zap size={12} /> {t('skills.adaptability')}</div>
                <div className="tech-pill"><Zap size={12} /> {t('skills.problemSolving')}</div>
            </Folder>
        </div>
    );
}
