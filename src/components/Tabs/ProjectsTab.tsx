import ProjectCard from './ProjectCard';
import projectsData from '../../data/projects.json';

export default function ProjectsTab() {
    const sortedProjects = [...projectsData].sort((a, b) => b.id - a.id);

    return (
        <div id="projects" className="tab-pane">
            <div className="projects-grid">
                {sortedProjects.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        {...project} 
                        icon={project.icon as 'gamepad' | 'box'} 
                    />
                ))}
            </div>
        </div>
    );
}
