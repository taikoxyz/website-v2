import React from 'react';
import { useTranslation } from 'next-i18next';
import { usePosition } from 'widgets/05-position-screens';
import { RichText } from 'shared/components/rich-text';
import css from './content.module.scss';
import { MediaQuery } from 'shared/ui/media-query';

export const Content: React.FC = () => {
    const { content, howToApply } = usePosition();
    const { t } = useTranslation('position');
    
    return (
        <section className={css.content}>
            <div className="container">
                <div className={css.wrapper}>

                    <MediaQuery 
                        query="(min-width: 992px)"
                        children={
                            <div className={css.left}>
                                <h3 className={css.title}>
                                    {t('aboutPosition')}
                                </h3>
                            </div>
                        }
                    />
                    
                    <div className={css.right}>
                        <div className={css.main}>
                            <RichText content={content} />
                        </div>
                        
                        <div className={css.apply}>
                            <h3 className={css.apply_title}>
                                {t('howToApply')}
                            </h3>
                            <RichText 
                                className={css.apply_text}
                                content={howToApply}
                            />
                        </div>
                    </div>
                
                </div>
            </div>
        </section>
    );
}