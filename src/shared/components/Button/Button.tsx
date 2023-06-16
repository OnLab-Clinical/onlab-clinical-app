// react
import { memo } from 'react';
// props
import { ButtonProps } from './Button.props';
// types
import { StyleStrategy } from '@/shared/types';
// utils
import { classNames, content } from '@/shared/utils';

const Button = memo(
    ({ styleStrategy = 'default', className, children, hasError, ...props }: ButtonProps) => {
        const buttonStyles: Record<StyleStrategy, string> = {
            default: 'bg-dark-500',
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
            info: 'bg-info-500',
            success: 'bg-success-500',
            warning: 'bg-warning-600',
            danger: 'bg-danger-500',
        };

        return (
            <button
                className={classNames(
                    'p-0.5 rounded-sm transition-all text-light-300 hover:scale-[1.01] active:scale-[0.99] disabled:scale-[0.99] disabled:cursor-not-allowed',
                    'bg-opacity-80 hover:bg-opacity-100 disabled:bg-opacity-60',
                    'theme-dark:bg-opacity-80 theme-dark:hover:bg-opacity-100 theme-dark:disabled:bg-opacity-60',
                    hasError ? buttonStyles.danger : buttonStyles[styleStrategy],
                    className
                )}
                {...props}>
                {content(children, undefined)}
            </button>
        );
    }
);

export default Button;
