// react
import { useCallback, useEffect, useMemo, useState } from 'react';
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
    confirmPasswordValidation,
    countryValidation,
    departmentValidation,
    emailValidation,
    municipalityValidation,
    nameValidation,
    nidValidation,
    phoneValidation,
    sexValidation,
    surnameValidation,
    userNameValidation,
    userPasswordValidation,
} from '../../validations';
// entities
import { CountryFill } from '../../entities';
// repositories
import { countriesRepository } from '../../repositories';

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
    country: countryValidation,
    phone: phoneValidation,
    username: userNameValidation,
    password: userPasswordValidation,
    confirmPassword: confirmPasswordValidation,
});

export const useSignUp = () => {
    // states
    const [countries, setCountries] = useState<CountryFill[]>([]);
    const hasCountries = useMemo(() => countries.length > 0, [countries.length]);

    const form = useForm<SignUpFormData>({
        mode: 'all',
        resolver: yupResolver(signUpValidation),
    });

    const stepper = useStepper({ maxStep: 3, defaultStep: 3 });

    const { showLoader, hideLoader } = useLoader();

    const { addNotification } = useNotification();

    const dispatch = useDispatch();

    const { translate } = useLanguage();

    // actions
    const handleGetCountries = useCallback(async () => {
        showLoader();

        const response = await countriesRepository();

        if (!response.success) {
            addNotification({
                message: response.message,
                kind: response.kind,
            });

            return hideLoader();
        }

        setCountries(response.data);

        hideLoader();
    }, [addNotification, hideLoader, showLoader]);

    const handleSignUp = form.handleSubmit(async data => {
        showLoader();
        console.log(data, translate('auth.sign-up.title'));
        hideLoader();
    });

    // reactivity
    useEffect(() => {
        if (hasCountries) return;

        handleGetCountries();
    }, [handleGetCountries, hasCountries]);

    // context
    const context: SignUpContextProps = useMemo(
        () => ({
            countries,
            form,
            stepper,
            handleSignUp,
        }),
        [form, handleSignUp, countries, stepper]
    );

    return { context };
};
