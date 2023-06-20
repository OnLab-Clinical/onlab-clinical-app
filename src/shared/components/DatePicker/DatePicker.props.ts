// react
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
// import { ReactDatePickerProps } from 'react-datepicker';
// types
import { Slot } from '@/shared/types';

export interface DatePickerProps
    extends Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        'ref' | 'children' | 'type'
    > {
    children?: Slot;
    selected?: Date;
    onDateSelected?: (date: Date | null) => void;
    closeOnSelected?: boolean;
}
