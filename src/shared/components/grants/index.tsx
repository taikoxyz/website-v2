import React from "react";
import css from "./grants.module.scss";

interface Props {
    text: string;
    icon: string;
    logo: string;
    button: React.ReactNode;
    fullwidth?: boolean;
}

export const GrantsBanner: React.FC<Props> = ({
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
                    <div className={css.cover}>
                        <div className={css.content}>
                            <div className={css.leftgroup}>
                                <p>
                                    the grant <br /> factory
                                </p>
                            </div>

                            <div className={css.rightgroup}>
                                <div className={css.rightSubgroup}>
                                    <p className={css.text}>{text}</p>
                                    <img
                                        className={css.icon}
                                        src={icon}
                                        alt="Grants"
                                        loading="lazy"
                                    />
                                </div>
                                <div className={css.button}>{button}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
