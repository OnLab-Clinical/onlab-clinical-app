// react
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { format } from 'date-fns';
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
import { countriesRepository, signUpRepository } from '../../repositories';

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
        defaultValues: {
            latitude: 12,
            longitude: -86,
        },
    });

    const stepper = useStepper({ maxStep: 3 });

    const { showLoader, hideLoader } = useLoader();

    const { addNotification } = useNotification();

    const { translate } = useLanguage();

    const navigate = useNavigate();

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

        const response = await signUpRepository({
            person: {
                name: data.name,
                surname: data.surname,
                birth: format(data.birth, "yyyy-MM-dd'T00:00:00Z'"),
                sex: data.sex,
            },
            nid: data.nid,
            contacts: {
                email: data.email,
                phone: {
                    country: data.country,
                    phone: data.phone,
                },
                address: {
                    municipality: data.municipality,
                    address: data.address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                },
            },
            user: {
                name: data.username,
                password: data.password,
            },
        });

        if (!response.success) {
            addNotification({
                message: response.message,
                kind: response.kind,
            });

            return hideLoader();
        }

        addNotification({
            message: translate('auth.sign-up.success'),
            kind: response.kind,
            timeout: 10 * 1000,
        });

        navigate('../sign-in', { replace: true });

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
