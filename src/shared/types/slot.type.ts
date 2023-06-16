// react
import { ReactNode } from 'react';

export type Slot<T = undefined> = ReactNode | ReactNode[] | ((params: T) => ReactNode);
