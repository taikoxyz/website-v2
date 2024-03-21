import { useQuery } from '@tanstack/react-query';
import { IBlog } from 'shared/lib/types/blog';
import { ArticleApiEnum } from './types';

export const useArticle = () => {
    const { data: article } = useQuery<IBlog>({ queryKey: [ArticleApiEnum.ARTICLE] });
    return article!;
}