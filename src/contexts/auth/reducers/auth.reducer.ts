// react
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// types
import { Patient } from '../entities';
// configs
import { AppState } from '@/contexts/core/store';

interface AuthState {
    isAuthenticated: boolean;
    patient: Patient;
    token: string;
    refresh: string;
}

const authInitialState: AuthState = {
    isAuthenticated: false,
    patient: {} as Patient,
    token: '',
    refresh: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setPatient: (
            state,
            action: PayloadAction<{ patient: Patient; token: string; refresh: string }>
        ) => {
            state.isAuthenticated = true;
            state.patient = action.payload.patient;
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;
        },
        unsetPatient: state => {
            state.isAuthenticated = false;
            state.patient = {} as Patient;
            state.token = '';
            state.refresh = '';
        },
        updateTokens: (state, action: PayloadAction<{ token: string; refresh: string }>) => {
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;
        },
    },
});

export const authReducer = authSlice.reducer;
export const authState = ({ auth }: AppState) => auth;
export const authActions = authSlice.actions;
