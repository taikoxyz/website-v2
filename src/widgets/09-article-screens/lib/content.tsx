import { BlocksContent } from '@strapi/blocks-react-renderer';
import React from 'react';

interface HeadingProps {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface Anchor {
    name: string;
    hash: string;
}

export const getArticleAnchor = (title: string) => {
    return title.toLowerCase().replace(/([\._-]|\s)/gi, '-')
}

export const getArticleLinks = (data: BlocksContent) => {
    const links: Anchor[] = [];

    for(let { type, children } of data) {
        if(type === 'heading') {
            for(let item of children) {
                if(item.type === 'text') {
                    links.push({
                        name: item.text,
                        hash: getArticleAnchor(item.text)
                    })
                }
            }
        }
    }

    return links;
}

export const Heading: any = ({ children, level }: HeadingProps) => {
    const lvl = Math.max(2, level) as HeadingProps['level'];
    const Tag = `h${lvl}` as any;
    const [text] = (React.Children.map(
        children,
        (child: any) => child.props.text
    ) || []);

    return (
        <Tag id={getArticleAnchor(text)}>
            {children}
        </Tag>
    )
}