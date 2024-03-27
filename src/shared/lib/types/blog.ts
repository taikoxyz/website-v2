import { BlocksContent } from "@strapi/blocks-react-renderer";
import { IFileObject } from "./file";
import { IBaseFields, IServerResponse } from "./global";

export interface IBlog extends IBaseFields {
    title: string;
    slug: string;
    link: string;
    date: string;
    timeToRead: string;
    category: IBlogCategory;
    image: IFileObject;
    content: BlocksContent;
    howToApply: BlocksContent;
}

export interface IBlogShort {
    id: number;
    title: string;
    slug: string;
}

export type IBlogsNear = {
    prev: IBlogShort | null;
    next: IBlogShort | null;
}

export type IBlogCategory = {
    id: number;
    name: string;
}

export type IBlogCategoryResponse = IServerResponse<IBlogCategory>;

export type IBlogsResponse = IServerResponse<IBlog>;