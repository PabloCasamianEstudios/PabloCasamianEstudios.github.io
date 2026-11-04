import type { ComponentType } from 'react';
import { Languages, Puzzle, Repeat, Users } from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import { SiDocker, SiEclipseide, SiLaravel, SiMysql, SiReact, SiSpringboot, SiTypescript, SiVuedotjs } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import Folder from '../Folder/Folder';
import { useLang } from '../../context/LanguageContext';

interface Skill {
    name: string;
    icon: ComponentType<{ size?: number }>;
    note?: string;
}

function SkillGroup({ label, skills }: { label?: string; skills: Skill[] }) {
    return (
        <div className="skill-group">
            {label && <div className="skill-group-label">{label}</div>}
            <ul className="skill-list">
                {skills.map(({ name, icon: Icon, note }) => (
                    <li key={name} className="skill-item">
                        <Icon size={16} />
                        {name}
                        {note && <small>{note}</small>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function SkillsTab() {
    const { t } = useLang();

    const [spanish, spanishLevel] = t('skills.spanish').split(' — ');
    const [english, englishLevel] = t('skills.english').split(' — ');

    return (
        <div id="skills" className="tab-pane">
            <Folder legend="tech_stack.env">
                <SkillGroup label={t('skills.editors')} skills={[
                    { name: 'VS Code', icon: VscVscode },
                    { name: 'Eclipse', icon: SiEclipseide },
                ]} />
                <SkillGroup label={t('skills.languages')} skills={[
                    { name: 'TypeScript', icon: SiTypescript },
                    { name: 'Java', icon: FaJava },
                ]} />
                <SkillGroup label={t('skills.frameworks')} skills={[
                    { name: 'Spring Boot', icon: SiSpringboot },
                    { name: 'Vue.js', icon: SiVuedotjs },
                    { name: 'React', icon: SiReact },
                    { name: 'Laravel', icon: SiLaravel },
                ]} />
                <SkillGroup label={t('skills.infrastructure')} skills={[
                    { name: 'Docker', icon: SiDocker },
                    { name: 'MySQL', icon: SiMysql },
                ]} />
            </Folder>

            <Folder legend="languages.json">
                <SkillGroup skills={[
                    { name: spanish, icon: Languages, note: spanishLevel },
                    { name: english, icon: Languages, note: englishLevel },
                ]} />
            </Folder>

            <Folder legend="soft_skills.log">
                <SkillGroup skills={[
                    { name: t('skills.teamwork'), icon: Users },
                    { name: t('skills.adaptability'), icon: Repeat },
                    { name: t('skills.problemSolving'), icon: Puzzle },
                ]} />
            </Folder>
        </div>
    );
}
