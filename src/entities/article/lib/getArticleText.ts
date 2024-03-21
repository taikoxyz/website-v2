import { BlocksContent } from '@strapi/blocks-react-renderer';

type IBlocksToText = (data: BlocksContent) => string[];

export const getArticleText: IBlocksToText = (data) => {
    const content: string[] = [];

    for(let item of data) {
        if(item.type === 'paragraph') {
            for(let child of item.children) {
                if(child.type === 'text') {
                    content.push(child.text);
                }
            }
        }
    }

    return content;
}