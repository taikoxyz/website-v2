import React from 'react';

interface SpriteProps {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    url: string;
}

type SpriteDefault = Omit<SpriteProps, 'url'> & { icon: string };

const Sprite: React.FC<SpriteProps> = ({ id, url, className, style }) => {
    return (
        <svg 
            id={id}
            style={style} 
            className={className}
        >
            <use href={url} />
        </svg>
    );
};

const SpriteDefault: React.FC<SpriteDefault> = ({ icon, ...props }) => {
    return <Sprite {...props} url={`/img/sprite.svg#${icon}`} />
}

export default Object.assign(Sprite, { Default: SpriteDefault });