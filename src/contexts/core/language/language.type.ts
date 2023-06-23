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
    | `actions.${'close' | 'reload' | 'prev' | 'next'}`
    // authentication module
    | `auth.${
          | `name.${'label' | 'placeholder' | 'required'}`
          | `surname.${'label' | 'placeholder' | 'required'}`
          | `sex.${'label' | 'male' | 'female' | 'required'}`
          | `birth.${'label' | 'placeholder' | 'required' | 'adult'}`
          | `nid.${'label' | 'placeholder' | 'required'}`
          | `email.${'label' | 'placeholder' | 'required' | 'format'}`
          | `country.${
                | 'placeholder'
                | 'calling-placeholder'
                | 'required'
                | 'calling-required'}`
          | `phone.${'label' | 'placeholder' | 'required' | 'format'}`
          | `department.${'placeholder' | 'required'}`
          | `municipality.${'placeholder' | 'required'}`
          | `address.${'label' | 'placeholder' | 'required'}`
          | `location.${'label'}`
          | `username.${'label' | 'placeholder' | 'required' | 'start' | 'only' | 'min'}`
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
          | `sign-up.${'title' | 'sign-in-nav' | 'step-1' | 'step-2' | 'step-3' | 'sign-up'}`}`;
