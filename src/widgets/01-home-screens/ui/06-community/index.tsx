import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'shared/components/@buttons/button';
import { Banner } from 'shared/components/banner';
import { HomeScreensEnum } from 'widgets/01-home-screens/lib/types';
import css from './community.module.scss';

const Community: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className={css.community} id={HomeScreensEnum.COMMUNITY}>
            <div className="container">
                <Banner
                    icon="star"
                    text={t('applyOurGrantsProgram')}
                    button={
                        <Button
                            text={t('learnMore')}
                            href="/grant-program"
                            target="_target"
                            component="a"
                            animated
                        />
                    }
                    fullwidth
                />
            </div>
        </section>
    );
};

export default Community;
