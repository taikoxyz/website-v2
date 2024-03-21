export interface IFile {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
}

export interface IFileFormats {
    large?: IFile;
    medium?: IFile;
    small?: IFile;
    thumbnail?: IFile;
}

export interface IFileObject {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width?: number;
    height?: number;
    formats: IFileFormats;
    hash: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: unknown;
    provider: string;
    provider_metadata: unknown;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}