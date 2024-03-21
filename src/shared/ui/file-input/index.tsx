import React, { useRef } from 'react';
import clsx from 'clsx';
import styles from './file-input.module.scss';

interface FileInputProps {
    className?: string;
    children?: React.ReactNode;
    name?: string;
    multiple?: boolean;
    accept?: HTMLInputElement['accept'];
    disabled?: boolean;
    onChange?: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({
    className,
    children,
    onChange,
    multiple,
    name,
    accept,
    disabled,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (ev: React.MouseEvent) => {
        let target = ev.target as HTMLDivElement;
        if (disabled || target.closest('[data-prevent-upload]')) return;
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (onChange && e.target.files.length) {
                onChange([...e.target.files]);
            }
        }
    };

    return (
        <div
            className={clsx(styles.root, className, disabled && styles.root_disabled)}
            onClick={handleClick}
        >
            <input
                ref={inputRef}
                name={name || 'file'}
                type="file"
                className={styles.input}
                multiple={multiple}
                onChange={handleChange}
                accept={accept}
            />
            {children}
        </div>
    );
};

export default FileInput;
