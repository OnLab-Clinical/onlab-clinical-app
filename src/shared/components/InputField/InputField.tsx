// react
import { memo } from 'react';
// props
import { InputFieldProps } from './InputField.props';
// types
import { StyleStrategy } from '@/shared/types';
// layouts
import { FieldLayout } from '@/shared/layouts';
// utils
import { classNames, contentString } from '@/shared/utils';

const InputField = memo(
    ({
        inputId,
        title,
        before,
        input,
        after,
        hint,
        isHintReserved,
        hasError,
        styleStrategy = 'default',
    }: InputFieldProps) => {
        const contentStyles: Record<StyleStrategy, string> = {
            default: 'border-b-dark-700 theme-dark:border-b-light-300',
            primary: 'border-b-primary-500 text-primary-500',
            secondary: 'border-b-secondary-500 text-secondary-500',
            info: 'border-b-info-500 text-info-500',
            success: 'border-b-success-500 text-success-500',
            warning: 'border-b-warning-600 text-warning-600',
            danger: 'border-b-danger-500 text-danger-500',
        };

        return (
            <FieldLayout
                className={{
                    wrapper: classNames(
                        'gap-1 group',
                        'text-dark-700 text-opacity-80 focus-within:text-opacity-100',
                        'theme-dark:text-light-300 theme-dark:text-opacity-80 theme-dark:focus-within:text-opacity-100'
                    ),
                    content: ({ hasError }) =>
                        classNames(
                            'transition-all rounded-sm border-b-2',
                            'border-opacity-80 group-focus-within:border-opacity-100 text-opacity-80 focus-within:text-opacity-100',
                            'theme-dark:border-opacity-80 theme-dark:group-focus-within:border-opacity-100 theme-dark:text-opacity-80 theme-dark:group-focus-within:text-opacity-100',
                            hasError
                                ? contentStyles.danger
                                : contentStyles[
                                      contentString(styleStrategy, { hasError }) as StyleStrategy
                                  ]
                        ),
                }}
                hasError={hasError}
                title={({ hasError }) =>
                    title && (
                        <label
                            htmlFor={contentString(inputId, { hasError })}
                            className="transition-all font-semibold mx-1">
                            {contentString(title, { hasError })}
                        </label>
                    )
                }
                before={before}
                input={input}
                after={after}
                hint={({ hasError }) =>
                    (hint || isHintReserved) && (
                        <label
                            htmlFor={contentString(inputId, { hasError })}
                            className={classNames(
                                'transition-all text-center text-sm font-medium',
                                isHintReserved && !hint && 'h-5',
                                hasError &&
                                    'text-danger-500 text-opacity-80 group-focus-within:text-opacity-100'
                            )}>
                            {hint != false && contentString(hint, { hasError })}
                        </label>
                    )
                }
            />
        );
    }
);

export default InputField;
