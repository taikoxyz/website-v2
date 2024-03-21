import React from 'react';
import { useTranslation } from 'next-i18next';
import { IGrantFaq } from 'widgets/11-grant-screens/lib/types';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import css from './support.module.scss';
import Sprite from 'shared/ui/sprite';
import { Accordeon } from 'shared/components/accordeon';

export const Support: React.FC = () => {
    const faqs = useTranslationObject<IGrantFaq[]>('support.faqs', 'grant-program');
    const { t } = useTranslation('grant-program');

    return (
        <section className={css.support}>
            <div className="container">
                <div className={css.content}>
                    <div className={css.content_left}>
                        <h2 className={css.title}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('support.title'),
                                }}
                            />
                            <Sprite.Default icon="arrow-right" /> 
                        </h2>

                        <p
                            className={css.text}
                            dangerouslySetInnerHTML={{
                                __html: t('support.text'),
                            }}
                        />
                    </div>

                    <div className={css.content_right}>
                        <ul className={css.list}>
                            {faqs.map((faq) => (
                                <li 
                                    className={css.list_item} 
                                    key={faq.q}
                                >
                                    <Accordeon 
                                        question={faq.q} 
                                        answer={faq.a}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
