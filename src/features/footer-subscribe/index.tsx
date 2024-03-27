import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { Icon } from 'shared/components/icon';
import { useForm } from 'shared/lib/hooks/use-form';
import { Input } from 'shared/ui/input';
import css from './footer-subscribe.module.scss';
import { MediaQuery } from 'shared/ui/media-query';

interface Inputs {
    email: string;
}

export const FooterSubscribe: React.FC = () => {
    const { t } = useTranslation('footer');

    const { values, handleChange, handleSubmit } = useForm<Inputs>({
        initialValues: {
            email: '',
        },
        onSubmit: async ({ email }, _, ev) => {
            ev?.preventDefault();
        },
    });

    return (
        <></>
        // <div className={css.root}>
        //     <Icon className={css.icon} icon="notification" />

        //     <p className={css.title}>
        //         {t('subscribe.stayUpdated')
        //             .split('\n')
        //             .map((text) => (
        //                 <span>{text}</span>
        //             ))}
        //     </p>

        //    <div className={css.box}>

        //         <form 
        //             className={`${css.form} aos`} 
        //             onSubmit={handleSubmit} 
        //             data-aos-offset="210px"
        //         >
        //             <div className={css.container}>
        //                 <Input
        //                     value={values.email}
        //                     onChange={handleChange}
        //                     className={{
        //                         root: css.input,
        //                         field: css.input_field,
        //                         input: css.input_input,
        //                     }}
        //                     placeholder={t('subscribe.email')}
        //                     name="email"
        //                 />

        //                 <MediaQuery 
        //                     query="(min-width: 657px)"
        //                     children={
        //                         <Button 
        //                             className={css.button} 
        //                             text={t('subscribe.subscribe')} 
        //                             animated={{ offset: '200px' }}
        //                         />
        //                     }
        //                 />

        //                 <MediaQuery 
        //                     query="(max-width: 656px)"
        //                     children={
        //                         <Button 
        //                             className={css.button} 
        //                             text={t('subscribe.subscribe')} 
        //                         />
        //                     }
        //                 />
        //             </div>
        //         </form>
        //    </div>
        // </div>
    );
};
