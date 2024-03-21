import { useEffect } from 'react';
import { useObjectState } from './use-object-state';

export const useMediaQuery = () => {
    const [mediaQuery, setMediaQuery] = useObjectState({
        sizes: {
            width: 9999,
            height: 9999,
        },
        aspectRatio: {}
    });

    const onResize = () => {
        setMediaQuery({
            sizes: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        });
    };

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return mediaQuery;
};
