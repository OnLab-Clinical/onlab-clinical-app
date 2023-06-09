// react
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// types
import { Language, Translation } from './language.type';
// utils
import { interpolate } from '@/shared/utils';

export const useLanguage = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = useCallback((lang: Language) => i18n.changeLanguage(lang), [i18n]);

    const translate = useCallback(
        (
            key: Translation,
            values?: {
                [index: string]: string | number | boolean;
            }
        ) =>
            !values
                ? t(key)
                : interpolate({
                      source: t(key),
                      values,
                  }),
        [t]
    );

    return {
        language: i18n.language as Language,
        changeLanguage,
        translate,
    };
};
