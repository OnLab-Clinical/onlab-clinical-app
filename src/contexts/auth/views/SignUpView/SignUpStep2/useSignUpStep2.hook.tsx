// react
import { useCallback, useMemo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, Icon, InputFieldProps } from '@/shared/components';
// hooks
import { Translation, useLanguage } from '@/contexts/core/language';
// utils
import { classNames } from '@/shared/utils';
// assets
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';

export const useSignUpStep2 = () => {
    // states
    const {
        form: {
            register,
            formState: { errors },
            watch,
            setValue,
            trigger,
            setFocus,
            getFieldState,
        },
        stepper: [{ currentStep }, { prevStep, nextStep }],
    } = useSignUpContext();

    const { translate } = useLanguage();

    const isStep2CurrentStep = useMemo(() => currentStep === 2, [currentStep]);

    const step2HasError = useMemo(() => {
        if (errors.email) return true;

        return false;
    }, [errors.email]);

    // actions
    const validateNextStep = useCallback(async () => {
        const evaluate: (
            | 'addressCountry'
            | 'department'
            | 'municipality'
            | 'address'
            | 'latitude'
            | 'longitude'
        )[] = ['addressCountry', 'department', 'municipality', 'address', 'latitude', 'longitude'];

        const state = await trigger(evaluate);
        if (state) return nextStep();

        const toFocus = evaluate.find(key => getFieldState(key).error);
        if (!toFocus) return;

        setFocus(toFocus);
    }, [getFieldState, nextStep, setFocus, trigger]);

    // fields
    const emailField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-email',
            title: translate('auth.email.label'),
            input: (
                <input
                    type="email"
                    id="step2-email"
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
            inputId: 'step2-country',
            title: translate('auth.phone.label'),
            before: (
                <select
                    id="step2-country"
                    className="w-24 flex-grow-0"
                    defaultValue=""
                    {...register('country')}>
                    <option hidden value="">
                        {translate('auth.country.calling-placeholder')}
                    </option>
                </select>
            ),
            input: (
                <input
                    type="tel"
                    id="step2-phone"
                    placeholder={translate('auth.phone.placeholder')}
                    {...register('phone')}
                />
            ),
            hint: translate((errors.country?.message || errors.phone?.message) as Translation),
            isHintReserved: true,
            hasError: !!errors.country?.message || !!errors.phone?.message,
            styleStrategy: 'primary',
        }),
        [errors.country?.message, errors.phone?.message, register, translate]
    );

    const addressCountryField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-addressCountry',
            title: translate('auth.address.label'),
            input: (
                <select id="step2-addressCountry" defaultValue="" {...register('addressCountry')}>
                    <option hidden value="">
                        {translate('auth.country.placeholder')}
                    </option>
                </select>
            ),
            hint: translate(errors.addressCountry?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.addressCountry?.message,
            styleStrategy: 'primary',
        }),
        [errors.addressCountry?.message, register, translate]
    );

    const departmentField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-department',
            input: (
                <select id="step2-department" defaultValue="" {...register('department')}>
                    <option hidden value="">
                        {translate('auth.department.placeholder')}
                    </option>
                </select>
            ),
            hint: translate(errors.department?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.department?.message,
            styleStrategy: 'primary',
        }),
        [errors.department?.message, register, translate]
    );

    const municipalityField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-municipality',
            input: (
                <select id="step2-municipality" defaultValue="" {...register('municipality')}>
                    <option hidden value="">
                        {translate('auth.municipality.placeholder')}
                    </option>
                </select>
            ),
            hint: translate(errors.municipality?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.municipality?.message,
            styleStrategy: 'primary',
        }),
        [errors.municipality?.message, register, translate]
    );

    const addressField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-address',
            input: (
                <textarea
                    id="step2-address"
                    placeholder={translate('auth.address.placeholder')}
                    {...register('address')}
                />
            ),
            hint: translate(errors.address?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.address?.message,
            styleStrategy: 'primary',
        }),
        [errors.address?.message, register, translate]
    );

    const step2FormFields: InputFieldProps[] = [
        /* emailField,
        phoneField, */
        addressCountryField,
        departmentField,
        municipalityField,
        addressField,
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

    const nextAction: ButtonProps = useMemo(
        () => ({
            className: 'flex flex-row gap-2 justify-center items-center lg:hidden',
            type: 'button',
            styleStrategy: 'secondary',
            hasError: step2HasError,
            children: (
                <>
                    <span>{translate('actions.next')}</span>

                    <Icon path={mdiArrowRight} className="text-xl" />
                </>
            ),
            onClick: validateNextStep,
        }),
        [step2HasError, translate, validateNextStep]
    );

    return { step2FormFields, prevAction, nextAction, translate, isStep2CurrentStep };
};
