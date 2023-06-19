// react
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useSignInForm } from './useSignInForm.hook';
// components
import { Button, InputField } from '@/shared/components';
import { PanelLayout } from '@/shared/layouts';

const SignInForm = memo(() => {
    const { handleSignIn, signInFormFields, signInAction, translate } = useSignInForm();

    return (
        <PanelLayout className="w-full max-w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
                <div className="flex flex-col items-center font-semibold">
                    <h1 className="text-2xl">{translate('app.title')}</h1>

                    <h2 className="text-lg">{translate('auth.sign-in.title')}</h2>
                </div>

                <fieldset className="flex flex-col gap-4">
                    {signInFormFields.map((field, index) => (
                        <Fragment key={index}>
                            <InputField {...field} />
                        </Fragment>
                    ))}
                </fieldset>

                <Button {...signInAction} />

                <span>
                    <span>{translate('auth.sign-in.sign-up-hint')} </span>

                    <Link to="../sign-up" className="text-secondary-600 underline">
                        {translate('auth.sign-in.sign-up-nav')}
                    </Link>
                </span>
            </form>
        </PanelLayout>
    );
});

export default SignInForm;
