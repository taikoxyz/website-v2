import { BlocksContent } from '@strapi/blocks-react-renderer';
import { IBaseFields, IServerResponse } from './global';

export interface ICareer extends IBaseFields {
    title: string;
    slug: string;
    type: string;
    location: string;
    content: BlocksContent;
    howToApply: BlocksContent;
}

export type ICareersResponse = IServerResponse<ICareer>;