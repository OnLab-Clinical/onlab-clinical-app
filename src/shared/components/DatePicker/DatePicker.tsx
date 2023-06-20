// react
import { memo } from 'react';
// props
import { DatePickerProps } from './DatePicker.props';

const DatePicker = memo(({ children }: DatePickerProps) => {
    return <>{children}</>;
});

export default DatePicker;
