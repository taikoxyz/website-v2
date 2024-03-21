export interface IFooterSocial {
    icon: string;
    name: string;
    url: string;
}

export interface IFooterLink {
    title: string;
    list: {
        name: string;
        url: string;
        isHome?: boolean;
    }[]
}