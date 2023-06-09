// types
import { Slot } from '../types';

export const content = <T = null>(component: Slot<T>, params?: T) =>
    typeof component === 'function' ? component(params) : component;
