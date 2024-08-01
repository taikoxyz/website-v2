import React from "react";
import css from "./trailblazer.module.scss";

interface Props {
  text: string;
  icon: string;
  button: React.ReactNode;
  fullwidth?: boolean;
}

export const TrailblazerBanner: React.FC<Props> = ({
  button,
  text,
  icon,
  fullwidth,
}) => {
  return (
    <div className={css.banner}>
      <div className={fullwidth ? "" : "container"}>
        <div className={css.wrapper} data-class="banner">
          <div className={css.group}>
            <img className={css.icon} src={icon} alt="Trailblazer" />
            <p className={css.text}>{text}</p>
            <div className={css.button}>{button}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
