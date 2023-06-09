// store
import { store } from './store';
// types
import { Slot } from '@/shared/types';

export interface StoreProviderProps {
    children?: Slot;
}

// store types
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
