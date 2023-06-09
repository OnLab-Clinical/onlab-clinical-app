// types
import { Slot } from '@/shared/types';

export type Language = 'en' | 'es';

export interface LanguageProviderProps {
    children?: Slot;
}

export interface LanguageSwitcherProps {
    className?: string;
}

export type Translation = `actions.${'close' | 'reload'}` | `theme.${'os' | 'light' | 'dark'}`;
