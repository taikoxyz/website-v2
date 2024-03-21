interface ICoreConfig {
    apiURL: string;
    postsPerPage: number;
    projectsPerPage: number;
    isDev: boolean;
}

let _config: ICoreConfig;

export const getCoreConfig = () => {
    _config = {
        apiURL: process.env.NEXT_PUBLIC_API_URL || '',
        postsPerPage: parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE || '9'),
        projectsPerPage: parseInt(process.env.NEXT_PUBLIC_PROJECTS_PER_PAGE || '16'),
        isDev: process.env.NODE_ENV === 'development'
    }

    return _config;
}