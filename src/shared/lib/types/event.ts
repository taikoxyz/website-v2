import { IFileObject } from './file';
import { IBaseFields, IServerResponse } from './global';

export interface IEvent extends IBaseFields {
    title: string;
    slug: string;
    location: string;
    date: string;
    image: IFileObject;
}

export interface IEventLocation {
    name: string;
}

export type IEventsResponse = IServerResponse<IEvent>;