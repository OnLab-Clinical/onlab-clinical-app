// react
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// store
import { AppState } from '../store';
// types
import { ThemePreference } from './theme.type';

interface ThemeState {
    theme: ThemePreference;
}

const initialThemeState: ThemeState = {
    theme: '' as ThemePreference,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemePreference>) => {
            state.theme = action.payload;
        },
    },
});

export const themeReducer = themeSlice.reducer;
export const themeState = (state: AppState) => state.theme;
export const themeActions = themeSlice.actions;
