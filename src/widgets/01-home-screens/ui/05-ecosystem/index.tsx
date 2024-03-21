import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { HomeScreensEnum } from 'widgets/01-home-screens/lib/types';
import EcosystemDapps from '../05.01-ecosystem-dapps';
import EcosystemContent from '../05.02-ecosystem-content';
import css from './ecosystem.module.scss';
import { MediaQuery } from 'shared/ui/media-query';

const Ecosystem: React.FC = () => {

    return (
        <section
            className={css.ecosystem}
            id={HomeScreensEnum.ECOSYSTEM}
        >
            <div className="container">
                <div className={css.wrapper}>
                    <MediaQuery 
                        query="(min-width: 769px)"
                        children={
                            <Player 
                                className={css.image}
                                src="/img/home/ecosystem.json"
                                rendererSettings={{
                                    preserveAspectRatio: "xMidYMid slice"
                                }}
                                autoplay
                                loop
                            />
                        }   
                    />

                    <MediaQuery 
                        query="(max-width: 768px)"
                        children={
                            <Player 
                                className={css.image}
                                src="/img/home/ecosystem.mob.v2.json"
                                rendererSettings={{
                                    preserveAspectRatio: "xMidYMid slice"
                                }}
                                autoplay
                                loop
                            />
                        }   
                    />

                    <div className={css.box}>
                        <div className={css.dapps}>
                            <EcosystemDapps />
                        </div>

                        <div className={css.content}>
                            <EcosystemContent />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Ecosystem;