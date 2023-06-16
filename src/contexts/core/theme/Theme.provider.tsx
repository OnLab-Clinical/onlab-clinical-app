/* eslint-disable jsx-a11y/html-has-lang */
// react
import { memo, useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
// types
import { ThemeProviderProps } from './theme.type';
// utils
import { content } from '@/shared/utils';
// hooks
import { useTheme } from './useTheme.hook';

const ThemeProvider = memo(({ children }: ThemeProviderProps) => {
    const { storedTheme, theme, changeTheme } = useTheme();

    const themeClassName = useMemo((): string => {
        let currentTheme = theme;

        if (currentTheme === 'os') {
            if (window && window.matchMedia('(prefers-color-scheme: dark)').matches)
                currentTheme = 'dark';
            else currentTheme = 'light';
        }

        if (currentTheme === 'dark') return 'theme-dark';
        return 'theme-light';
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
        <>
            <Helmet>
                <html className={themeClassName} />
            </Helmet>

            {content(children, undefined)}
        </>
    );
});

export default ThemeProvider;
