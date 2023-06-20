// react
import { Fragment, memo } from 'react';
// hooks
import { useSignUpStep1 } from './useSignUpStep1.hook';
// components
import { Button, InputField } from '@/shared/components';

const SignUpStep1 = memo(() => {
    const { step1FormFields, nextAction } = useSignUpStep1();

    return (
        <div className="flex flex-col gap-4 mx-auto w-full max-w-sm lg:max-w-none">
            <h2>Datos personales</h2>

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
