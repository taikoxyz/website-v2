import React, { useMemo } from "react";
import DragFile from "shared/ui/drag-file";
import FileInput from "shared/ui/file-input";
import Sprite from "shared/ui/sprite";
import css from "./upload-file.module.scss";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

interface Props {
    file: File | null;
    onChange: (file: File | null) => void;
}

export const UploadFile: React.FC<Props> = ({
    file,
    onChange
}) => {
    const { t } = useTranslation();

    const onClickButton = (ev: React.MouseEvent<HTMLButtonElement>) => {
        onChange(null);
    }

    const fileName = useMemo(() => {
        if(!file) return null;

        const segments = file.name.split('.');
        const ext = segments.pop();
        const name = segments.join('.')

        return { name, ext };
    }, [file]);

    return (
        <div className={clsx(
            css.root,
            file && css.rootAttached
        )}>
            <svg 
                className={css.file_border}
                fill="none"
            >
                <rect 
                    x="1.5" 
                    y="1.5"
                    rx="14"
                    ry="14" 
                    strokeDasharray="10 10" 
                    strokeWidth="1.5" 
                    width="99.2%"
                    height="96%"
                />
            </svg>

            {!file && (
                <DragFile 
                    className={css.file}
                    onChange={files => onChange(files[0])}
                >
                    <FileInput 
                        className={css.file_input}
                        onChange={files => onChange(files[0])}
                    >

                        
                        <div className={css.file_empty}>
                            <Sprite.Default icon="file" />
                            <span>{t('uploadFile.empty_text')}</span>
                        </div>
                    </FileInput>
                </DragFile>
            )}
            
            {file && (
                <div className={css.file_fill}>
                    <div className={css.file_left}>
                        <p className={css.suptitle}>
                            {t('uploadFile.fill_text')}
                        </p>
                        <p className={css.name}>
                            <span>{fileName?.name}</span>.
                            <span>{fileName?.ext}</span>
                        </p>
                    </div>

                    <div className={css.file_right}>

                        <FileInput className={css.file_new}>
                            <Sprite.Default icon="file" />
                            <span>{t('uploadFile.new_text')}</span>
                        </FileInput>

                        <button 
                            className={css.file_remove}
                            onClick={onClickButton}
                        >
                            <Sprite.Default icon="cross-circle" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};