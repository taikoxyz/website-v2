import { useTranslation } from "next-i18next";
import React from "react";
import { HomeScreensEnum } from "widgets/01-home-screens/lib/types";
import css from "./trailblazer.module.scss";
import { TrailblazerBanner } from "shared/components/trailblazer";
import { Button } from "shared/components/@buttons/button";

const Trailblazer: React.FC = () => {
  const { t } = useTranslation("home");

  return (
    <section className={css.trailblazer} id={HomeScreensEnum.TRAILBLAZER}>
      <div className="container">
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
      </div>
    </section>
  );
};

export default Trailblazer;
