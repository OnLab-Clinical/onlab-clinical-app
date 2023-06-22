// react
import { Fragment, memo } from 'react';
// hooks
import { useSignUpStep1 } from './useSignUpStep1.hook';
// utils
import { classNames } from '@/shared/utils';
// components
import { Button, InputField } from '@/shared/components';

const SignUpStep1 = memo(() => {
    const { step1FormFields, nextAction, translate, isStep1CurrentStep } = useSignUpStep1();

    return (
        <div
            className={classNames(
                'flex-col gap-4',
                isStep1CurrentStep ? 'flex' : 'hidden lg:flex'
            )}>
            <h3 className="font-semibold text-center">{translate('auth.sign-up.step-1')}</h3>

            <fieldset className="flex flex-col gap-4">
                {step1FormFields.map((field, index) => (
                    <Fragment key={index}>
                        <InputField {...field} />
                    </Fragment>
                ))}
            </fieldset>

            <Button {...nextAction} />
        </div>
    );
});

export default SignUpStep1;
