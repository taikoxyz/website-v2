import { IFileObject } from './file';
import { IBaseFields, IServerResponse } from './global';

export interface IProject extends IBaseFields {
    icon: IFileObject;
    name: string;
    link: string;
    description: string;
    type: "Testnet" | "Coming Soon" | "Mainnet";
    project_categories: IProjectCategory[];
} 

export interface IProjectCategory extends IBaseFields {
    name: string;
    projects?: {
        count: number;
    }
}

export type IProjectCategoriesResponse = IServerResponse<IProject>;
export type IProjectsResponse = IServerResponse<IProject>;