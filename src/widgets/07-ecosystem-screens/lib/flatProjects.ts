import { IProjectsResponse, IProject } from "shared/lib/types";

export const flatProjects = (data: IProjectsResponse[]) => {
    return data.reduce(
        (acc, item) => [...acc, ...item.results],
        [] as IProject[] 
    )
}