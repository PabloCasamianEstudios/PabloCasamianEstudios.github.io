import { Layers, Atom, Code, Box, Database, Coffee, Flag, Languages, Users, Zap, Monitor, Server } from 'lucide-react';
import Folder from '../Folder/Folder';

export default function SkillsTab() {
    return (
        <div id="skills" className="tab-pane">
            <Folder legend="tech_stack.env">
                <div className="skill-category-divider">editors</div>
                <div className="tech-pill"><Monitor size={12} /> VS Code</div>
                <div className="tech-pill"><Code size={12} /> Eclipse</div>

                <div className="skill-category-divider">languages</div>
                <div className="tech-pill"><Code size={12} /> TypeScript</div>
                <div className="tech-pill"><Coffee size={12} /> Java</div>

                <div className="skill-category-divider">frameworks</div>
                <div className="tech-pill"><Layers size={12} /> Vue.js</div>
                <div className="tech-pill"><Atom size={12} /> React</div>
                <div className="tech-pill"><Box size={12} /> Laravel</div>

                <div className="skill-category-divider">infrastructure</div>
                <div className="tech-pill"><Server size={12} /> Docker</div>
                <div className="tech-pill"><Database size={12} /> MySQL</div>
            </Folder>

            <Folder legend="languages.json" style={{ marginTop: '40px' }}>
                <div className="tech-pill"><Flag size={12} /> Español — Nativo</div>
                <div className="tech-pill"><Languages size={12} /> Inglés — B2 Certified</div>
            </Folder>

            <Folder legend="soft_skills.log" style={{ marginTop: '40px' }}>
                <div className="tech-pill"><Users size={12} /> Trabajo en Equipo</div>
                <div className="tech-pill"><Zap size={12} /> Adaptabilidad</div>
                <div className="tech-pill"><Zap size={12} /> Resolución de problemas</div>
            </Folder>
        </div>
    );
}
