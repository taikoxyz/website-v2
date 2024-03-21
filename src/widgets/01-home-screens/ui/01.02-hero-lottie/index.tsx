import React, { useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { MediaQuery } from "shared/ui/media-query";
import css from "./hero-lottie.module.scss";

const HeroLottie: React.FC = () => {
    const playerRef = useRef<Player>(null);

    return (
        <>
            <MediaQuery
                query="(min-width: 769px)"
                children={
                    <Player
                        ref={playerRef}
                        className={css.lottie}
                        src="/img/intro-loop.json"
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice',
                        }}
                        autoplay
                        loop
                    />
                }
            />
            <MediaQuery
                query="(min-width: 466px) and (max-width: 768px)"
                children={
                    <Player
                        ref={playerRef}
                        className={css.lottie}
                        src="/img/intro-loop-mob.json"
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice',
                        }}
                        autoplay
                        loop
                    />
                }
            />
            <MediaQuery
                query="(max-width: 465px)"
                children={
                    <Player
                        ref={playerRef}
                        className={css.lottie}
                        src="/img/intro-loop-mob.v3.json"
                        rendererSettings={{
                            preserveAspectRatio: 'xMidYMid slice',
                        }}
                        autoplay
                        loop
                    />
                }
            />
        </>
    );
};

export default HeroLottie;