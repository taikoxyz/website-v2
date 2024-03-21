import { Optional } from 'shared/lib/utils/typescript';
import { IBlogDate } from '../lib/transform-filters';
import { SelectItem } from 'shared/ui/select';

export interface IBlogFilter {
    dateRange: IBlogDate;
    topic: SelectItem;
}

export interface IBlogFilterContext {
    state: IBlogFilter;
    setState: (values: Optional<IBlogFilter>) => void;
}
