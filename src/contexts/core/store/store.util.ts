// react
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// props
import { AppDispatch, AppState } from './store.type';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
