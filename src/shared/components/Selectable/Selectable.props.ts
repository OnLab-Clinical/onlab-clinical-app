// react
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
// types
import { Slot } from '@/shared/types';

export type SelectableStrategy = 'single' | 'multiple';

export interface SelectableProps
    extends Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        'ref' | 'children' | 'type'
    > {
    children?: Slot;
    strategy: SelectableStrategy;
}
