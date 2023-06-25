// react
import { useCallback, useMemo, useRef } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, Icon, InputFieldProps, MarkerPosition } from '@/shared/components';
// hooks
import { Translation, useLanguage } from '@/contexts/core/language';
import { useOnScreen } from '@/shared/hooks';
// assets
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';

export const useSignUpStep2 = () => {
    // states
    const {
        countries,
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

    const currentCountry = watch('addressCountry');
    const departments = useMemo(
        () => countries.find(country => country.id === currentCountry)?.departments ?? [],
        [countries, currentCountry]
    );

    const currentDepartment = watch('department');
    const municipalities = useMemo(
        () =>
            departments.find(department => department.id === currentDepartment)?.municipalities ??
            [],
        [currentDepartment, departments]
    );

    const { translate } = useLanguage();

    const isStep2CurrentStep = useMemo(() => currentStep === 2, [currentStep]);

    const step2HasError = useMemo(() => {
        if (errors.addressCountry || errors.department || errors.municipality || errors.address)
            return true;

        return false;
    }, [errors.address, errors.addressCountry, errors.department, errors.municipality]);

    const currentLocation: MarkerPosition = {
        latitude: watch('latitude', 12),
        longitude: watch('longitude', -86),
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    const isWrapperVisible = useOnScreen(wrapperRef);

    const isAutoLocate = useMemo(
        () =>
            isWrapperVisible &&
            currentLocation.latitude === 12 &&
            currentLocation.longitude === -86,
        [currentLocation.latitude, currentLocation.longitude, isWrapperVisible]
    );

    // actions
    const handlePositionChange = useCallback(
        (position: MarkerPosition) => {
            setValue('latitude', position.latitude);
            setValue('longitude', position.longitude);
        },
        [setValue]
    );

    const validateNextStep = useCallback(async () => {
        const evaluate: ('addressCountry' | 'department' | 'municipality' | 'address')[] = [
            'addressCountry',
            'department',
            'municipality',
            'address',
        ];

        const state = await trigger(evaluate);
        if (state) return nextStep();

        const toFocus = evaluate.find(key => getFieldState(key).error);
        if (!toFocus) return;

        setFocus(toFocus);
    }, [getFieldState, nextStep, setFocus, trigger]);

    // fields
    const addressCountryField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-addressCountry',
            title: translate('auth.address.label'),
            input: (
                <select
                    id="step2-addressCountry"
                    defaultValue=""
                    {...register('addressCountry', {
                        onChange: () => setValue('department', ''),
                    })}>
                    <option hidden value="">
                        {translate('auth.country.placeholder')}
                    </option>

                    {countries.map((country, index) => (
                        <option key={index} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            ),
            hint: translate(errors.addressCountry?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.addressCountry?.message,
            styleStrategy: 'primary',
        }),
        [countries, errors.addressCountry?.message, register, setValue, translate]
    );

    const departmentField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-department',
            input: (
                <select
                    id="step2-department"
                    defaultValue=""
                    {...register('department', {
                        onChange: () => setValue('municipality', ''),
                    })}>
                    <option hidden value="">
                        {translate('auth.department.placeholder')}
                    </option>

                    {departments.map((department, index) => (
                        <option key={index} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                </select>
            ),
            hint: translate(errors.department?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.department?.message,
            styleStrategy: 'primary',
        }),
        [departments, errors.department?.message, register, setValue, translate]
    );

    const municipalityField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step2-municipality',
            input: (
                <select id="step2-municipality" defaultValue="" {...register('municipality')}>
                    <option hidden value="">
                        {translate('auth.municipality.placeholder')}
                    </option>

                    {municipalities.map((municipality, index) => (
                        <option key={index} value={municipality.id}>
                            {municipality.name}
                        </option>
                    ))}
                </select>
            ),
            hint: translate(errors.municipality?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.municipality?.message,
            styleStrategy: 'primary',
        }),
        [errors.municipality?.message, municipalities, register, translate]
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

    return {
        step2FormFields,
        prevAction,
        nextAction,
        translate,
        isStep2CurrentStep,
        currentLocation,
        handlePositionChange,
        wrapperRef,
        isAutoLocate,
    };
};
