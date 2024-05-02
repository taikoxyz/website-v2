import React from 'react';
import { useTranslation } from 'next-i18next';
// import { FooterSubscribe } from 'features/footer-subscribe';
import css from './footer.module.scss';
import { FooterNav, FooterSocials } from './ui';

interface Props {
    subscribeBar?: boolean;
}

export const Footer: React.FC<Props> = ({
    subscribeBar
}) => {
    const { t } = useTranslation('footer');
    
    return (
        <div className={css.footer}>
            <div className="container">
                <div className={css.wrapper}>
                    {subscribeBar}

                    <div className={css.box}>
                        <p 
                            className={css.title} 
                            dangerouslySetInnerHTML={{ __html: t('joinTaiko') }} 
                        />
                        <FooterSocials />
                        <FooterNav />
                    </div>
                </div>
            </div>
        </div>
    );
}