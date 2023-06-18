// react
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// props
import { SignInContextProps, SignInFormData } from './SignIn.props';
// types
import { Translation } from '@/contexts/core/language';
// hooks
import { useLoader } from '@/contexts/core/loader';
import { useNotification } from '@/contexts/core/notification';
// utils
import * as yup from 'yup';
import { signInRepository } from '../../repositories';

const signInSchema = yup.object({
    name: yup
        .string()
        .required('' as Translation)
        .matches(/^[A-Za-z]+.*$/, 'start with letter' as Translation)
        .matches(/^\w+$/, 'only letters and decimals' as Translation)
        .matches(/^.{3,32}$/, '3 a 32' as Translation),
    password: yup
        .string()
        .required('' as Translation)
        .matches(/^.*[a-z]+.*$/, 'minuscula' as Translation)
        .matches(/^.*[A-Z]+.*$/, 'mayuscula' as Translation)
        .matches(/^.*\d+.*$/, 'decimal' as Translation)
        .matches(/^.*\W+.*$/, 'especial' as Translation)
        .matches(/^.{8,32}$/, '8 a 32' as Translation),
});

export const useSignIn = () => {
    // states
    const form = useForm<SignInFormData>({
        mode: 'all',
        resolver: yupResolver(signInSchema),
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
