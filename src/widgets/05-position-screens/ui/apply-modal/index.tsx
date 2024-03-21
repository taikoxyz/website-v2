import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'shared/components/@buttons/button';
import { useForm } from 'shared/lib/hooks/use-form';
import { ICareer } from 'shared/lib/types';
import { Input } from 'shared/ui/input';
import { useModal } from 'shared/ui/modal2';
import Sprite from 'shared/ui/sprite';
import { PositionModalEnum } from 'widgets/05-position-screens/lib/types';
import { UploadFile } from 'shared/components/upload-file';
import css from './apply-modal.module.scss';

interface Inputs {
    email: string;
    information: string;
    file: File | null;
}

export const ApplyModal: React.FC = () => {
    const { closeModal, getModal } = useModal();
    const modal = getModal<ICareer>(PositionModalEnum.APPLY_POS);
    const { t } = useTranslation();

    const { 
        values, 
        handleChange, 
        handleSubmit,
        setFieldValue 
    } = useForm<Inputs>({
        initialValues: {
            email: '',
            information: '',
            file: null,
        },
        onSubmit: async (values, _, ev) => {
            ev?.preventDefault();
        },
    });

    return (
        <div className={css.apply}>
            <div className={css.apply_wrapper}>
                <button
                    className={css.closeButton}
                    onClick={() => closeModal(PositionModalEnum.APPLY_POS)}
                >
                    <Sprite.Default icon="cross" />
                </button>

                <img className={css.image} src="/img/apply-form.png" alt="" />

                <h3 className={css.title}>{t('applyForm.applyNow')}</h3>

                <p className={css.text}>
                    {t('applyForm.text')}:{' '}
                    <strong>{modal?.payload?.title}</strong>
                </p>

                <form onSubmit={handleSubmit} className={css.form}>
                    <Input
                        className={{
                            root: css.input,
                            input: css.input_input,
                            field: css.input_field,
                            placeholder: css.input_placeholder
                        }}
                        value={values.email}
                        onChange={handleChange}
                        variant="float"
                        placeholder={t('applyForm.email')}
                        name="email"
                    />

                    <Input
                        className={{
                            root: `${css.input} ${css.textarea}`,
                            input: css.input_input,
                            field: css.input_field,
                            placeholder: css.input_placeholder
                        }}
                        value={values.information}
                        onChange={handleChange}
                        component="textarea"
                        variant="float"
                        placeholder={t('applyForm.extraInfo')}
                        name="information"
                        autoHeight
                    />
                    <div className={css.file}>
                        <UploadFile 
                            file={values.file}
                            onChange={(file) => setFieldValue('file', file)}
                        />
                    </div>
                    <Button 
                        className={css.applyBtn} 
                        text={t('applyForm.applyNow')} 
                        type="submit" 
                    />
                </form>
            </div>
        </div>
    );
};
