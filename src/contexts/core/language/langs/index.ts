// types
import { Language, Translation } from '../language.type';
// values
import { en } from './en.lang';
import { es } from './es.lang';

export const langs: Record<Language, { translation: Record<Translation, string> }> = {
    en: { translation: { ...en } },
    es: { translation: { ...es } },
};
