// react
import { MouseEvent, forwardRef, useCallback } from 'react';
// props
import { DatePickerProps } from './DatePicker.props';
// hooks
import { useActive } from '@/shared/hooks';
// layouts
import { ModalLayout, PanelLayout } from '@/shared/layouts';
// components
import { Calendar } from 'react-calendar';
import { content } from '@/shared/utils';
// styles
import 'react-calendar/dist/Calendar.css';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    ({ children, onClick, calendar, onDateSelected, closeOnSelected = true, ...props }, ref) => {
        const [isOpen, open, close] = useActive(false);

        const handleClick = useCallback(
            (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
                if (onClick) onClick(event);

                open();
            },
            [onClick, open]
        );

        const handleSelect = useCallback(
            (date: Date | null | [Date | null, Date | null]) => {
                if (onDateSelected && date instanceof Date) onDateSelected(date);

                if (closeOnSelected) close();
            },
            [close, closeOnSelected, onDateSelected]
        );

        return (
            <label className="w-0 h-full flex-grow bg-transparent px-1 py-0.5 text-dark-700 theme-dark:text-light-300">
                {content(children, undefined)}

                <input
                    className="w-0 h-0 appearance-none"
                    type="button"
                    onClick={handleClick}
                    ref={ref}
                    {...props}
                />

                <ModalLayout isOpen={isOpen}>
                    <PanelLayout>
                        <button type="button" onClick={close}>
                            X
                        </button>

                        <Calendar onChange={handleSelect} {...calendar} />
                    </PanelLayout>
                </ModalLayout>
            </label>
        );
    }
);

export default DatePicker;
