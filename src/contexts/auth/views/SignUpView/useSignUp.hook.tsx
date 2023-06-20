// react
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// props
import { SignUpContextProps, SignUpFormData } from './SignUp.props';
// hooks
import { useLoader } from '@/contexts/core/loader';
import { useNotification } from '@/contexts/core/notification';
import { useLanguage } from '@/contexts/core/language';
import { useStepper } from '@/shared/hooks';
// utils
//import * as yup from 'yup';
//import { yupResolver } from '@hookform/resolvers/yup';

/* const signUpValidation = yup.object({
}); */

export const useSignUp = () => {
    // states
    const form = useForm<SignUpFormData>({
        mode: 'all',
        //resolver: yupResolver(signUpValidation)
    });

    const stepper = useStepper({ maxStep: 3 });

    const { showLoader, hideLoader } = useLoader();

    const { addNotification } = useNotification();

    const dispatch = useDispatch();

    const { translate } = useLanguage();

    // actions
    const handleSignUp = form.handleSubmit(async data => {
        showLoader();
        console.log(data, translate('auth.sign-up.title'));
        hideLoader();
    });

    // context
    const context: SignUpContextProps = useMemo(
        () => ({
            form,
            stepper,
            handleSignUp,
        }),
        [form, handleSignUp, stepper]
    );

    return { context };
};
