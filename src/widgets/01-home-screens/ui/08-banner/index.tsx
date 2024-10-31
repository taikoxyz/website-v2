import { useTranslation } from "next-i18next";
import React from "react";
import { HomeScreensEnum } from "widgets/01-home-screens/lib/types";
import css from "./trailblazer.module.scss";
import { TrailblazerBanner } from "shared/components/trailblazer";
import { GrantsBanner } from "shared/components/grants";
import { Button } from "shared/components/@buttons/button";
import Carousel from "./BannerCarousel";
import type { Slide } from "./BannerCarousel";

const Trailblazer: React.FC = () => {
    const { t } = useTranslation("home");

    const slides: Slide[] = [
        {
            component: () => (
                <TrailblazerBanner
                    icon="/img/trailblazer/icon.svg"
                    logo="/img/trailblazer/trailblazer.svg"
                    text={t("trailblazerBanner.text")}
                    button={
                        <Button
                            text={t("trailblazerBanner.button")}
                            href="https://trailblazers.taiko.xyz"
                            target="_target"
                            component="a"
                            animated
                        />
                    }
                    fullwidth
                />
            ),
        },
        {
            component: () => (
                <GrantsBanner
                    icon="/img/grants-banner/icon.svg"
                    logo="grantFactoryBanner"
                    text={t("grantFactoryBanner.text")}
                    button={
                        <Button
                            text={t("grantFactoryBanner.button")}
                            href="https://taiko.xyz/grant-program"
                            target="_target"
                            component="a"
                            animated
                        />
                    }
                    fullwidth
                />
            ),
        },
    ];

    return (
        <section className={css.trailblazer} id={HomeScreensEnum.TRAILBLAZER}>
            <div className="container">
                <Carousel
                    slides={slides}
                    interval={5000}
                    transitionDuration={700}
                    withDots
                />
            </div>
        </section>
    );
};

export default Trailblazer;
