// react
import { useMemo } from 'react';
// hooks
import { useRecoveryContext } from '../Recovery.context';
import { Translation, useLanguage } from '@/contexts/core/language';
// components
import { ButtonProps, Icon, InputFieldProps } from '@/shared/components';
// assets
import { mdiEmail } from '@mdi/js';

export const useRecoveryForm = () => {
    // states
    const {
        handleRecovery,
        form: {
            register,
            formState: { errors, isValid, isSubmitted },
        },
    } = useRecoveryContext();

    const { translate } = useLanguage();

    // fields
    const emailField: InputFieldProps = useMemo(
        () => ({
            inputId: 'recovery-email',
            title: translate('auth.email.label'),
            before: <Icon className="text-xl" path={mdiEmail} />,
            input: (
                <input
                    type="text"
                    id="recovery-email"
                    placeholder={translate('auth.email.placeholder')}
                    {...register('email')}
                />
            ),
            hint: translate(errors.email?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.email?.message,
            styleStrategy: 'primary',
        }),
        [errors.email?.message, register, translate]
    );

    const recoveryFormFields: InputFieldProps[] = [emailField];

    // actions
    const recoveryAction: ButtonProps = useMemo(
        () => ({
            type: 'submit',
            styleStrategy: 'primary',
            hasError: !isValid && isSubmitted,
            children: <span>{translate('auth.recovery.recovery')}</span>,
        }),
        [isSubmitted, isValid, translate]
    );

    return { handleRecovery, recoveryFormFields, recoveryAction, translate };
};
