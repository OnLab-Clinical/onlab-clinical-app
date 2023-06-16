// types
import { Slot } from '../types';

export const content = <T = undefined>(component: Slot<T>, params: T) =>
    typeof component === 'function' ? component(params) : component;

export const contentString = <T = undefined>(
    str: string | ((params: T) => string) | undefined,
    params: T
) => (typeof str === 'function' ? str(params) : str);
