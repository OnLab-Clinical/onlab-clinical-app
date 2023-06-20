// react
import { useMemo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, InputFieldProps } from '@/shared/components';
// hooks
import { useLanguage } from '@/contexts/core/language';

export const useSignUpStep1 = () => {
    // states
    const {
        form: {
            register,
            formState: { errors },
        },
    } = useSignUpContext();

    const { translate } = useLanguage();

    // fields
    const nameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-name',
            title: 'name',
            input: <input type="text" id="step1-name" placeholder="name" {...register('name')} />,
            hint: errors.name?.message,
            isHintReserved: true,
            hasError: !!errors.name?.message,
            styleStrategy: 'primary',
        }),
        [errors.name?.message, register]
    );

    const step1FormFields: InputFieldProps[] = [nameField];

    // actions
    const nextAction: ButtonProps = useMemo(
        () => ({
            type: 'button',
            styleStrategy: 'secondary',
            hasError: true,
            children: <span>Next</span>,
        }),
        []
    );

    return { step1FormFields, nextAction, translate };
};
