import { BlocksContent } from "@strapi/blocks-react-renderer";

export const transformContent = (content: BlocksContent) => {
    const data = JSON.parse(JSON.stringify(content)) as BlocksContent;

    for(let item of data) {
        if(item.type === "paragraph") {
            for(let child of item.children) {
                if(child.type === 'link') {
                    child.url = child.url.includes('mailto:')
                        ? child.url.replace(/^(https?):\/\//, '')
                        : child.url;
                }
            }
        }
    }

    return data;
}