import React from 'react';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import clsx from 'clsx';
import css from './rich-text.module.scss';
import { transformContent } from './lib/transformContent';

type BlocksRendererProps = React.ComponentProps<typeof BlocksRenderer>;;

interface Props {
    content: BlocksContent;
    blocks?: BlocksRendererProps['blocks'];
    modifiers?: BlocksRendererProps['modifiers'];
    className?: string;
}

export const RichText: React.FC<Props> = ({
    content,
    blocks,
    modifiers,
    className
}) => {
    return (
        <div className={clsx(css.text, className)}>
            <BlocksRenderer 
                content={transformContent(content)} 
                blocks={blocks}
                modifiers={modifiers}
            />
        </div>
    );
}