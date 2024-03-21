import React, { useState } from 'react';
import clsx from 'clsx';

type ChildrenProps = (props: { isOver: boolean }) => React.ReactNode;

interface DragFileProps {
    className?: string;
    overClassName?: string;
    children?: React.ReactNode | ChildrenProps;
    onChange?: (files: File[], ev: React.DragEvent<HTMLDivElement>) => void;
    accept?: string;
    disabled?: boolean;
}

const DragFile: React.FC<DragFileProps> = ({
    children,
    className,
    overClassName,
    onChange,
    disabled,
    accept,
}) => {
    const [isOver, setOver] = useState(false);

    const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (disabled) return;
        setOver(true);
    };
    const onDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (disabled) return;
        setOver(false);
    };
    const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (disabled) return;
        const allowFileExt = (accept || '').split(',');

        if(allowFileExt.length === 0) {
            onChange?.([...ev.dataTransfer.files], ev);
        } else {
            const files: File[] = [];

            for(let file of ev.dataTransfer.files) {
                if(!allowFileExt.some((ext) => file.name.endsWith(ext))) {
                    continue;
                }

                files.push(file);
            }

            onChange?.([...files], ev);
        }

        setOver(false);
    };

    return (
        <div
            className={clsx(className, isOver && overClassName)}
            onDragStart={(e) => e.preventDefault()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {typeof children === 'function' ? children({ isOver }) : children}
        </div>
    );
};

export default DragFile;
