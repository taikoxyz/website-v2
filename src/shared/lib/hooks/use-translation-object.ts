import { useTranslation } from "next-i18next";

export const useTranslationObject = <T>(
    uid: string,
    locale?: string
) => {
    const { t } = useTranslation(locale);
    return t(uid, { returnObjects: true }) as T;
}