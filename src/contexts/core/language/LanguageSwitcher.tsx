// react
import { memo } from 'react';
// types
import { Language, LanguageSwitcherProps } from './language.type';
// utils
import { classNames } from '@/shared/utils';
// hooks
import { useLanguage } from './useLanguage.hook';

const LanguageSwitcher = memo(({ className }: LanguageSwitcherProps) => {
    const { language, changeLanguage } = useLanguage();

    const languages: Record<
        Language,
        {
            iso: Language;
            language: string;
        }
    > = {
        en: {
            iso: 'en',
            language: 'English',
        },
        es: {
            iso: 'es',
            language: 'Español',
        },
    };

    return (
        <ul
            className={classNames('grid rounded-sm bg-light-100 theme-dark:bg-dark-500', className)}
            style={{
                gridTemplateColumns: `repeat(${Object.keys(languages).length}, minmax(0, 1fr))`,
            }}>
            {Object.keys(languages).map((languageKey, languageIndex) => {
                const currentLanguage = languages[languageKey as Language];

                return (
                    <li key={languageIndex} className="flex flex-row">
                        <button
                            className="flex-grow px-2 py-1 rounded-sm transition-all disabled:bg-primary-600 disabled:text-light-300 disabled:shadow-sm disabled:shadow-primary-600"
                            type="button"
                            title={currentLanguage.language}
                            onClick={() => changeLanguage(currentLanguage.iso)}
                            disabled={currentLanguage.iso === language}>
                            <span className="font-medium text-center">{currentLanguage.iso}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});

export default LanguageSwitcher;
