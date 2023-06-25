// react
import { useMemo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, Icon, InputFieldProps } from '@/shared/components';
// hooks
import { Translation, useLanguage } from '@/contexts/core/language';
// assets
import { mdiAccountPlus, mdiArrowLeft } from '@mdi/js';

export const useSignUpStep3 = () => {
    // states
    const {
        countries,
        form: {
            register,
            formState: { errors, isValid, isSubmitted },
        },
        stepper: [{ currentStep }, { prevStep }],
    } = useSignUpContext();

    const { translate } = useLanguage();

    const isStep3CurrentStep = useMemo(() => currentStep === 3, [currentStep]);

    // actions

    // fields
    const emailField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step3-email',
            title: translate('auth.email.label'),
            input: (
                <input
                    type="email"
                    id="step3-email"
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

    const phoneField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step3-country',
            title: translate('auth.phone.label'),
            before: (
                <select
                    id="step3-country"
                    className="w-24 flex-grow-0"
                    defaultValue=""
                    {...register('country')}>
                    <option hidden value="">
                        {translate('auth.country.calling-placeholder')}
                    </option>

                    {countries.map((country, index) => (
                        <option key={index} value={country.id}>
                            {country.calling} - {country.name}
                        </option>
                    ))}
                </select>
            ),
            input: (
                <input
                    type="tel"
                    id="step3-phone"
                    placeholder={translate('auth.phone.placeholder')}
                    {...register('phone')}
                />
            ),
            hint: translate((errors.country?.message || errors.phone?.message) as Translation),
            isHintReserved: true,
            hasError: !!errors.country?.message || !!errors.phone?.message,
            styleStrategy: 'primary',
        }),
        [countries, errors.country?.message, errors.phone?.message, register, translate]
    );

    const usernameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step3-username',
            title: translate('auth.username.label'),
            input: (
                <input
                    type="text"
                    id="step3-username"
                    placeholder={translate('auth.username.placeholder')}
                    {...register('username')}
                />
            ),
            hint: translate(errors.username?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.username?.message,
            styleStrategy: 'primary',
        }),
        [errors.username?.message, register, translate]
    );

    const passwordField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step3-password',
            title: translate('auth.password.label'),
            input: (
                <input
                    type="password"
                    id="step3-password"
                    placeholder={translate('auth.password.placeholder')}
                    {...register('password')}
                />
            ),
            hint: translate(errors.password?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.password?.message,
            styleStrategy: 'primary',
        }),
        [errors.password?.message, register, translate]
    );

    const confirmPasswordField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step3-confirmPassword',
            title: translate('auth.password.label-confirm'),
            input: (
                <input
                    type="password"
                    id="step3-confirmPassword"
                    placeholder={translate('auth.password.placeholder-confirm')}
                    {...register('confirmPassword')}
                />
            ),
            hint: translate(errors.confirmPassword?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.confirmPassword?.message,
            styleStrategy: 'primary',
        }),
        [errors.confirmPassword?.message, register, translate]
    );

    const step3FormFields: InputFieldProps[] = [
        emailField,
        phoneField,
        usernameField,
        passwordField,
        confirmPasswordField,
    ];

    // actions
    const prevAction: ButtonProps = useMemo(
        () => ({
            className: 'flex flex-row gap-2 justify-center items-center lg:hidden',
            type: 'button',
            styleStrategy: 'secondary',
            children: (
                <>
                    <Icon path={mdiArrowLeft} className="text-xl" />

                    <span>{translate('actions.prev')}</span>
                </>
            ),
            onClick: prevStep,
        }),
        [translate, prevStep]
    );

    const submitAction: ButtonProps = useMemo(
        () => ({
            className: 'flex flex-row gap-2 justify-center items-center mt-auto',
            type: 'submit',
            styleStrategy: 'primary',
            hasError: !isValid && isSubmitted,
            children: (
                <>
                    <span>{translate('auth.sign-up.sign-up')}</span>

                    <Icon path={mdiAccountPlus} className="text-xl" />
                </>
            ),
        }),
        [isSubmitted, isValid, translate]
    );

    return { step3FormFields, prevAction, submitAction, translate, isStep3CurrentStep };
};
