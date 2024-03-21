import { ICareer } from './../../../shared/lib/types/career';
import { PositionApiEnum } from './types';
import { useQuery } from '@tanstack/react-query';

export const usePosition = () => {
    const { data } = useQuery<ICareer>({ queryKey: [PositionApiEnum.POSITION] });
    return data!;
}