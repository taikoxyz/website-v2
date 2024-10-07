import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Sprite from 'shared/ui/sprite';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { EcosystemApiEnum } from 'widgets/07-ecosystem-screens/lib/types';
import { projectApi } from 'shared/lib/api';
import { flatProjects, getProjectsQuery } from 'widgets/07-ecosystem-screens/lib';
import { Button } from 'shared/components/@buttons/button';
import { IBaseFields, IProjectsResponse } from 'shared/lib/types';
import { useEcosystemFilters } from 'widgets/07-ecosystem-screens/provider';
import { ProjectsList } from '../03.01-projects-list';
import css from './projects.module.scss';

export const Projects: React.FC = () => {
    const { t } = useTranslation('ecosystem');
    const { filters } = useEcosystemFilters();
    const router = useRouter();

    const { data: lastProject } = useQuery<IBaseFields>({
        queryKey: [EcosystemApiEnum.LAST_PROJECT],
    });

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<IProjectsResponse>({
        queryKey: [
            EcosystemApiEnum.ALL_PROJECTS,
            getProjectsQuery(router.query, filters)
        ],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => projectApi.getAll(
            getProjectsQuery(router.query, {
                ...filters,
                page: pageParam,
            })
        ),
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.page < lastPage.meta.pageCount) {
                return lastPage.meta.page + 1;
            }
        },
    });

    const projects = useMemo(
        () => flatProjects(data?.pages || []),
        [data]
    );

    return (
        <section className={css.projects}>
            <div className="container">
                <div className={css.wrapper}>
                    <ProjectsList projects={projects} />

                    {lastProject && (
                        <p className={css.lastUpdate}>
                            <Sprite.Default icon="timer" />
                            <span>
                                {t('lastUpdated')}{' '}
                                {dayjs(lastProject.updatedAt).format('MMM DD, YYYY')}
                            </span>
                        </p>
                    )}

                    {hasNextPage && (
                        <Button
                            className={css.viewMore}
                            text={t('viewMore')}
                            onClick={fetchNextPage}
                            disabled={isFetching}
                            variant="pink-outlined"
                        />
                    )}
                    <div className={css.disclaimer}>
                        <strong>Disclaimer:</strong> Be cautious when using third-party applications. Applications listed are provided for information without recommendation or endorsement. <strong>Your security and privacy are important</strong>, so research thoroughly before engaging with third-party applications. We are not responsible for any risks or losses associated with the use of any third-party offerings. Proceed at your own discretion.
                    </div>
                </div>
            </div>
        </section>
    );
};