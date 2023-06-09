// react
import { useCallback } from 'react';
// store
import { useAppDispatch, useAppSelector } from '../store';
import { themeActions, themeState } from './theme.reducer';
// types
import { ThemePreference } from './theme.type';
// hooks
import { useLocalStorage } from '@/shared/hooks';
import { useNotification } from '../notification';

export const useTheme = () => {
    const [storedTheme, setThemeToLocalStorage] = useLocalStorage<ThemePreference>('theme', 'os');
    const { addNotification } = useNotification();

    const { theme } = useAppSelector(themeState);
    const dispatch = useAppDispatch();

    const changeTheme = useCallback(
        (currentTheme: ThemePreference) => {
            try {
                setThemeToLocalStorage(currentTheme);

                dispatch(themeActions.setTheme(currentTheme));
            } catch (error) {
                addNotification({
                    title: 'Error',
                    message: (error as Error).message,
                    kind: 'danger',
                });
            }
        },
        [addNotification, dispatch, setThemeToLocalStorage]
    );

    return { storedTheme, theme, changeTheme };
};
