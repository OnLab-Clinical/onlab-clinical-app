// react
import { useMemo } from 'react';
// hooks
import { useSignInContext } from '../SignIn.context';
import { useActive } from '@/shared/hooks';
// components
import { Icon, InputFieldProps } from '@/shared/components';
// assets
import { mdiAccountCircle, mdiEye, mdiEyeOff, mdiLock, mdiLockOpenAlert } from '@mdi/js';

export const useSignInForm = () => {
    // states
    const {
        handleSignIn,
        form: {
            register,
            formState: { errors },
        },
    } = useSignInContext();

    const [isPasswordVisible, , , togglePasswordVisibility] = useActive(false);

    // fields
    const nameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'sign-in-name',
            title: 'User name',
            before: <Icon className="w-6 h-6" path={mdiAccountCircle} />,
            input: (
                <input
                    type="text"
                    id="sign-in-name"
                    placeholder="Type user name"
                    {...register('name')}
                />
            ),
            hint: errors.name?.message,
            isHintReserved: true,
            hasError: !!errors.name?.message,
            styleStrategy: 'primary',
        }),
        [errors.name?.message, register]
    );

    const passwordField: InputFieldProps = useMemo(
        () => ({
            inputId: 'sign-in-password',
            title: 'User password',
            before: (
                <Icon className="w-6 h-6" path={isPasswordVisible ? mdiLockOpenAlert : mdiLock} />
            ),
            input: (
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    id="sign-in-password"
                    placeholder="Type user password"
                    {...register('password')}
                />
            ),
            after: (
                <button
                    type="button"
                    className="hover:scale-105 active:scale-95"
                    onClick={togglePasswordVisibility}>
                    <Icon className="w-6 h-6" path={isPasswordVisible ? mdiEyeOff : mdiEye} />
                </button>
            ),
            hint: errors.password?.message,
            isHintReserved: true,
            hasError: !!errors.password?.message,
            styleStrategy: 'primary',
        }),
        [errors.password?.message, isPasswordVisible, register, togglePasswordVisibility]
    );

    const signInFormFields: InputFieldProps[] = [nameField, passwordField];

    return { handleSignIn, signInFormFields };
};
