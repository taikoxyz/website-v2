export interface IGrantDate {
    date: string;
    description: string;
}

export interface IGrantMission {
    icon: string;
    title: string;
    text: string;
}

export interface IGrantTrack {
    icon: string;
    link: string;
    title: string;
    track: string;
    text: string;
    timeline: string;
    active: boolean;
}

export interface IGrantFaq {
    q: string;
    a: string;
}