import { Language } from './language.type';

export const getCurrentLanguageService = (): Language => {
    const defaultLanguage: Language = 'es';

    try {
        return (localStorage.getItem('language') as Language) ?? defaultLanguage;
    } catch {
        return defaultLanguage;
    }
};
