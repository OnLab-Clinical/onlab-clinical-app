// react
import { Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
// hooks
import { useSignInForm } from './useSignInForm.hook';
// components
import { Button, InputField } from '@/shared/components';

const SignInForm = memo(() => {
    const { handleSignIn, signInFormFields } = useSignInForm();

    return (
        <form
            className="flex flex-col p-4 gap-4 w-full max-w-sm rounded-sm shadow-md shadow-light-500 theme-dark:shadow-dark-500"
            onSubmit={handleSignIn}>
            <div className="flex flex-col items-center font-semibold">
                <h1 className="text-2xl">OnLab-Clinical</h1>

                <span className="text-lg">Sign in</span>
            </div>

            <fieldset className="flex flex-col gap-4">
                {signInFormFields.map((field, index) => (
                    <Fragment key={index}>
                        <InputField {...field} />
                    </Fragment>
                ))}
            </fieldset>

            <Button type="submit" styleStrategy="primary">
                <span>Sign In</span>
            </Button>

            <span>
                <span>If you dont have an account, please </span>

                <Link to="../sign-up" className="text-secondary-600 underline">
                    create one her!
                </Link>
            </span>
        </form>
    );
});

export default SignInForm;
