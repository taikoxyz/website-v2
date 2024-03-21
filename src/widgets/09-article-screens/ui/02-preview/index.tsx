import React from 'react';
import { fileServerPath } from 'shared/lib/utils/file-server-path';
import { useArticle } from 'widgets/09-article-screens';
import css from './preview.module.scss';

export const Preview: React.FC = () => {
    const { image } = useArticle();

    return (
        <section 
            className={css.preview}
        >
            <div className={css.image}>
                <img 
                    src={fileServerPath(image.url)} 
                    alt=""  
                />
            </div>
        </section>
    );
}