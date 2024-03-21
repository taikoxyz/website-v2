import React from 'react';
import NextImage from 'next/image';
import { GetComponentProps } from 'shared/lib/utils/typescript';

type ImageProps = GetComponentProps<typeof NextImage> & {
    isWebp?: boolean;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({ src, quality = 90, isWebp = true, ...props }, ref) => {
        const source = `${src}?q=${quality}` + (isWebp ? '&fm=webp' : '');
        return <NextImage {...props} ref={ref} src={source} />;
    }
);

export default Image;
