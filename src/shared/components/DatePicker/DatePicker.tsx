// react
import { MouseEvent, forwardRef, useCallback } from 'react';
// props
import { DatePickerProps } from './DatePicker.props';
// hooks
import { useActive, useKeyDownEvent } from '@/shared/hooks';
import { useLanguage } from '@/contexts/core/language';
// utils
import { classNames, content } from '@/shared/utils';
// layouts
import { ModalLayout, PanelLayout } from '@/shared/layouts';
// components
import { Calendar } from 'react-calendar';
import { Button } from '../Button';
import { Icon } from '../Icon';
// assets
import { mdiClose } from '@mdi/js';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
    (
        {
            className,
            children,
            onClick,
            calendar,
            onDateSelected,
            closeOnSelected = true,
            id,
            ...props
        },
        ref
    ) => {
        const [isOpen, open, close] = useActive(false);

        const { translate } = useLanguage();

        const handleClick = useCallback(
            (event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
                if (onClick) onClick(event);

                open();
            },
            [onClick, open]
        );

        const handleClose = useCallback(() => {
            close();

            if (!id) return;

            document.getElementById(id)?.focus();
        }, [close, id]);

        useKeyDownEvent(event => {
            if (event.key !== 'Escape' || !isOpen) return;

            handleClose();
        });

        const handleSelect = useCallback(
            (date: Date | null | [Date | null, Date | null]) => {
                if (onDateSelected && date instanceof Date) {
                    onDateSelected(date);
                }

                if (closeOnSelected) handleClose();
            },
            [closeOnSelected, handleClose, onDateSelected]
        );

        return (
            <label
                className={classNames(
                    'w-0 h-full flex-grow bg-transparent px-1 py-0.5 text-dark-700 theme-dark:text-light-300',
                    className
                )}>
                {content(children, undefined)}

                <input
                    className="w-0 h-0 appearance-none"
                    type="button"
                    onClick={handleClick}
                    ref={ref}
                    id={id}
                    {...props}
                />

                <ModalLayout isOpen={isOpen}>
                    <PanelLayout>
                        <Button
                            className="self-end"
                            type="button"
                            onClick={handleClose}
                            styleStrategy="danger"
                            title={translate('actions.close')}>
                            <Icon path={mdiClose} className="text-xl" />
                        </Button>

                        <Calendar
                            onChange={handleSelect}
                            showFixedNumberOfWeeks
                            showWeekNumbers
                            calendarType="US"
                            {...calendar}
                        />
                    </PanelLayout>
                </ModalLayout>
            </label>
        );
    }
);

export default DatePicker;
