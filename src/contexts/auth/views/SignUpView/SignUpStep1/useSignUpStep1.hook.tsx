// react
import { useCallback, useMemo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, DatePicker, Icon, InputFieldProps, Selectable } from '@/shared/components';
// entities
import { PersonSex, personSex } from '@/contexts/auth/entities';
// hooks
import { Translation, useLanguage } from '@/contexts/core/language';
// utils
import { Locale, format, isDate } from 'date-fns';
import { classNames } from '@/shared/utils';
// assets
import { mdiArrowRight, mdiCalendar, mdiHumanFemale, mdiHumanMale } from '@mdi/js';

const personSexIcon: Record<PersonSex, string> = {
    male: mdiHumanMale,
    female: mdiHumanFemale,
};

const formatBirht = (date: Date | null, locale: Locale) => {
    const formatString = locale.code === 'es' ? "dd 'de' MMMM 'de' yyyy" : 'MMMM do yyyy';

    return isDate(date)
        ? format(date as Date, formatString, {
              locale,
          })
        : null;
};

export const useSignUpStep1 = () => {
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
        stepper: [{ currentStep }, { nextStep }],
    } = useSignUpContext();

    const { language, translate, dateLocale } = useLanguage();

    const isStep1CurrentStep = useMemo(() => currentStep === 1, [currentStep]);

    const step1HasError = useMemo(() => {
        if (errors.name || errors.surname || errors.sex || errors.birth || errors.nid) return true;

        return false;
    }, [errors.birth, errors.name, errors.nid, errors.sex, errors.surname]);

    // actions
    const validateNextStep = useCallback(async () => {
        const evaluate: ('name' | 'surname' | 'sex' | 'birth' | 'nid')[] = [
            'name',
            'surname',
            'sex',
            'birth',
            'nid',
        ];

        const state = await trigger(evaluate);
        if (state) {
            nextStep();

            setFocus('email');

            return;
        }

        const toFocus = evaluate.find(key => getFieldState(key).error);
        if (!toFocus) return;

        setFocus(toFocus);
    }, [getFieldState, nextStep, setFocus, trigger]);

    // fields
    const nameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-name',
            title: translate('auth.name.label'),
            input: (
                <input
                    type="text"
                    id="step1-name"
                    placeholder={translate('auth.name.placeholder')}
                    {...register('name')}
                />
            ),
            hint: translate(errors.name?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.name?.message,
            styleStrategy: 'primary',
        }),
        [errors.name?.message, register, translate]
    );

    const surnameField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-surname',
            title: translate('auth.surname.label'),
            input: (
                <input
                    type="text"
                    id="step1-surname"
                    placeholder={translate('auth.surname.placeholder')}
                    {...register('surname')}
                />
            ),
            hint: translate(errors.surname?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.surname?.message,
            styleStrategy: 'primary',
        }),
        [errors.surname?.message, register, translate]
    );

    const currentSexSelected = watch('sex');
    const sexField: InputFieldProps = useMemo(
        () => ({
            title: translate('auth.sex.label'),
            input: (
                <span className="flex-grow grid grid-cols-2 gap-4 justify-around">
                    {personSex.map((value, index) => (
                        <Selectable
                            key={index}
                            className={classNames(
                                'flex flex-col items-center rounded-sm border-2 p-1 transition-all focus:shadow-xl cursor-pointer',
                                currentSexSelected !== value && 'border-transparent',
                                currentSexSelected === value &&
                                    'border-primary-500 bg-primary-500 bg-opacity-50'
                            )}
                            strategy="single"
                            value={value}
                            {...register('sex')}>
                            <Icon path={personSexIcon[value]} className="text-6xl" />

                            <span className="font-medium">{translate(`auth.sex.${value}`)}</span>
                        </Selectable>
                    ))}
                </span>
            ),
            isContentUnstyled: true,
            hint: translate(errors.sex?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.sex?.message,
            styleStrategy: 'primary',
        }),
        [currentSexSelected, errors.sex?.message, register, translate]
    );

    const currentBirthValue = watch('birth');
    const currentBirth = useMemo(() => {
        try {
            const value = new Date(currentBirthValue);

            if (Number.isNaN(value?.valueOf())) return null;

            return value;
        } catch {
            return null;
        }
    }, [currentBirthValue]);
    const birthField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-birth',
            title: translate('auth.birth.label'),
            input: (
                <DatePicker
                    className="flex flex-col"
                    calendar={{ value: currentBirth, locale: language }}
                    onDateSelected={date => {
                        if (!date) return;

                        setValue('birth', date, {
                            shouldValidate: true,
                        });
                    }}
                    id="step1-birth"
                    {...register('birth')}>
                    <span className="flex-grow flex flex-row gap-4 justify-between items-center">
                        <span>
                            {formatBirht(currentBirth, dateLocale) ||
                                translate('auth.birth.placeholder')}
                        </span>
                    </span>
                </DatePicker>
            ),
            after: (
                <label htmlFor="step1-birth">
                    <Icon path={mdiCalendar} className="text-xl" />
                </label>
            ),
            hint: translate(errors.birth?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.birth?.message,
            styleStrategy: 'primary',
        }),
        [currentBirth, dateLocale, errors.birth?.message, language, register, setValue, translate]
    );

    const nidField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-nid',
            title: translate('auth.nid.label'),
            input: (
                <input
                    type="text"
                    id="step1-nid"
                    placeholder={translate('auth.nid.placeholder')}
                    {...register('nid')}
                />
            ),
            hint: translate(errors.nid?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.nid?.message,
            styleStrategy: 'primary',
        }),
        [errors.nid?.message, register, translate]
    );

    const step1FormFields: InputFieldProps[] = [
        nameField,
        surnameField,
        sexField,
        birthField,
        nidField,
    ];

    // actions
    const nextAction: ButtonProps = useMemo(
        () => ({
            className: 'flex flex-row gap-2 justify-center items-center lg:hidden',
            type: 'button',
            styleStrategy: 'secondary',
            hasError: step1HasError,
            children: (
                <>
                    <span>{translate('actions.next')}</span>

                    <Icon path={mdiArrowRight} className="text-xl" />
                </>
            ),
            onClick: validateNextStep,
        }),
        [step1HasError, translate, validateNextStep]
    );

    return { step1FormFields, nextAction, translate, isStep1CurrentStep };
};
