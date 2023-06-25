// react
import { Fragment, memo } from 'react';
// hooks
import { useSignUpStep3 } from './useSignUpStep3.hook';
// utils
import { classNames } from '@/shared/utils';
// components
import { Button, InputField } from '@/shared/components';

const SignUpStep3 = memo(() => {
    const { step3FormFields, prevAction, submitAction, translate, isStep3CurrentStep } =
        useSignUpStep3();

    return (
        <div
            className={classNames(
                'flex-col gap-4',
                isStep3CurrentStep ? 'flex' : 'hidden lg:flex'
            )}>
            <h3 className="font-semibold text-center">{translate('auth.sign-up.step-3')}</h3>

            <Button {...prevAction} />

            <fieldset className="flex flex-col gap-4">
                {step3FormFields.map((field, index) => (
                    <Fragment key={index}>
                        <InputField {...field} />
                    </Fragment>
                ))}
            </fieldset>

            <Button {...submitAction} />
        </div>
    );
});

export default SignUpStep3;
