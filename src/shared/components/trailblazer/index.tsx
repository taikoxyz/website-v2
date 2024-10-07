import React from "react";
import css from "./trailblazer.module.scss";

interface Props {
  text: string;
  icon: string;
  logo: string;
  button: React.ReactNode;
  fullwidth?: boolean;
}

export const TrailblazerBanner: React.FC<Props> = ({
  button,
  text,
  icon,
  logo,
  fullwidth,
}) => {
  return (
    <div className={css.banner}>
      <div className={fullwidth ? "" : "container"}>
        <div className={css.wrapper} data-class="banner">
          <div className={css.group}>
            <img className={css.logo} src={logo} alt="Trailblazer" />
            <div className={css.group2}>
              <img className={css.icon} src={icon} alt="Trailblazer" />
              <p className={css.text}>{text}</p>
              <div className={css.button}>{button}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
