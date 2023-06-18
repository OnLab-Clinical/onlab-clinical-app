// react
import { memo } from 'react';
// props
import { LanguageProviderProps } from './language.type';
// utils
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { initReactI18next, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { content } from '@/shared/utils';
// values
import { langs } from './langs';

// setup language
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['localStorage'],
            lookupLocalStorage: 'language',
            caches: ['localStorage'],
        },
        resources: langs,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

const LanguageProvider = memo(({ children }: LanguageProviderProps) => {
    const { i18n } = useTranslation();

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={i18n.language} />
            </Helmet>

            {content(children, undefined)}
        </HelmetProvider>
    );
});

export default LanguageProvider;
