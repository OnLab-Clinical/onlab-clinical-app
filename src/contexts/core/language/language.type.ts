// types
import { Slot } from '@/shared/types';

export type Language = 'en' | 'es';

export type LanguageMap = {
    [index: string | Language]: string;
};

export interface LanguageProviderProps {
    children?: Slot;
}

export interface LanguageSwitcherProps {
    className?: string;
}

export type Translation =
    // app
    | `app.${'title' | 'not-found' | 'start'}`
    | `theme.${'os' | 'light' | 'dark'}`
    | `actions.${'close' | 'reload'}`
    // authentication module
    | `auth.${
          | `name.${'label' | 'placeholder' | 'required' | 'start' | 'only' | 'min'}`
          | `password.${
                | 'label'
                | 'placeholder'
                | 'show'
                | 'hide'
                | 'required'
                | 'lowercase'
                | 'uppercase'
                | 'decimal'
                | 'special'
                | 'between'}`
          // Sign in view
          | `sign-in.${'title' | 'sign-in' | 'sign-up-hint' | 'sign-up-nav' | 'welcome'}`
          // sign up view
          | `sign-up.${'title' | 'sign-up'}`}`;
