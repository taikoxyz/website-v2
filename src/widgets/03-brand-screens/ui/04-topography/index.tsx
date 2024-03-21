import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IBrandFont, IBrandTopography } from 'widgets/03-brand-screens/lib/types';
import css from './topography.module.scss';
import { startFromZero } from 'shared/lib/utils/formatter';
import { Button } from 'shared/components/@buttons/button';

export const Topography: React.FC = () => {
    const topography = useTranslationObject<IBrandTopography[]>(
        'topography.list',
        'brand-assets'
    );
    const fonts = useTranslationObject<IBrandFont[]>(
        'topography.fonts',
        'brand-assets'
    );
    const { t } = useTranslation('brand-assets');
    
    return (
        <section className={css.topography}>
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.left}>
                        <div className={css.card}>
                            <h3 className={css.suptitle}>
                                {t('topography.suptitle')}
                            </h3>

                            <h2 className={css.title}>
                                {t('topography.title')}
                            </h2>

                            <ul className={css.list}>
                                {topography.map((item, id) => (
                                    <li 
                                        className={css.list_item}
                                        key={item.title}
                                    >
                                        <p className={css.list_index}>
                                            {id + 1}
                                        </p>

                                        <div className={css.list_column}>
                                            <h3 className={css.list_title}>
                                                {item.title}
                                            </h3>

                                            <p 
                                                className={css.list_text} 
                                                dangerouslySetInnerHTML={{
                                                    __html: item.text
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={css.right}>
                        <ul className={css.fonts}>
                            {fonts.map((font) => (
                                <li
                                    className={css.fonts_item}
                                    key={font.fontFamily}
                                >
                                    <div className={css.fonts_up}>
                                        <h4 className={css.fonts_suptitle}>
                                            {font.title}
                                        </h4>

                                        <h3 className={css.fonts_family}>
                                            {font.fontFamily}
                                        </h3>

                                        <div className={css.fonts_example}>
                                            <span />
                                            <img 
                                                className={css.fonts_aa}
                                                src={font.font}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className={css.fonts_down}>
                                        <div className={css.fonts_list}>
                                            {font.variants.map((variant) => (
                                                <p 
                                                    className={css.fonts_variant}
                                                    style={{ fontWeight: variant.weight }}
                                                    key={variant.name}
                                                >
                                                    {variant.name}
                                                </p>
                                            ))}
                                        </div>

                                        <Button 
                                            className={css.fonts_button}
                                            href={font.url}
                                            text={t('topography.downloadFont')}
                                            variant="pink-outlined"
                                            component="a"
                                            download
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}