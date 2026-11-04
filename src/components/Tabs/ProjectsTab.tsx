import { Fragment } from 'react';
import ProjectCard from './ProjectCard';
import ProjectsBox from './ProjectsBox';
import projectsData from '../../data/projects.json';

export default function ProjectsTab() {
    const sortedProjects = [...projectsData].sort((a, b) => b.id - a.id);

    return (
        <div id="projects" className="tab-pane">
            <div className="projects-grid">
                {sortedProjects.map((project, i) => (
                    <Fragment key={project.id}>
                        <ProjectCard
                            {...project}
                            icon={project.icon as 'gamepad' | 'box'}
                        />
                        {i === 0 && <ProjectsBox />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
