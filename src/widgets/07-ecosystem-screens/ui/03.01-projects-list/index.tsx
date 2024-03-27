import React from "react";
import { IProject } from "shared/lib/types";
import { ProjectItem } from "entities/project";
import { fileServerPath } from "shared/lib/utils/file-server-path";
import css from "./projects-list.module.scss";

interface Props {
    projects: IProject[];
}

export const ProjectsList: React.FC<Props> = React.memo(({ projects }) => {
    return (
        <ul className={css.list}>
            {projects.map((project) => (
                <li className={css.list_item} key={project.id}>
                    <ProjectItem
                        iconSrc={project.icon.url}
                        url={project.link}
                        title={project.name}
                        text={project.description}
                        type={project.type}
                        categories={project.project_categories}
                    />
                </li>
            ))}
        </ul>
    );
});