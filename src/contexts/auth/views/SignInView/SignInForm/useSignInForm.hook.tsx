// react
import { useMemo } from 'react';
// hooks
import { useSignInContext } from '../SignIn.context';
import { Translation, useLanguage } from '@/contexts/core/language';
import { useActive } from '@/shared/hooks';
// components
import { ButtonProps, Icon, InputFieldProps } from '@/shared/components';
// assets
import { mdiAccountCircle, mdiEye, mdiEyeOff, mdiLock, mdiLockOpenAlert } from '@mdi/js';

export const useSignInForm = () => {
    // states
    const {
        handleSignIn,
        form: {
            register,
            formState: { errors, isValid, isSubmitted },
        },
    } = useSignInContext();

    const { translate } = useLanguage();

    const [isPasswordVisible, , , togglePasswordVisibility] = useActive(false);

    // fields
    const nameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'sign-in-name',
            title: translate('auth.username.label'),
            before: <Icon className="text-xl" path={mdiAccountCircle} />,
            input: (
                <input
                    type="text"
                    id="sign-in-name"
                    placeholder={translate('auth.username.placeholder')}
                    {...register('name')}
                />
            ),
            hint: translate(errors.name?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.name?.message,
            styleStrategy: 'primary',
        }),
        [errors.name?.message, register, translate]
    );

    const passwordField: InputFieldProps = useMemo(
        () => ({
            inputId: 'sign-in-password',
            title: translate('auth.password.label'),
            before: (
                <Icon className="text-xl" path={isPasswordVisible ? mdiLockOpenAlert : mdiLock} />
            ),
            input: (
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="sign-in-password"
                    placeholder={translate('auth.password.placeholder')}
                    autoComplete="off"
                    {...register('password')}
                />
            ),
            after: (
                <button
                    type="button"
                    className="hover:scale-105 active:scale-95"
                    title={
                        isPasswordVisible
                            ? translate('auth.password.hide')
                            : translate('auth.password.show')
                    }
                    onClick={togglePasswordVisibility}>
                    <Icon className="text-xl" path={isPasswordVisible ? mdiEyeOff : mdiEye} />
                </button>
            ),
            hint: translate(errors.password?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.password?.message,
            styleStrategy: 'primary',
        }),
        [errors.password?.message, isPasswordVisible, register, togglePasswordVisibility, translate]
    );

    const signInFormFields: InputFieldProps[] = [nameField, passwordField];

    // actions
    const signInAction: ButtonProps = useMemo(
        () => ({
            type: 'submit',
            styleStrategy: 'primary',
            hasError: !isValid && isSubmitted,
            children: <span>{translate('auth.sign-in.sign-in')}</span>,
        }),
        [isSubmitted, isValid, translate]
    );

    return { handleSignIn, signInFormFields, signInAction, translate };
};
