// types
import { Slot } from '@/shared/types';

export type Theme = 'light' | 'dark';

export type ThemePreference = 'os' | Theme;

export interface ThemeProviderProps {
    children?: Slot;
}

export interface ThemeSwitcherProps {
    className?: string;
}
