import { IFileObject } from './file';

export interface ISeo {
    keywords?: string;
    description?: string;
    image?: IFileObject;
}

export interface IMetadata {
    pageSize: number;
    pageCount: number;
    page: number;
    total: number;
}

export interface IMetadataDefault {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface IBaseFields {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

export type IServerResponse<T> = {
    results: T[];
    meta: IMetadata;
}