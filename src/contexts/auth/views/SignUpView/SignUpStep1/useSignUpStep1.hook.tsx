// react
import { useMemo } from 'react';
// context
import { useSignUpContext } from '../SignUp.context';
// props
import { ButtonProps, Icon, InputFieldProps, Selectable } from '@/shared/components';
// entities
import { PersonSex, personSex } from '@/contexts/auth/entities';
// hooks
import { Translation, useLanguage } from '@/contexts/core/language';
// utils
import { sub } from 'date-fns';
import { classNames } from '@/shared/utils';
// assets
import { mdiHumanFemale, mdiHumanMale } from '@mdi/js';

const personSexIcon: Record<PersonSex, string> = {
    male: mdiHumanMale,
    female: mdiHumanFemale,
};

export const useSignUpStep1 = () => {
    // states
    const {
        form: {
            register,
            formState: { errors },
            watch,
        },
    } = useSignUpContext();

    const { translate } = useLanguage();

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
                            <Icon path={personSexIcon[value]} className="w-16 h-16" />

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

    const birthField: InputFieldProps = useMemo(
        () => ({
            inputId: 'step1-birth',
            title: translate('auth.birth.label'),
            input: (
                <input
                    type="date"
                    id="step1-birth"
                    max={sub(new Date(), { years: 18 }).toISOString().split('T')[0]}
                    {...register('birth')}
                />
            ),
            hint: translate((errors.birth?.message as Translation) ?? 'auth.birth.placeholder'),
            isHintReserved: true,
            hasError: !!errors.birth?.message,
            styleStrategy: 'primary',
        }),
        [errors.birth?.message, register, translate]
    );

    const step1FormFields: InputFieldProps[] = [nameField, surnameField, sexField, birthField];

    // actions
    const nextAction: ButtonProps = useMemo(
        () => ({
            type: 'button',
            styleStrategy: 'secondary',
            hasError: true,
            children: <span>{translate('actions.next')}</span>,
        }),
        [translate]
    );

    return { step1FormFields, nextAction, translate };
};
