export interface IHeaderLink {
    name: string;
    links: {
        name: string;
        url: string;
        icon: string;
    }[];
    suptitle?: string;
}

export interface IHeaderSocial {
    icon: string;
    url: string;
}