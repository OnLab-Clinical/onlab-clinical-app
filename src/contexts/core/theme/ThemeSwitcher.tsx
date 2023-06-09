// react
import { memo } from 'react';
// types
import { ThemePreference, ThemeSwitcherProps } from './theme.type';
// utils
import { classNames } from '@/shared/utils';
// hooks
import { useLanguage } from '../language';
import { useTheme } from './useTheme.hook';
// components
import { Icon } from '@/shared/components';
// assets
import { mdiLightbulbNight, mdiLightbulbOn, mdiThemeLightDark } from '@mdi/js';

const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, changeTheme } = useTheme();
    const { translate } = useLanguage();

    const themes: Record<ThemePreference, { iso: ThemePreference; icon: string; hint: string }> = {
        os: {
            iso: 'os',
            icon: mdiThemeLightDark,
            hint: translate('theme.os'),
        },
        light: {
            iso: 'light',
            icon: mdiLightbulbOn,
            hint: translate('theme.light'),
        },
        dark: {
            iso: 'dark',
            icon: mdiLightbulbNight,
            hint: translate('theme.dark'),
        },
    };

    return (
        <ul
            className={classNames('grid rounded-sm bg-light-100 theme-dark:bg-dark-500', className)}
            style={{
                gridTemplateRows: `repeat(${Object.keys(themes).length}, minmax(0, 1fr))`,
            }}>
            {Object.keys(themes).map((themeKey, themeIndex) => {
                const currentTheme = themes[themeKey as ThemePreference];

                return (
                    <li key={themeIndex} className="flex flex-row">
                        <button
                            className="flex-grow flex flex-row items-center rounded-sm gap-2 px-4 py-1 transition-all disabled:bg-primary-600 disabled:text-light-300 disabled:shadow-sm disabled:shadow-primary-600"
                            type="button"
                            title={currentTheme.hint}
                            onClick={() => {
                                changeTheme(currentTheme.iso);
                            }}
                            disabled={currentTheme.iso === theme}>
                            <span>
                                <Icon path={currentTheme.icon} />
                            </span>

                            <span className="font-medium text-center">{currentTheme.hint}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});

export default ThemeSwitcher;
