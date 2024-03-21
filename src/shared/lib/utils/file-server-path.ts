import { IFileObject } from '../types';

export const fileServerPath = (name: string) => {
    return process.env.NEXT_PUBLIC_API_URL + name;
};

export const getFileData = (file: IFileObject) => {
    let type: 'video' | 'image' = 'image';

    if (!file) {
        return { url: '', type };
    }

    if (/^(video)\/.+/i.test(file.mime)) {
        type = 'video';
    }

    if (/^(image)\/.+/i.test(file.mime)) {
        type = 'image';
    }

    return {
        url: process.env.NEXT_PUBLIC_API_URL + file.url,
        type,
    };
};
