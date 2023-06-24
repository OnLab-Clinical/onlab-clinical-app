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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    addressCountryValidation,
    addressValidation,
    birthValidation,
    departmentValidation,
    emailValidation,
    municipalityValidation,
    nameValidation,
    nidValidation,
    sexValidation,
    surnameValidation,
    userNameValidation,
    userPasswordValidation,
} from '../../validations';
// repositories

const signUpValidation = yup.object({
    // person
    name: nameValidation,
    surname: surnameValidation,
    sex: sexValidation,
    birth: birthValidation,
    nid: nidValidation,

    // address
    addressCountry: addressCountryValidation,
    department: departmentValidation,
    municipality: municipalityValidation,
    address: addressValidation,
    latitude: yup.number(),
    longitude: yup.number(),

    // user data
    email: emailValidation,
    // phone number
    country: nameValidation,
    phone: nameValidation,
    username: userNameValidation,
    password: userPasswordValidation,
});

export const useSignUp = () => {
    // states
    const form = useForm<SignUpFormData>({
        mode: 'all',
        resolver: yupResolver(signUpValidation),
    });

    const stepper = useStepper({ maxStep: 3, defaultStep: 2 });

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
