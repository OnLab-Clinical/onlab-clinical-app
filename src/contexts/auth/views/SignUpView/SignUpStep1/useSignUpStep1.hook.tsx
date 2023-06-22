// react
import { useMemo } from 'react';
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
import { mdiHumanFemale, mdiHumanMale } from '@mdi/js';

const personSexIcon: Record<PersonSex, string> = {
    male: mdiHumanMale,
    female: mdiHumanFemale,
};

const formatBirht = (date: Date, locale: Locale) => {
    const formatString = locale.code === 'es' ? "dd 'de' MMMM 'de' yyyy" : 'MMMM do yyyy';

    return isDate(date)
        ? format(date, formatString, {
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
            getValues,
            trigger,
        },
    } = useSignUpContext();

    const { language, translate, dateLocale } = useLanguage();

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
                <span className="grid grid-cols-2 gap-4 mx-auto">
                    {personSex.map((value, index) => (
                        <Selectable
                            key={index}
                            className={classNames(
                                'flex flex-col items-center rounded-sm border-2 p-1 transition-all focus:shadow-xl',
                                currentSexSelected !== value && 'border-transparent',
                                currentSexSelected === value &&
                                    'border-primary-500 bg-primary-500 bg-opacity-50'
                            )}
                            strategy="single"
                            value={value}
                            {...register('sex')}>
                            <Icon path={personSexIcon[value]} className="text-4xl" />

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

    const currentBirth = watch('birth');
    const birthField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-birth',
            title: translate('auth.birth.label'),
            input: (
                <DatePicker
                    calendar={{ value: currentBirth, locale: language }}
                    onDateSelected={date => {
                        if (date) setValue('birth', date);

                        trigger('birth');
                    }}
                    id="step1-birth"
                    {...register('birth')}>
                    <span>
                        {formatBirht(currentBirth, dateLocale) ||
                            translate('auth.birth.placeholder')}
                    </span>
                </DatePicker>
            ),
            hint: translate(errors.birth?.message as Translation),
            isHintReserved: true,
            hasError: !!errors.birth?.message,
            styleStrategy: 'primary',
        }),
        [
            currentBirth,
            dateLocale,
            errors.birth?.message,
            language,
            register,
            setValue,
            translate,
            trigger,
        ]
    );

    const step1FormFields: InputFieldProps[] = [nameField, surnameField, sexField, birthField];

    // actions
    const nextAction: ButtonProps = useMemo(
        () => ({
            type: 'button',
            styleStrategy: 'secondary',
            hasError: true,
            children: <span>{translate('actions.next')}</span>,
            onClick: () => console.log(getValues()),
        }),
        [getValues, translate]
    );

    return { step1FormFields, nextAction, translate };
};
