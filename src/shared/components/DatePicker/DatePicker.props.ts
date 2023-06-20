// react
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { CalendarProps } from 'react-calendar';
// types
import { Slot } from '@/shared/types';

export interface DatePickerProps
    extends Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        'ref' | 'children' | 'type'
    > {
    children?: Slot;
    onDateSelected?: (date: Date | null) => void;
    closeOnSelected?: boolean;
    calendar?: Omit<CalendarProps, 'onChange'>;
}
