import React, { useEffect, useState } from 'react';
// import css from './media-query.module.scss';

interface MediaQueryProps {
    query: string;
    children: React.ReactNode;
    onUpdate?: () => void;
}

export const MediaQuery: React.FC<MediaQueryProps> = ({
    children,
    query,
    onUpdate,
}) => {
    const [isRender, setRender] = useState(false);

    const onResize = () => {
        const innerWidth = document.documentElement.getBoundingClientRect().width;
        const queries = query.split(/\s?and\s?/g);
        let render = true;

        for(let query of queries) {
            const isMax = query.includes('max-width');
            const isMin = query.includes('min-width');
            const px = +(query.match(/\d+/gi) || '0').toString();

            if(
                (isMax && innerWidth > px) || 
                (isMin && innerWidth < px)
            ) render = false;
        }

        if(isRender !== render && onUpdate) {
            onUpdate();
        } 

        setRender(render);
    }

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    });

    useEffect(() => {
        onResize();
    }, []);

    return isRender ? <>{children}</> : null;
}