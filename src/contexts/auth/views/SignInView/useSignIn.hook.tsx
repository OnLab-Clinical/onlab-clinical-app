// react
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
// props
import { SignInContextProps, SignInFormData } from './SignIn.props';
// hooks
import { useLoader } from '@/contexts/core/loader';
import { useNotification } from '@/contexts/core/notification';
// utils
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userNameValidation, userPasswordValidation } from '../../validations';
// repositories
import { signInRepository } from '../../repositories';

const signInValidation = yup.object({
    name: userNameValidation,
    password: userPasswordValidation,
});

export const useSignIn = () => {
    // states
    const form = useForm<SignInFormData>({
        mode: 'all',
        resolver: yupResolver(signInValidation),
    });

    const { showLoader, hideLoader } = useLoader();

    const { addNotification } = useNotification();

    // actions
    const handleSignIn = form.handleSubmit(async data => {
        showLoader();

        const response = await signInRepository(data);

        if (!response.success) {
            addNotification({
                message: response.message,
                kind: response.kind,
            });

            return hideLoader();
        }

        console.log(response.data);

        hideLoader();
    });

    // sign in Contex
    const context: SignInContextProps = useMemo(
        () => ({
            // values
            form,
            // actions
            handleSignIn,
        }),
        [form, handleSignIn]
    );

    return {
        context,
    };
};
