// react
import { memo, useEffect, useMemo, useRef } from 'react';
// types
import { Theme, ThemeProviderProps } from './theme.type';
// utils
import { classNames, content } from '@/shared/utils';
// hooks
import { useTheme } from './useTheme.hook';

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
    const { storedTheme, theme, changeTheme } = useTheme();

    const themeClassName = useMemo(() => {
        let currentTheme: Theme = theme as Theme;

        if (theme === 'os') {
            if (window && window.matchMedia('(prefers-color-scheme: dark)').matches)
                currentTheme = 'dark';
            else currentTheme = 'light';
        }

        return `theme-${currentTheme}`;
    }, [theme]);

    const once = useRef<boolean>(false);

    // reactivity
    useEffect(() => {
        if (once.current) return;
        once.current = true;

        if (storedTheme === theme) return;

        changeTheme(storedTheme);
    }, [changeTheme, storedTheme, theme]);

    return (
        <div className={classNames('flex flex-col flex-grow', themeClassName)}>
            <div className="flex flex-col flex-grow bg-light-300 text-dark-700 theme-dark:bg-dark-700 theme-dark:text-light-300">
                {content(children)}
            </div>
        </div>
    );
});

export default ThemeProvider;
