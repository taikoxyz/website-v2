import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import Sprite from '../sprite';
import css from './share-button.module.scss';

interface Props {
    type: "facebook" | "twitter" | "linkedin";
    href: string;
    origin?: boolean;
    className?: string;
}

export const ShareButton: React.FC<Props> = ({
    type,
    href,
    origin,
    className,
}) => {
    const [rendered, setRendered] = useState(false);

    const url = useMemo(
        () => {
            let url = decodeURIComponent(href);
            let basepath = (origin && rendered) 
                ? window.location.origin
                : '';
            console.log(url)
                
            url = [basepath, url.replace(/^\//, '')].join('/');

            if(type === 'facebook') {
                return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            }

            if(type === 'twitter') {
                return `https://twitter.com/intent/tweet?url=${url}`;
            }

            if(type === 'linkedin') {
                return `https://www.linkedin.com/sharing/share-offsite/?url={${url}}`
            }

            return "";
        }, 
        [href, type, rendered]
    );

    useEffect(() => setRendered(true), []);

    return (
        <a 
            className={clsx(css.share, className)}
            href={url}
            target="_blank"
        >
            {type}
            <Sprite.Default icon={`share:${type}`} />
        </a>
    );
}