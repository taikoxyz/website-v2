export interface IBrandLogo {
    id: number;
    img: string;
    background: string;
    backgroundImage?: string;
}

export interface IBrandColor {
    title: string;
    items: {
        name: string;
        color: string;
    }[]
}

export interface IBrandTopography {
    title: string;
    text: string;
}

export interface IBrandFont {
    title: string;
    fontFamily: string;
    font: string;
    variants: {
        name: string;
        weight: number;
    }[];
    url: string;
}