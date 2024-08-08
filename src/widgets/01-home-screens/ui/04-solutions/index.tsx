import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { Button } from "shared/components/@buttons/button";
import { useTranslationObject } from "shared/lib/hooks/use-translation-object";
import { MediaQuery } from "shared/ui/media-query";
import {
  HomeScreensEnum,
  IHomeSolution,
} from "widgets/01-home-screens/lib/types";
import css from "./solutions.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

const Solutions: React.FC = () => {
  const solutions = useTranslationObject<IHomeSolution[]>(
    "solutions.list",
    "home"
  );
  const { t } = useTranslation("home");
  const [activeSolution, setActiveSolution] = useState(solutions[0]);

  return (
    <section className={css.root} id={HomeScreensEnum.SOLUTIONS}>
      <div className="container">
        <div className={css.wrapper}>
          <MediaQuery
            query="(min-width: 769px)"
            children={
              <div className={css.solution}>
                <p className={css.suptitle}>{t("solutions.solutions")}</p>

                <h2 className={css.title}>
                  <span>{activeSolution.title_short}</span> –{" "}
                  {activeSolution.extraTitle}
                </h2>

                <div className={css.footer}>
                  <p className={css.text}>{activeSolution.text}</p>
                </div>

                <div className={css.corner}>
                  <Button
                    text={t("solutions.solutions")}
                    component="a"
                    href="/solutions"
                    animated={{
                      offset: "20%",
                    }}
                  />
                </div>
              </div>
            }
          />

          <ul className={css.text}>
            {solutions.map((solution, id) => (
              <li
                className={clsx(
                  css.list_item,
                  solution.title === activeSolution.title && css.list_itemActive
                )}
                onMouseEnter={() => setActiveSolution(solution)}
                key={solution.title}
              >
                <div
                  className={`${css.list_wrapper} aos`}
                  data-aos-offset="50%"
                >
                  <div className={css.list_header}>
                    <Player
                      className={css.list_icon}
                      src={solution.iconLottie}
                      autoplay
                      loop
                    />

                    <p className={css.list_index}>
                      {(id + 1).toString().padStart(2, "0")}
                    </p>
                  </div>

                  <h4 className={css.list_title}>
                    <MediaQuery
                      query="(min-width: 769px)"
                      children={<>{solution.title_short}</>}
                    />
                    <MediaQuery
                      query="(max-width: 768px)"
                      children={
                        <>
                          <span>{solution.title_short}</span> –{" "}
                          {solution.extraTitle}
                        </>
                      }
                    />
                  </h4>

                  <MediaQuery
                    query="(max-width: 768px)"
                    children={<p className={css.list_text}>{solution.text}</p>}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
